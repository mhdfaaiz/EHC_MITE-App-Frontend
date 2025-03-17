import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Gaugemeter from './Gaugemeter';

const { width } = Dimensions.get('window');

const GasMonitor = ({ voltage }) => {
  // Handle NaN and invalid voltage values
  const parseVoltage = () => {
    const parsed = parseFloat(voltage);
    return isNaN(parsed) ? 0 : Math.max(0, Math.min(parsed, 890)); // Assume 0-880V input range
  };

  const safeVoltage = parseVoltage();
  const initialLevel = Math.min(Math.max(Math.round((safeVoltage/890) *100, 0)), 100);
  const [displayLevel, setDisplayLevel] = useState(initialLevel);
  const heightAnim = useState(new Animated.Value(initialLevel))[0];

  useEffect(() => {
    const newLevel = Math.min(Math.max(Math.round((safeVoltage/890) *100, 0)), 100);
    updateLevel(newLevel);
    setDisplayLevel(newLevel);
  }, [safeVoltage]);

  const updateLevel = (newLevel) => {
    Animated.parallel([
      Animated.timing(heightAnim, {
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

  return (
    <View style={styles.container}>
          <Gaugemeter percentage={displayLevel} />
          {/* Digital Display */}
          <View style={styles.displayContainer}>
            <LinearGradient
              colors={['#1a1a1a', '#000']}
              style={styles.displayInner}>
              <Text style={styles.displayText}>{Math.round(displayLevel)}%</Text>
              <Text style={styles.displayLabel}>GAS LEVEL</Text>
            </LinearGradient>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor  : '#101010',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  displayContainer: {
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 3,
    shadowColor: '#00f4ff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: '40%',
    height: '17%',
  },
  displayInner: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  displayText: {
    color: '#00ff88',
    fontSize: 18,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  displayLabel: {
    color: '#666',
    fontSize: 10,
    marginTop: 3,
    letterSpacing: 1.5,
  },
});

export default GasMonitor;