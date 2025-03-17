import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';

export default function SerialNumberPage({ navigation }) {
    const [selectedName, setSelectedName] = useState(null);
    const [items, setItems] = useState([]);

    const fetchSerialList = () => {
        fetch('https://soniciot.com/api/Serial_List')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.category === 'adnoc');

                // Sort the filtered data by name in ascending order
                const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

                setItems(sortedData.map((item) => ({ label: item.name, value: item.serial_number })));
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchSerialList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchSerialList();
        }, [])
    );

    // Tile data
    const tiles = [
        { title: 'PANEL ALARMS', onPress: () => {
            if (!selectedName) {
                alert('Please select the field');
                return;
            }
            navigation.navigate('Alarms', { serialNumber: selectedName });
        }},
        { title: 'GAS TANK LEVEL', onPress: () => {
            if (!selectedName) {
                alert('Please select the field');
                return;
            }
            navigation.navigate('GasLevel', { serialNumber: selectedName });
        }},
    ];

    return (
        <ImageBackground
            source={require("../assets/adnoc-background.png")} // Change this to your image path
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.first}>                        
                <Image 
                    style={styles.logo} 
                    source={require('../assets/adnoclogo.png')} // Change this to your image path
                    resizeMode="contain"
                />
                <Menu style={styles.settings} name="menu" size={40} color="rgba(255, 255, 255, 0.8)" onPress={() => navigation.navigate('Changefield')}/>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Select Your Device</Text>
                <Text style={styles.subText}>Choose from the list below to proceed</Text>
                <Dropdown
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder="Select a field"
                    value={selectedName}
                    onChange={(item) => setSelectedName(item.value)}
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    selectedTextStyle={styles.dropdownText}
                    flatListProps={{
                        nestedScrollEnabled: true,
                    }}
                />
                {/* 2x2 Grid Tiles */}
                <View style={styles.gridContainer}>
                    {tiles.map((tile, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.tile}
                        onPress={tile.onPress}
                    >
                        <Text style={styles.tileText}>{tile.title}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Text style={styles.subTextdown}>Powered by SONIC</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    settings: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    first: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subTextlogo: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.4)',
        textAlign: 'center',
        marginBottom: 30
    },
    subTextdown: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginBottom: 30
    },
    elevation: {
        elevation: 50,
        shadowColor: '#000',
    },
    logo: {
        width: 40,
        height: 60,
        resizeMode: 'contain',
        opacity : 0.8,
        margin : 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        borderColor: '#444',
        paddingHorizontal: 12,
        width: '80%',
        marginBottom: 30,
        height: 50,
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dropdownText: {
        color: '#000',
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    tile: {
        width: '48%',
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 20,
    },
    tileText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});