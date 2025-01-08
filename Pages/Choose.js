import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SerialNumberPage({ navigation }) {
    const [selectedName, setSelectedName] = useState('');
    const [dropdownData, setDropdownData] = useState([]);

    // Fetch data from backend using fetch API
    useEffect(() => {
        fetch('https://soniciot.com/api/Serial_List') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setDropdownData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleNextPage = () => {
        if (!selectedName) {
            alert('Please select a Field');
            return;
        }

        const serialNumber = dropdownData.find(
            (item) => item.name === selectedName
        )?.serial_number;

        if (!serialNumber) {
            alert('Serial number not found');
            return;
        }

        // Navigate to the next page and pass the serial number
        navigation.navigate('Main', { serialNumber });
    };

    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <Image style={styles.logo} source={require('../assets/logos.png')} />

            <View style={styles.content}>
                {/* Welcome Text */}
                <Text style={styles.welcomeText}>Select your Field</Text>
                <Text style={styles.subText}>Choose from the list below to proceed</Text>

                {/* Dropdown */}
                <Picker
                    selectedValue={selectedName}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedName(itemValue)}
                >

                    {dropdownData.map((item) => (
                        <Picker.Item key={item.serial_number} label={item.name} value={item.name} />
                    ))}
                </Picker>

                {/* Navigation Button */}
                <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginBottom: 20,
        width: 190,
        height: 50,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
    },
    picker: {
        width: '80%',
        height: 60,
        backgroundColor: '#fff',
        color: 'green',
        borderWidth: 5,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#161c55',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
