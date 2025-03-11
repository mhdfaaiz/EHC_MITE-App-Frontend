import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ dataPoints = [0, 0, 0, 0, 0, 0] }) {
    const labels = ["3.56", "2.67", "3.67", "2.98", "0.8", "6"]; // Represents last 6 readings

    return (
        <View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{ data: dataPoints }],
                }}
                width={Dimensions.get("window").width - 40}
                height={240}
                yAxisSuffix="V" // Voltage unit
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
                style={{ marginVertical: 8, borderRadius: 16 ,}}
            />
        </View>
    );
}
