import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const IndicatorGrid = ({ iconNames, indicatorname, getIndicatorColor }) => {
    return (
        <View style={styles.indicatorContainer}>
            <View style={styles.indicatorRow}>
                {iconNames.map((name, index) => (
                    <View key={index} style={styles.indicatorWrapper}>
                        <View style={styles.outerBezel}>
                            <View style={styles.reflection} />
                            <View style={styles.outerRing}>
                                <View
                                    style={[
                                        styles.innerGlow,
                                        { backgroundColor: getIndicatorColor(name) || 'grey' },
                                    ]}
                                />
                                <View
                                    style={[
                                        styles.indicator,
                                        { backgroundColor: getIndicatorColor(name) || 'grey' },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.indicatornameRow}>
                {indicatorname.map((indicator) => (
                    <View key={indicator.id} style={styles.indicatorWrapper}>
                        <Text style={styles.label}>{indicator.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default IndicatorGrid;