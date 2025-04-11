import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import styles from './styles';

const SwitchButtons = ({ activeButton, handlePressIn, handleButtonPress, currentView, setTableData }) => {
    const getScaleValue = (buttonName) => (activeButton === buttonName ? 1.2 : 1);

    return (
        <View style={styles.switchbuttons}>
            <Animated.View style={{ transform: [{ scale: getScaleValue('live') }] }}>
                <TouchableOpacity onPressIn={() => handlePressIn('live')} onPress={() => handleButtonPress('live')}>
                    <Text style={styles.logs}>Live</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: getScaleValue('logs') }] }}>
                <TouchableOpacity onPressIn={() => handlePressIn('logs')} onPress={() => handleButtonPress('logs')}>
                    <Text style={styles.logs}>Logs</Text>
                </TouchableOpacity>
            </Animated.View>
            {currentView === 'live' && (
                <TouchableOpacity style={styles.clearbutton} onPress={() => setTableData([])}>
                    <Text style={styles.cleartext}>Clear</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SwitchButtons;