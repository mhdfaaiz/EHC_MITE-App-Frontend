import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text, SafeAreaView, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
const { io } = require("socket.io-client");
import Icon from 'react-native-vector-icons/Ionicons';
import { createElement } from 'react-native';


const IndicatorApp = ({ route, navigation }) => {
    const [tableData, setTableData] = useState([]);
    const [logData, setLogData] = useState([]); // For logs from /api/datas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [indicatorColors, setIndicatorColors] = useState({});
    const [connectionState, setConnectionState] = useState({ color: '#ff2323', serialNo: null });
    const [isReversed, setIsReversed] = useState(false);
    const [indicatorname, setIndicatorname] = useState(['DI1', 'DI2', 'DI3', 'DI4']);
    const [currentView, setCurrentView] = useState('live');
    const iconNames = ['DI1', 'DI2', 'DI3', 'DI4']
    const flatListRef = useRef(null);
    const serialNumber = route.params?.serialNumber;
    const [activeButton, setActiveButton] = useState('live')

    const handlePressIn = (buttonName) => {
        setActiveButton(buttonName);
    };
    const getScaleValue = (buttonName) => {
        return activeButton === buttonName ? 1.2 : 1;
    };
    const handleButtonPress = (buttonName) => {
        setCurrentView(buttonName);
        setActiveButton(buttonName); // Set the button as active when clicked
    };
    // Socket Initialization
    useEffect(() => {
        const socket = io("https://soniciot.com");

        socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        socket.on('status', (data) => {
            console.log("Received updated client status:", data);
            if (serialNumber in data) {
                status = data[serialNumber]
                const color = status === "down" ? '#ff2323' : '#16b800';
                setConnectionState({ color, serialNo: serialNumber });
            }
        });

        socket.on('alarm', (data) => {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                    console.log(data);

                } catch (e) {
                    console.error('Error parsing data:', e);
                    return;
                }
            }
            if (data.serialno === serialNumber) {
                const formattedData = {
                    TIMESTAMP: data.timestamp || 'N/A',
                    INPUT: data.data || 'N/A',
                    VALUE: data.status || 'N/A',
                };

                setTableData((prevData) => [...prevData, formattedData]);
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 0);
                const newColor = data.status === '0' ? '#16b800' : '#b10303';
                setIndicatorColors((prevColors) => ({
                    ...prevColors,
                    [data.data]: newColor,
                }));
                // Save the updated color to the backend
                fetch('https://soniciot.com/api/indicatoricons/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        serial_number: serialNumber,
                        indicator: data.data,
                        color: newColor,
                    }),
                }).catch(error => console.error('Error saving indicator color:', error));
            }
        });


        return () => {
            socket.disconnect();
            console.log('WebSocket connection closed');
        };
    }, []);



    //initialize new indicators name if there is no name
    useEffect(() => {
        const initializeIndicators = async () => {
            try {
                await fetch('https://soniciot.com/api/initialize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ serial_number: serialNumber }),
                });
            } catch (error) {
                console.error('Error initializing indicators:', error);
            }
        };

        if (serialNumber) {
            initializeIndicators();
        }
    }, [serialNumber]); // Run this when the serial number changes


    // Fetch Indicator Names from Backend
    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const response = await fetch(`https://soniciot.com/api/indicators/${serialNumber}`);
                const data = await response.json();
                console.log(data)
                setIndicatorname(data); // Set the fetched indicator names to state
            } catch (error) {
                console.error('Error fetching indicators:', error);
            }
        };

        if (serialNumber) {
            fetchIndicators();
        }
    }, [serialNumber]); // Fetch indicators whenever the serial number changes

    useEffect(() => {
        const fetchIndicatorColors = async () => {
            try {
                const response = await fetch(`https://soniciot.com/api/indicatoricons/${serialNumber}`);
                const data = await response.json();

                // Map the colors from the response
                const colors = {};
                data.forEach(indicator => {
                    colors[indicator.indicator] = indicator.color;
                });

                setIndicatorColors(colors);
            } catch (error) {
                console.error('Error fetching indicator colors:', error);
            }
        };

        if (serialNumber) {
            fetchIndicatorColors();
        }
    }, [serialNumber]);



    const fetchLogs = async () => {
        try {
            const response = await fetch("https://soniciot.com/api/logs"); // Replace with your API URL

            if (!response.ok) {
                throw new Error("Failed to fetch logs");
            }

            const data = await response.json(); // Parse JSON response

            // Filter logs by the serial number
            const filteredData = data.filter((log) => log.device === serialNumber);

            // Sort logs in ascending order of the date
            const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Add sequential ID numbers to the sorted logs
            const numberedData = sortedData.map((log, index) => ({
                ...log,
                id: index + 1, // Add a new 'id' field starting from 1
            }));

            setLogData(numberedData); // Store the fetched logs with IDs
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };



    useEffect(() => {
        fetchLogs(); // Fetch logs when the component mounts

        // Poll the API every 5 seconds for real-time updates
        const interval = setInterval(() => {
            fetchLogs();
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Fetch Data on Mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://soniciot.com/api/mqtt-data');
                await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchReverseIndicator = async () => {
            try {
                const response = await fetch(`https://soniciot.com/api/reverse-indicator/${serialNumber}`);
                const data = await response.json();
                setIsReversed(data.isReversed);
            } catch (error) {
                console.error('Error fetching reverse indicator:', error);
            }
        };

        fetchReverseIndicator();
    }, [serialNumber]);

    const getIndicatorColor = useCallback(
        (index) => {
            const color = indicatorColors[index] || 'grey';
            if (isReversed) {
                return color === '#16b800' ? '#b10303' : color === '#b10303' ? '#16b800' : color;
            }
            return color;
        },
        [indicatorColors, isReversed]

    );

    const renderRow = useCallback(({ item }) => {
        // Map the INPUT value (DI1, DI2, etc.) to the corresponding indicator name
        const indicatorIndex = parseInt(item.INPUT.replace('DI', ''), 10) - 1; // Extract the number from "DI1", "DI2", etc.
        const indicatorDisplayName = indicatorname[indicatorIndex]?.name || item.INPUT; // Use the indicator name or fallback to INPUT

        // Determine the alarm status
        const alarmStatus = item.VALUE === '1' ? 'Alarm ON' : 'Alarm OFF';
        return (
            <View style={styles.row}>
                <Text style={[styles.cell, styles.dateCell]}>{item.TIMESTAMP}</Text>
                <Text style={[styles.cell, styles.dataCell]}>{indicatorDisplayName}</Text>
                <Text style={[styles.cell, styles.statusCell]}>{alarmStatus}</Text>
            </View>
        );
    }, [indicatorname]);


    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={[styles.celll, styles.col1]}>{item.id}</Text>
            <Text style={[styles.celll, styles.col2]}>{new Date(item.registered_at).toLocaleString()}</Text>
            <Text style={[styles.celll, styles.col3]}>{item.event}</Text>
            <Text style={[styles.celll, styles.col4]}>{item.parameter}</Text>
            <Text style={[styles.celll, styles.col5]}>{item.value}</Text>
            <Text style={[styles.celll, styles.col6]}>{item.device}</Text>
        </View>
    );


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingtext}>Loading data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const boxStyle = {
        ...styles.box,
        height: currentView === 'logs' ? '50%' : '50%',
        marginTop: currentView === 'logs' ? 30 : 10
    };
    const handleNextPage = () => {
        // Navigate to the settings page
        navigation.navigate('Settings', {
            serialNumber,
            indicatorNames: indicatorname,
            reverseState: isReversed,
            onUpdate: ({ updatedIndicatornames, updatedReversestate }) => {
                if (updatedIndicatornames) {
                    setIndicatorname(updatedIndicatornames); // Updates the state in Main Page
                }
                if (updatedReversestate !== undefined) {
                    setIsReversed(updatedReversestate); // Updates the state in Main Page
                }
            },
        });
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.first}>
                <Icon style={styles.settings} name="settings-outline" size={30} color="gray" onPress={handleNextPage} />
            </View>
            <View style={styles.intro}>
                <View style={styles.serialbox}>
                    <Text style={styles.serialno}>{connectionState.serialNo || serialNumber}</Text>
                </View>

                <Text style={[styles.statusText, { color: connectionState.color }]}>
                    {connectionState.color === '#16b800' ? 'ONLINE' : 'OFFLINE'}
                </Text>

            </View>
            <View style={styles.indicatorRow}>
                {iconNames.map((name, index) => (
                    <View key={index} style={styles.indicatorWrapper}>
                        {/* Outer Bezel */}
                        <View style={styles.outerBezel}>
                            {/* Reflection Effect */}
                            <View style={styles.reflection} />

                            {/* Outer Ring */}
                            <View style={styles.outerRing}>
                                {/* Inner Glow */}

                                <View
                                    style={[
                                        styles.innerGlow,
                                        { backgroundColor: getIndicatorColor(name) || 'grey' },
                                    ]}
                                />


                                {/* Main Indicator */}
                                <View
                                    style={[
                                        styles.indicator,
                                        { backgroundColor: getIndicatorColor(name) || 'grey' },
                                    ]}
                                />
                            </View>
                        </View>

                    </View>
                ))}
            </View>
            <View style={styles.indicatornameRow}>
                {indicatorname.map((indicator) => (
                    <View key={indicator.id} style={styles.indicatorWrapper}>
                        <Text style={styles.label}>{indicator.name}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.switchbuttons}>
                <Animated.View style={{ transform: [{ scale: getScaleValue('live') }] }}>
                    <TouchableOpacity
                        onPressIn={() => handlePressIn('live')}
                        onPress={() => handleButtonPress('live')}
                    >
                        <Text style={styles.logs}>Live</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: getScaleValue('logs') }] }}>
                    <TouchableOpacity
                        onPressIn={() => handlePressIn('logs')}
                        onPress={() => handleButtonPress('logs')}
                    >
                        <Text style={styles.logs}>Logs</Text>
                    </TouchableOpacity>
                </Animated.View>

                {currentView === 'live' && (
                    <TouchableOpacity style={styles.clearbutton}
                        onPress={() => setTableData([])}
                    >
                        <Text style={styles.cleartext}>Clear</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={boxStyle}>

                {currentView === 'live' && (
                    <>
                        <View style={styles.header}>
                            <Text style={[styles.heading, styles.dateHead]}>DATE / TIME</Text>
                            <Text style={[styles.heading, styles.dataCell]}>INPUT</Text>
                            <Text style={[styles.heading, styles.statusHead]}>STATUS</Text>
                        </View>

                        <FlatList
                            ref={flatListRef}
                            style={styles.tablebox}
                            data={tableData}
                            renderItem={renderRow}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.body}
                            ListEmptyComponent={() => (
                                <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                                    No data to display
                                </Text>
                            )}
                            initialNumToRender={10}
                            windowSize={5}
                            removeClippedSubviews={true}
                        />
                    </>
                )}

                {currentView === 'logs' && (
                    <>

                        <FlatList
                            ref={flatListRef}
                            style={styles.tablebox}
                            data={logData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()} // Use unique ID for key
                            contentContainerStyle={styles.body}
                            ListEmptyComponent={() => (
                                <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                                    No data to display
                                </Text>
                            )}
                            initialNumToRender={10}
                            windowSize={5}
                            removeClippedSubviews={true}
                        />
                    </>
                )}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#181818',
        padding: 20,
    },
    loadingtext: {
        color: 'white'
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    first: {
        width: '100%',
        flexDirection: 'row',
    },
    logo: {
        marginBottom: 20,
        marginLeft: 70,
        width: 100,
        height: 25,
    },
    settings: {
        marginBottom: 20
    },
    intro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 70
    },
    serialbox: {
        width: 200, // Adjust width as per your design
        height: 50, // Adjust height for a small display
        backgroundColor: '#000', // Display background color
        borderRadius: 10, // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, // Border width for a metallic finish
        borderColor: '#888', // Border color
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5, // Elevation for Android
    },
    serialno: {
        fontSize: 18, // Font size for the serial number
        fontWeight: 'bold',
        color: '#fff', // White text color
        textShadowColor: '#16b800', // Green shadow for a glowing effect
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10, // Create a glowing effect
    },
    statusText: {
        marginLeft: 70,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 15,
        width: '100%',
        padding: 10,
    },
    editbutton: {
        backgroundColor: '#7da9ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    reverseButton: {
        backgroundColor: '#7da9ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    clearbutton: {
        position: 'absolute',
        right: 0
    },
    cleartext: {
        backgroundColor: '#222',
        width: 70,
        height: 35,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    indicatorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    indicatornameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '90%',
    },
    indicatorWrapper: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    label: {
        marginTop: 5,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 14,
        width: 50,
        color: '#000',
    },
    switchbuttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%'
    },
    logs: {
        backgroundColor: 'gray',
        width: 80,
        height: 40,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        fontWeight: 'bold'
    },
    box: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#353535',
        borderRadius: 10,

    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#282828',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        width: '98%'
    },
    tablebox: {
        width: '98%',
        backgroundColor: '#282828',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5
    },
    body: {
        marginTop: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 5,
        color: 'ffff'

    },
    heading: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },
    statusHead: {
        flex: 2,
    },
    dateHead: {
        flex: 5,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: 'white',
    },
    cell: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        marginRight: 10
    },
    celll: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
    },
    col1: {
        width: '10%'
    },
    col2: {
        width: '25%'
    },
    col3: {
        width: '20%'
    },
    col4: {
        width: '10%'
    },
    col5: {
        width: '5%'
    },
    col6: {
        width: '30%'
    },
    dateCell: {
        flex: 3,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: 'white',
    },
    dataCell: {
        flex: 2,
    },
    statusCell: {
        flex: 1,
    },
    outerBezel: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#444', // Bezel background
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#666', // Metallic bezel
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    reflection: {
        position: 'absolute',
        top: 4,
        left: 5,
        width: 42,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Subtle reflection
    },
    outerRing: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#999', // Metallic outer ring
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444', // Inner ring background
    },
    innerGlow: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.5,
    },
    indicator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        elevation: 3,
    },


});

export default IndicatorApp;
