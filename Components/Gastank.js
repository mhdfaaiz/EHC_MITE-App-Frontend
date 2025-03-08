import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const GasMonitor = ({ initialLevel = 45 }) => {
  const [level, setLevel] = useState(initialLevel);
  const heightAnim = useState(new Animated.Value(level))[0];
  const needleAnim = useState(new Animated.Value(level))[0];

  // Simulate backend updates (replace this with actual API calls)
  useEffect(() => {
    const interval = setInterval(() => {
      const newLevel = Math.floor(Math.random() * 100);
      updateLevel(newLevel);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateLevel = (newLevel) => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: newLevel,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(needleAnim, {
        toValue: newLevel,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
    setLevel(newLevel);
  };

  const interpolatedHeight = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const needleRotation = needleAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['-120deg', '120deg'],
  });

  return (
    <View style={styles.container}>
      {/* Gas Tank Visualization */}
      <View style={styles.tankContainer}>
        <LinearGradient
          colors={['#4a4a4a', '#2a2a2a']}
          style={styles.tankOuter}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Animated.View style={[styles.liquid, { height: interpolatedHeight }]}>
            <LinearGradient
              colors={['#00b4ff', '#0066ff']}
              style={styles.liquidInner}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.liquidHighlight} />
          </Animated.View>
          <View style={styles.tankOverlay} />
        </LinearGradient>
        <View style={styles.tankStand} />

            {/* Digital Display */}
        <View style={styles.display}>
            <Text style={styles.displayText}>{Math.round(level)}%</Text>
        </View>
      </View>

      

      {/* Analog Meter */}
      <View style={styles.meterContainer}>
        <Svg height="200" width="200">
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="#333"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M100 20 V40"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Add more gauge markers here */}
        </Svg>
        <Animated.View style={[styles.needle, { transform: [{ rotate: needleRotation }] }]} />
        <View style={styles.centerCap} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'center',
  },
  tankContainer: {
    alignItems: 'center',
  },
  tankOuter: {
    width: 160,
    height: 280,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  liquid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  liquidInner: {
    flex: 1,
    opacity: 0.9,
  },
  liquidHighlight: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
  },
  tankOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 40,
  },
  tankStand: {
    width: 200,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: -10,
  },
  display: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  displayText: {
    color: '#444',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  meterContainer: {
    position: 'relative',
    marginTop: 30,
  },
  needle: {
    position: 'absolute',
    width: 2,
    height: 80,
    backgroundColor: '#ff0000',
    left: 99,
    top: 20,
    transformOrigin: 'bottom center',
  },
  centerCap: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#444',
    top: 90,
    left: 90,
  },
});

export default GasMonitor;