import React, { useEffect, useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({dataC = []}) {
    const [labels, setLabels] = useState([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initializeGraph = () => {
            const now = new Date();
            const maxLength = Math.max(
                dataC.length || 6, 
            ); // Default to 6 points if arrays are empty

            return Array.from({ length: maxLength }, (_, i) => {
                const time = new Date(now.getTime() - (maxLength - 1 - i) * 1000);
                const hours = time.getHours().toString().padStart(2, "0");
                const minutes = time.getMinutes().toString().padStart(2, "0");
                const seconds = time.getSeconds().toString().padStart(2, "0");
                return `${hours}:${minutes}:${seconds}`;
            });
        };

        if (!initialized) {
            setLabels(initializeGraph());
            setInitialized(true);
        } else {
            const updatedLabels = initializeGraph();
            setLabels(updatedLabels);
        }
    }, [dataC]);

    const safeMap = (arr, defaultLength = 6) =>
        Array.from({ length: Math.max(arr.length, defaultLength) }, (_, i) => {
            const val = Number(arr[i]) || 0; // Default to 0 if no value exists
            return isFinite(val) ? val : 0; // Use the exact value instead of converting to percentages
        });
    const exactDataC = safeMap(dataC);

    // Calculate dynamic width based on the number of data points
    const dataLength = Math.max(
        exactDataC.length, 
    );
    const chartWidth = Math.max(Dimensions.get("window").width, dataLength * 60); // 60px per data point

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            { data: exactDataC, color: (opacity = 1) => `rgba(34, 193, 195, ${opacity})`, strokeWidth: 2 }, // C
                        ],
                    }}
                    width={chartWidth} // Dynamic width
                    height={500}
                    chartConfig={{
                        backgroundGradientFrom: "#000",
                        backgroundGradientTo: "#333",
                        decimalPlaces: 2, // Display up to 2 decimal places
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
                    }}
                    bezier
                    style={{ marginVertical: 8, borderRadius: 16 }}
                />
            </View>
        </ScrollView>
    );
}