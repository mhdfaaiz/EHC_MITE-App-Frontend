import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ScrollView, Dimensions } from "react-native";
import DatePicker from "react-native-date-picker";
import Graph1 from "../Components/Graph1";
import Graph2 from "../Components/Graph2";
import TableComponent from "../Components/Table";

export default function GraphHistory({ route }) {
    const { serialNumber } = route.params; // Retrieve serialNumber passed from the previous page
    const [startDate, setStartDate] = useState(null); // Initially null
    const [endDate, setEndDate] = useState(null); // Initially null
    const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(1); // 1: Graph1, 2: Graph2, 3: Table
    const [graphData, setGraphData] = useState({
        labels: [],
        dataA: [],
        dataB: [],
        dataC: [],
        dataD: [],
    });

    const handleFetchData = async () => {
        if (!startDate || !endDate) {
            Alert.alert("Error", "Please select both start and end dates.");
            return;
        }

        try {
            const startUTC = startDate.toISOString();
            const endUTC = endDate.toISOString();

            const url = `https://transgaz.soniciot.com/GraphHistory?serialNumber=${serialNumber}&start=${startUTC}&end=${endUTC}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.labels && data.dataA && data.dataB && data.dataC && data.dataD) {
                setGraphData(data);
            } else {
                Alert.alert("No Data Found", "No data available for the selected range.");
                setGraphData({ labels: [], dataA: [], dataB: [], dataC: [], dataD: [] });
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            Alert.alert("Error", `Failed to fetch data: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SENSOR READING HISTORY</Text>

            {/* Date Range Selectors */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setIsStartPickerVisible(true)}
                >
                    <Text style={styles.dateButtonText}>
                        {startDate
                            ? startDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
                            : "Select Start Date"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setIsEndPickerVisible(true)}
                >
                    <Text style={styles.dateButtonText}>
                        {endDate
                            ? endDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
                            : "Select End Date"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Start Date Picker Modal */}
            <Modal
                visible={isStartPickerVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsStartPickerVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Start Date</Text>
                        <DatePicker
                            date={startDate || new Date()} // Default to current date
                            mode="datetime"
                            onDateChange={setStartDate}
                            textColor="#000"
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsStartPickerVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* End Date Picker Modal */}
            <Modal
                visible={isEndPickerVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsEndPickerVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select End Date</Text>
                        <DatePicker
                            date={endDate || new Date()} // Default to current date
                            mode="datetime"
                            onDateChange={setEndDate}
                            textColor="#000"
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsEndPickerVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Fetch Data Button */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.fetchButton} onPress={handleFetchData}>
                    <Text style={styles.fetchButtonText}>Fetch Data</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 1 && styles.activeTab]}
                    onPress={() => setActiveTab(1)}
                >
                    <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Graph 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 2 && styles.activeTab]}
                    onPress={() => setActiveTab(2)}
                >
                    <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Graph 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 3 && styles.activeTab]}
                    onPress={() => setActiveTab(3)}
                >
                    <Text style={[styles.tabText, activeTab === 3 && styles.activeTabText]}>Table</Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.content}>
                {activeTab === 1 && <Graph1 dataA={graphData.dataA} dataB={graphData.dataB} />}
                {activeTab === 2 && <Graph2 dataC={graphData.dataC} />}
                {activeTab === 3 && <TableComponent data={{ labels: graphData.labels, dataD: graphData.dataD }} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        alignItems: "center",
        paddingTop: 20,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    dateButton: {
        backgroundColor: "#3d3b3b",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    dateButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#3d3b3b",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    buttonRow: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    fetchButton: {
        backgroundColor: "#3d3b3b",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    fetchButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
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
});