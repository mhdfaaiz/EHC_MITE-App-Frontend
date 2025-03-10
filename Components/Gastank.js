import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, { Circle, Path, G, Text as SvgText } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const GasMonitor = ({ voltage = 0 }) => {
  // Handle NaN and invalid voltage values
  const parseVoltage = () => {
    const parsed = parseFloat(voltage);
    return isNaN(parsed) ? 0 : Math.max(0, Math.min(parsed, 6)); // Assume 0-6V input range
  };

  const safeVoltage = parseVoltage();
  const initialLevel = Math.min(Math.max((safeVoltage / 6) * 100, 0), 100);
  const [displayLevel, setDisplayLevel] = useState(initialLevel);
  const heightAnim = useState(new Animated.Value(initialLevel))[0];
  const needleAnim = useState(new Animated.Value(initialLevel))[0];

  useEffect(() => {
    const newLevel = Math.min(Math.max((safeVoltage / 6) * 100, 0), 100);
    updateLevel(newLevel);
  }, [safeVoltage]);

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
  };

  const liquidHeight = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 280],
  });

  const needleRotation = needleAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['-120deg', '120deg'],
  });

  const renderTicks = () => {
    const ticks = [];
    for (let i = -120; i <= 120; i += 30) {
      ticks.push(
        <G key={i} rotation={i} origin="110, 110">
          <Path
            d="M110 30 V45"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      );
    }
    return ticks;
  };

  return (
    <View style={styles.container}>
      {/* Tank Section */}
      <View style={styles.tankWrapper}>
        <LinearGradient
          colors={['#2a2a2a', '#1a1a1a']}
          style={styles.tankOuter}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Animated.View style={[styles.liquid, { height: liquidHeight }]}>
            <LinearGradient
              colors={['#00f2fe', '#0056ff']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.liquidHighlight} />
          </Animated.View>
          <View style={styles.tankOverlay} />
        </LinearGradient>
        <View style={styles.tankStand} />
      </View>

      {/* Digital Display */}
      <View style={styles.displayContainer}>
        <LinearGradient
          colors={['#1a1a1a', '#000']}
          style={styles.displayInner}>
          <Text style={styles.displayText}>
            {Math.round(displayLevel)}%
          </Text>
          <Text style={styles.displayLabel}>GAS LEVEL</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    paddingTop: 40,
    width : 400
  },
  tankWrapper: {
    alignItems: 'center',
    shadowColor: '#00f4ff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 30,
  },
  tankOuter: {
    width: 120,
    height: 280,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#333',
  },
  liquid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  liquidHighlight: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
  },
  tankOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 6,
    borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 30,
  },
  tankStand: {
    width: 140,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: -10,
    borderWidth: 2,
    borderColor: '#222',
  },
  displayContainer: {
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 3,
    marginBottom: 30,
    shadowColor: '#00f4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  displayInner: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  displayText: {
    color: '#00ff88',
    fontSize: 36,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  displayLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    letterSpacing: 1.5,
  },
  meterContainer: {
    position: 'relative',
    marginTop: 20,
  },
  needle: {
    position: 'absolute',
    width: 3,
    height: 90,
    backgroundColor: '#ff4444',
    left: 108,
    top: 25,
    transformOrigin: 'bottom center',
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 2,
  },
  centerCap: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    top: 98,
    left: 98,
  },
});

export default GasMonitor;