import { StyleSheet, Text, View, TouchableOpacity ,Image} from "react-native";
const { io } = require("socket.io-client");
import React, { useEffect, useState } from "react";
import Graph from "../Components/Graph";
import GasTank from "../Components/Gastank";

export default function App({ route, navigation }) {
    const [voltageData, setVoltageData] = useState([0, 0, 0, 0, 0, 0]); // Default array
    const [volt, setVolt] = useState();
    const serialNumber = route.params?.serialNumber;

    useEffect(() => {
        const socket = io("https://soniciot.com");

        socket.on("voltage", (data) => {
            data = JSON.parse(data);
            if (data.serial ==serialNumber) {
                setVolt(data.voltage);
                if (data && data.voltage !== undefined) {
                    setVoltageData((prevData) => [...prevData.slice(1), data.voltage]); // Keep last 6 values

            }}
        });
        

        return () => socket.disconnect(); // Clean up on unmount
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>GAS LEVEL MONITOR</Text>
            <Graph style={styles.graph} dataPoints={voltageData} /> 
            <GasTank style={styles.GasTank} voltage={volt} />

            <Text style={styles.subTextdown}>Powered by SONIC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '900',
        color: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        textAlign: 'center',
    },
    graph: {
        flex: 1,
        justifyContent: 'top',
    },
    GasTank : {
        borderCurve: 30
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
    subTextdown: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginLeft: 20,
        marginTop: 5
    },
});


