import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
const { io } = require("socket.io-client");
import React, { useEffect, useState } from "react";
import Graph1 from "../Components/Graph1";
import Graph2 from "../Components/Graph2";
import TableComponent from "../Components/Table";
import SignalDisplay from "../Components/signalDisplay";

export default function App({ route, navigation }) {
    const [dataA, setDataA] = useState([]);
    const [dataB, setDataB] = useState([]);
    const [dataC, setDataC] = useState([]);
    const [dataD, setDataD] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // 1 for Graph1, 2 for Graph2, 3 for TableComponent
    const serialNumber = route.params?.serialNumber;

    useEffect(() => {
        const socket = io("https://transgaz.soniciot.com");

        socket.on("bivicomdata", (data) => {
            try {
                data = JSON.parse(data);

                if (data.serialNumber === serialNumber) {
                    const valueA = data.A;
                    const valueB = data.B;
                    const valueC = data.C;
                    const valueD = data.D;
                    console.log(valueA, valueB, valueC, valueD);

                    // Only update state if values are valid numbers
                    if (!isNaN(valueA) && isFinite(valueA)) {
                        setDataA((prev) => [...prev, valueA]);
                    }

                    if (!isNaN(valueB) && isFinite(valueB)) {
                        setDataB((prev) => [...prev, valueB]);
                    }

                    if (!isNaN(valueC) && isFinite(valueC)) {
                        setDataC((prev) => [...prev, valueC]);
                    }

                    if (!isNaN(valueD) && isFinite(valueD)) {
                        setDataD((prev) => [...prev, valueD]);
                    }
                }
            } catch (err) {
                console.error("Socket data parsing error:", err);
            }
        });

        return () => socket.disconnect();
    }, []);

    // Function to clear all the data
    const clearData = () => {
        setDataA([]);
        setDataB([]);
        setDataC([]);
        setDataD([]);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logos.png')} // Change this to your image path
                resizeMode="contain"
           />
            <View style={styles.serialbox}>
                <Text style={styles.serialno}>{serialNumber}</Text>
            </View>

            <Text style={styles.welcomeText}>GAS SENSOR READINGS</Text>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 1 && styles.activeTab]}
                    onPress={() => setActiveTab(1)}
                >
                    <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>LASER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 2 && styles.activeTab]}
                    onPress={() => setActiveTab(2)}
                >
                    <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>INFRARED</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 3 && styles.activeTab]}
                    onPress={() => setActiveTab(3)}
                >
                    <Text style={[styles.tabText, activeTab === 3 && styles.activeTabText]}>ACOUSTIC</Text>
                </TouchableOpacity>
            </View>

            {/* Render Components Based on Active Tab */}
            <View style={styles.content}>
                {activeTab === 1 && <Graph1 style={styles.graph} dataA={dataA} dataB={dataB} />}
                {activeTab === 2 && <Graph2 style={styles.graph} dataC={dataC} />}
                {activeTab === 3 && <TableComponent data={{ dataD }} />}
            </View>

            {/* Clear Button */}
            <TouchableOpacity style={styles.clearButton} onPress={clearData}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>

            <Text style={styles.subTextdown}>Powered by SONIC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        alignItems: "center",
        paddingTop: 50,
        padding: 20,
    },
    logo: {
        position: 'absolute',
        width: 200,
        height: 80,
        resizeMode: 'contain',
        left: 10,
        top: 10,
    },
    serialbox: {
        position: 'absolute',
        width: 150,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#888',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 20,
        right: 10,
        top: 10,
    },
    serialno: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: '#16b800',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: "900",
        color: "rgba(255, 255, 255, 0.4)",
        marginTop: 60,
        marginBottom: 20,
        textAlign: "center",
    },
    tabContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#3d3b3b",
        alignItems: "center",
        marginHorizontal: 5,
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: "#5c5a5a",
    },
    tabText: {
        fontSize: 14,
        color: "#ffffff",
    },
    activeTabText: {
        fontWeight: "bold",
        color: "#ffcc00",
    },
    content: {
        flex: 1,
        width: "100%",
    },
    graph: {
        flex: 1,
        justifyContent: "center",
    },
    clearButton: {
        backgroundColor: "#333",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: "center",
    },
    clearButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    subTextdown: {
        fontSize: 11,
        color: "rgba(255, 255, 255, 0.4)",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 5,
    },
});