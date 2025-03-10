import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function SerialNumberPage({ navigation }) {
    const [selectedName, setSelectedName] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://soniciot.com/api/Serial_List')
            .then((response) => response.json())
            .then((data) => {

                const filteredData = data.filter((item) => item.category === 'adnoc');

                setItems(filteredData.map((item) => ({ label: item.name, value: item.serial_number })))
    })
            .catch((error) => console.error(error));
    }, []);

    const handleNextPage = () => {
        if (!selectedName) {
            alert('Please select the field');
            return;
        }
        navigation.navigate('Main', { serialNumber: selectedName });
    };

      // Tile data
    const tiles = [
        { title: 'Real-time table', onPress: () => navigation.navigate('Main') },
        { title: 'Real-time graph', onPress: () => navigation.navigate('Gaslevel') },
    ];

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
            {/* 2x2 Grid Tiles */}
            <View style={styles.gridContainer}>
                {tiles.map((tile, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.tile}
                    onPress={tile.onPress}
                >
                    <Text style={styles.tileText}>{tile.title}</Text>
                </TouchableOpacity>
                ))}
            </View>
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
        marginBottom: 100,
        height: 50
    },
    dropdownContainer: {
        backgroundColor: 'white',

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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
      },
      tile: {
        width: '48%', // 2 tiles per row with a small gap
        height: 200,
        aspectRatio: 1, // Square tiles
        backgroundColor: '#292929', // White background for tiles
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Shadow for tiles
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: '4%', // Gap between tiles
      },
      tileText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555', // Dark text color
      },
});
