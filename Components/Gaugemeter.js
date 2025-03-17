import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Svg, { Circle, Path, Line, Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";

const ProfessionalGauge = ({ percentage = 0 }) => {
  const size = 250;
  const strokeWidth = 25;
  const center = size / 2;
  const radius = center - strokeWidth;

  // Animated Value for Smooth Needle Movement
  const rotation = useRef(new Animated.Value(percentage)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [percentage]);

  // Interpolating Rotation for the Needle
  const needleRotation = rotation.interpolate({
    inputRange: [0, 100],
    outputRange: ['-143deg', '142deg'], // Adjusted rotation range
  });

  // Arc Path Function
  const createArc = (startAngle, endAngle) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    return `
      M ${center + radius * Math.cos(startRad)} ${center + radius * Math.sin(startRad)}
      A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 
      ${center + radius * Math.cos(endRad)} ${center + radius * Math.sin(endRad)}
    `;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#4CAF50" stopOpacity="1" />
            <Stop offset="0.5" stopColor="#FFEB3B" stopOpacity="1" />
            <Stop offset="1" stopColor="#F44336" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Base Circle */}
        <Circle cx={center} cy={center} r={radius} fill="#1a1a1a" stroke="#333" strokeWidth={2} />

        {/* Progress Track */}
        <Path d={createArc(-235, 55)} stroke="#333" strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />

        {/* Graduations */}
        {Array.from({ length: 101 }).map((_, index) => {
          const angle = -233 + (285 / 100) * index; // Adjusted angle for 101 graduations
          return (
            <Line
              key={index}
              x1={center + (radius - (index % 10 === 0 ? 25 : 15)) * Math.cos((angle * Math.PI) / 180)}
              y1={center + (radius - (index % 10 === 0 ? 25 : 15)) * Math.sin((angle * Math.PI) / 180)}
              x2={center + (radius - 5) * Math.cos((angle * Math.PI) / 180)}
              y2={center + (radius - 5) * Math.sin((angle * Math.PI) / 180)}
              stroke={index % 10 === 0 ? "#fff" : "#666"}
              strokeWidth={index % 10 === 0 ? 2 : 1}
            />
          );
        })}

        {/* Labels */}
        {Array.from({ length: 11 }).map((_, index) => {
          const value = index * 10;
          const angle = -230 + (285 / 10) * index; // Adjusted angle for 11 labels (0 to 100)
          const x = center + (radius - 40) * Math.cos((angle * Math.PI) / 180);
          const y = center + (radius - 40) * Math.sin((angle * Math.PI) / 180);
          return (
            <SvgText
              key={index}
              x={x}
              y={y}
              fill="#fff"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {value}
            </SvgText>
          );
        })}

        {/* Needle - Fixed Rotation */}
        <Animated.View
          style={{
            position: "absolute",
            left: center - 5, // Adjust for correct alignment
            top: center - radius, // Keep the base fixed at the center
            width: 10,
            height: radius,
            transform: [{ rotate: needleRotation }],
            transformOrigin: "center bottom",
          }}
        >
          <Svg width={10} height={radius}>
            <Path d="M 5 0 L 0 100 L 10 100 Z" fill="red" />
          </Svg>
        </Animated.View>

        {/* Center Cap (Needle Pivot) */}
        <Circle cx={center} cy={center} r={12} fill="black" stroke="#333" strokeWidth={2} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfessionalGauge;