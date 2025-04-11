import { StyleSheet, Text, View } from "react-native";
const { io } = require("socket.io-client");
import React, { useEffect, useState } from "react";
import Graph from "../Components/Graph";

export default function App({ route, navigation }) {
    const [dataA, setDataA] = useState([]);
    const [dataB, setDataB] = useState([]);
    const [dataC, setDataC] = useState([]);
    const [dataD, setDataD] = useState([]);
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

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>GAS LEVEL MONITOR</Text>
            <Graph style={styles.graph} dataA={dataA} dataB={dataB} dataC={dataC} dataD={dataD} />
            <Text style={styles.subTextdown}>Powered by SONIC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        alignItems: "center",
        padding: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "900",
        color: "rgba(255, 255, 255, 0.4)",
        marginBottom: 20,
        textAlign: "center",
    },
    graph: {
        flex: 1,
        justifyContent: "top",
    },
    GasTank: {
        borderCurve: 30,
    },
    subText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 30,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#3d3b3b",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subTextdown: {
        fontSize: 11,
        color: "rgba(255, 255, 255, 0.4)",
        textAlign: "center",
        marginLeft: 20,
        marginTop: 5,
    },
});