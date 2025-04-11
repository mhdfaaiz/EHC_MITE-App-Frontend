import React from 'react';
import { View, Text } from 'react-native';
import SignalDisplay from '../Components/signalDisplay';
import styles from './styles';

const StatusDisplay = ({ serialNumber, connectionState }) => {
    return (
        <View style={styles.intro}>
            <View style={styles.serialbox}>
                <Text style={styles.serialno}>{connectionState.serialNo || serialNumber}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={[styles.statusText, { color: connectionState.color }]}>
                    {connectionState.color === '#16b800' ? 'ONLINE' : 'OFFLINE'}
                </Text>
                <SignalDisplay serialNo={serialNumber} />
            </View>
        </View>
    );
};

export default StatusDisplay;