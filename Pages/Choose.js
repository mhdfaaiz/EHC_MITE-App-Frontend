import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function SerialNumberPage({ navigation }) {
    const [selectedName, setSelectedName] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://soniciot.com/api/Serial_List')
            .then((response) => response.json())
            .then((data) =>
                setItems(data.map((item) => ({ label: item.name, value: item.serial_number })))
            )
            .catch((error) => console.error(error));
    }, []);

    const handleNextPage = () => {
        if (!selectedName) {
            alert('Please select the field');
            return;
        }
        navigation.navigate('Main', { serialNumber: selectedName });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Device</Text>
            <Text style={styles.subText}>Choose from the list below to proceed</Text>
            <Dropdown
                data={items}
                labelField="label"
                valueField="value"
                placeholder="Select a field"
                value={selectedName}
                onChange={(item) => setSelectedName(item.value)}
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                selectedTextStyle={styles.dropdownText}
                flatListProps={{
                    nestedScrollEnabled: true, // Allows the dropdown to function correctly.
                }}
            />
            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    subText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: '#292929',
        borderRadius: 8,
        borderColor: '#444',
        paddingHorizontal: 12,
        width: '80%',
        marginBottom: 20,
        height: 50
    },
    dropdownContainer: {
        backgroundColor: '#292929',

    },
    dropdownText: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#e3dfde',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});
