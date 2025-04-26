import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function TableComponent({ data }) {
    const { dataD } = data;

    // Generate timestamps for each entry in dataD
    const timestamps = dataD.map((_, index) => {
        const now = new Date();
        now.setSeconds(now.getSeconds() - (dataD.length - 1 - index) * 10); // Example: subtract 10 seconds for each entry
        return now.toLocaleString();
    });

    return (
        <View style={styles.container}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Datetime</Text>
                <Text style={styles.headerText}>Readings</Text>
            </View>

            {/* Table Data */}
            <ScrollView style={styles.dataContainer}>
                {dataD.map((value, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.rowText}>{timestamps[index]}</Text>
                        <Text style={styles.rowText}>{value} mA</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282828",
        padding: 10,
        borderRadius: 8,
        maxHeight: 500, // Reduced height for the table
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#3d3b3b",
        padding: 10,
        borderRadius: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    dataContainer: {
        flex: 1,
        backgroundColor: "#282828",
    },
    tableRow: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
    },
    rowText: {
        flex: 1,
        color: "#fff",
        textAlign: "center",
    },
});