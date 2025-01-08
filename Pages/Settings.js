import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from 'react-native';

export default function SettingsPage({ route, navigation }) {
    const { serialNumber, indicatorNames, reverseState, onUpdate } = route.params;
    const [indicatorname, setIndicatorname] = useState(indicatorNames);
    const [isReversed, setIsReversed] = useState(reverseState);
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (id, newName) => {
        setIndicatorname((prevNames) =>
            prevNames.map((item) => (item.id === id ? { ...item, name: newName } : item))
        );
    };

    const handleSubmit = async () => {
        try {
            // Update Indicator Names
            const updateNamesPromises = indicatorname.map(({ id, name }) =>
                fetch(`https://soniciot.com/api/indicators/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name }),
                })
            );
            await Promise.all(updateNamesPromises);
            console.log('All indicator names updated successfully');

            // Update Reverse State
            const reverseResponse = await fetch(
                `https://soniciot.com/api/reverse-indicator/${serialNumber}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isReversed }),
                }
            );
            const reverseData = await reverseResponse.json();
            if (reverseData.success) {
                console.log('Reverse indicator updated successfully');
            }

            // Notify Parent Page
            if (onUpdate) {
                onUpdate({ updatedIndicatornames: indicatorname, updatedReversestate: isReversed });
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Settings</Text>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Change Indicator Names:</Text>
                <TouchableOpacity style={styles.editbutton} onPress={() => setIsEditing(!isEditing)}>
                    <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Name'}</Text>
                </TouchableOpacity>
                <View style={styles.indicatornameRow}>
                    {indicatorname.map(({ id, name }) => (
                        <View key={id} style={styles.indicatorWrapper}>
                            {isEditing ? (
                                <>
                                    <View style={styles.iconss} />
                                    <TextInput
                                        style={styles.textInput}
                                        value={name}
                                        onChangeText={(newName) => handleNameChange(id, newName)}
                                    />
                                </>
                            ) : (
                                <>
                                    <View style={styles.icons} />
                                    <Text style={styles.label}>{name}</Text>
                                </>
                            )}
                        </View>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Reverse Indicator:</Text>
                <View style={styles.switchGroup}>
                    <Switch value={isReversed} onValueChange={setIsReversed} />
                    <Text>{isReversed ? 'Enabled' : 'Disabled'}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 50,
    },
    sectionTitle: {
        fontSize: 22,
        marginVertical: 10,
        width: '100%',
        marginBottom: 30,
        marginTop: 30,
    },
    switchGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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
    indicatornameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '77%',
    },
    indicatorWrapper: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    label: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    editbutton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 30,
    },
    icons: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'red',
        marginLeft: 5,
    },
    iconss: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'green',
        marginLeft: 10,
    },
    textInput: {
        color: 'green',
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        paddingBottom: 5
    },
});
