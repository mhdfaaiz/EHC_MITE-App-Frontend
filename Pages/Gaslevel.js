import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
const { io } = require("socket.io-client");
import React, { useEffect, useState } from "react";
import Graph from "../Components/Graph";
import GasTank from "../Components/Gastank";

export default function App({ navigation }) {
    const [voltageData, setVoltageData] = useState([0, 0, 0, 0, 0, 0]); // Default array
    const [volt, setVolt] = useState();
    useEffect(() => {
        const socket = io("https://soniciot.com");

        socket.on("voltage", (data) => {
            data = JSON.parse(data);
            setVolt(data.voltage);
            if (data && data.voltage !== undefined) {
                setVoltageData((prevData) => [...prevData.slice(1), data.voltage]); // Keep last 6 values
            }
        });

        return () => socket.disconnect(); // Clean up on unmount
    }, []);

    return (
        <View style={styles.container}>
            <Graph style={styles.graph} dataPoints={voltageData} /> 
            <GasTank style={styles.GasTank} voltage={volt} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
    },
    graph: {
        flex: 1,
        justifyContent: 'top',
    },
    GasTank : {
        borderCurve: 30
    },
    logo: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3d3b3b',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});


