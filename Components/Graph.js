import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ dataA = [], dataB = [], dataC = [], dataD = [] }) {
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const getTimeLabels = () => {
            const now = new Date();
            const maxLength = Math.max(dataA.length, dataB.length, dataC.length, dataD.length);
            return Array.from({ length: maxLength }, (_, i) => {
                const time = new Date(now.getTime() - (maxLength - 1 - i) * 1000);
                const hours = time.getHours().toString().padStart(2, "0");
                const minutes = time.getMinutes().toString().padStart(2, "0");
                const seconds = time.getSeconds().toString().padStart(2, "0");
                return `${hours}:${minutes}:${seconds}`;
            });
        };

        setLabels(getTimeLabels());
    }, [dataA, dataB, dataC, dataD]);

    const safeMap = (arr) =>
        arr.map((point) => {
            const val = Number(point);
            const percent = (val / 890) * 100; // Assuming 890 is the max value
            return isFinite(percent) ? percent : 0;
        });

    const percentageDataA = safeMap(dataA);
    const percentageDataB = safeMap(dataB);
    const percentageDataC = safeMap(dataC);
    const percentageDataD = safeMap(dataD);

    if (
        percentageDataA.length === 0 &&
        percentageDataB.length === 0 &&
        percentageDataC.length === 0 &&
        percentageDataD.length === 0
    ) {
        return null; // Or show a loading indicator
    }

    return (
        <View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        { data: percentageDataA, color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, strokeWidth: 2 }, // A
                        { data: percentageDataB, color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, strokeWidth: 2 }, // B
                        { data: percentageDataC, color: (opacity = 1) => `rgba(34, 193, 195, ${opacity})`, strokeWidth: 2 }, // C
                        { data: percentageDataD, color: (opacity = 1) => `rgba(253, 187, 45, ${opacity})`, strokeWidth: 2 }, // D
                    ],
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