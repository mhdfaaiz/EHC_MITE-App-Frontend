import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Line, G, Defs, LinearGradient, Stop, RadialGradient } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

const ProfessionalGauge = ({ percentage = 50}) => {
  const size = 200;
  const strokeWidth = 25;
  const center = size / 2;
  const radius = center - strokeWidth;
  const rotation = useRef(new Animated.Value(percentage)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [percentage, rotation]);

  const needleRotation = rotation.interpolate({
    inputRange: [0, 100],
    outputRange: ['-135deg', '135deg'],
  });

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
          
          <RadialGradient id="glassEffect" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Base Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth={2}
        />

        {/* Progress Track */}
        <Path
          d={createArc(-200, 20)}
          stroke="#333"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Progress Fill */}
        <Path
          d={createArc(-200, -110 + (2.7 * percentage))}
          stroke="url(#progressGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Graduations */}
        {Array.from({ length: 81 }).map((_, index) => {
          const angle = -100 + (index * 4.5);
          return (
            <Line
              key={index}
              x1={center + (radius - (index % 5 === 0 ? 25 : 15)) * Math.cos((angle * Math.PI) / 180)}
              y1={center + (radius - (index % 5 === 0 ? 25 : 15)) * Math.sin((angle * Math.PI) / 180)}
              x2={center + (radius - 5) * Math.cos((angle * Math.PI) / 180)}
              y2={center + (radius - 5) * Math.sin((angle * Math.PI) / 180)}
              stroke={index % 10 === 0 ? "#fff" : "#666"}
              strokeWidth={index % 10 === 0 ? 2 : 1}
            />
          );
        })}

        {/* Needle */}
        <AnimatedG
          transform={[
            { rotate: needleRotation },
            { translateX: center },
            { translateY: center },
          ]}
        >
          <Path
            d="M-6 0 L0 -75 L6 0 Z"
            fill="url(#needleGrad)"
            stroke="#555"
            strokeWidth={0.5}
          />
          <Line
            x1={0}
            y1={-radius + 30}
            x2={0}
            y2={-10}
            stroke="#fff"
            strokeWidth={1}
            opacity={0.3}
          />
        </AnimatedG>

        {/* Center Cap */}
        <Circle
          cx={center}
          cy={center}
          r={15}
          fill="url(#centerGrad)"
          stroke="#333"
          strokeWidth={2}
        />

        {/* Glass Overlay */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="url(#glassEffect)"
        />

        {/* Value Display */}
        <Text
          x={center}
          y={center + 40}
          textAnchor="middle"
          fill="#fff"
          fontSize={28}
          fontWeight="bold"
          fontFamily="sans-serif">
          {percentage}%
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080808',
    paddingLeft: 30,
  },
});

export default ProfessionalGauge;