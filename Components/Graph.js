import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ dataPoints = [] }) {
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        // Generate time labels with date for the first label and time for the rest
        const getTimeLabels = () => {
            const now = new Date();
            return Array.from({ length: 6 }, (_, i) => {
                const time = new Date(now.getTime() - (5 - i) * 60000); // 1-minute interval
                const day = time.getDate().toString().padStart(2, '0');
                const month = (time.getMonth() + 1).toString().padStart(2, '0');
                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');

                // Add date to the first label and time to the rest
                return i === 0 ? `${day}/${month} ->  ${hours}:${minutes}     ` : `${hours}:${minutes}`;
            });
        };

        setLabels(getTimeLabels());
    }, [dataPoints]); // Update labels when data changes

    // Map voltage values to percentage values
    const percentageDataPoints = dataPoints.map(point => (point/890) *100);

    return (
        <View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{ data: percentageDataPoints.length ? percentageDataPoints : Array(6).fill(0) }],
                }}
                width={Dimensions.get("window").width - 40}
                height={240}
                yAxisSuffix="%"
                chartConfig={{
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#333",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
}