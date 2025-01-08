import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SerialNumberDisplay = ({ serialNumber }) => {
    return (
        <View style={styles.container}>
            <View style={styles.displayWrapper}>
                <Text style={styles.serialText}>1883c40496c6</Text>
            </View>
        </View>
    );
};

export default SerialNumberDisplay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Dark background for the panel
    },
    displayWrapper: {
        width: 200, // Adjust width as per your design
        height: 50, // Adjust height for a small display
        backgroundColor: '#000', // Display background color
        borderRadius: 10, // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, // Border width for a metallic finish
        borderColor: '#888', // Border color
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5, // Elevation for Android
    },
    serialText: {
        fontSize: 18, // Font size for the serial number
        fontWeight: 'bold',
        color: '#fff', // White text color
        textShadowColor: '#16b800', // Green shadow for a glowing effect
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10, // Create a glowing effect
    },
});
