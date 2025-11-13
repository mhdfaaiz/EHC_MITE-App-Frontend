import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch, ScrollView ,Image} from 'react-native';

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
            const updateNamesPromises = indicatorname.map(({ id, name }) =>
                fetch(`https://soniciot.com/api/indicators/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name }),
                })
            );
            await Promise.all(updateNamesPromises);

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

            if (onUpdate) {
                onUpdate({ updatedIndicatornames: indicatorname, updatedReversestate: isReversed });
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image 
                    style={styles.logo} 
                    source={require('../assets/EHC-Black-trans.png')} // Change this to your image path
                    resizeMode="contain"
                />
                <Text style={styles.pageTitle}>Settings</Text>

                <View style={styles.card}>
                    {/* Section Title */}
                    <Text style={styles.sectionTitle}>Change Indicator Names</Text>

                    {/* Indicator Name List */}
                    <View style={styles.indicatorList}>
                        {indicatorname.map(({ id, name }) => (
                            <View key={id} style={styles.indicatorWrapper}>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.textInput}
                                        value={name}
                                        onChangeText={(newName) => handleNameChange(id, newName)}
                                    />
                                ) : (
                                    <Text style={styles.indicatorName}>{name}</Text>
                                )}
                            </View>
                        ))}
                    </View>

                    {/* Edit/Save Button */}
                    <View style={styles.buttonRow}>
                        {!isEditing ? (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setIsEditing(false)}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Reverse Indicator Section */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Reverse Indicator</Text>
                    <View style={styles.switchRow}>
                        <Switch value={isReversed} onValueChange={setIsReversed} />
                        <Text style={styles.switchLabel}>{isReversed ? 'Enabled' : 'Disabled'}</Text>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.subTextdown}>Powered by SONIC</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        position: 'absolute',
        width: 90,
        height: 50,
        resizeMode: 'contain',
        opacity : 0.8,
        left : 10,
        top : 10
    },
    subTextdown: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    pageTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 20,
    },
    scrollContainer: {
        flexGrow: 1, // Makes sure content can expand within ScrollView
    },
    card: {
        width: '100%',
        backgroundColor: '#1f1f1f', // Card background for sections
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 15,
        fontWeight: '500',
    },
    indicatorList: {
        marginBottom: 20,
    },
    indicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 10,
    },
    indicatorName: {
        fontSize: 18,
        color: '#fff',
        flex: 1,
    },
    textInput: {
        width: '80%',
        backgroundColor: '#333',
        padding: 10,
        color: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#888',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#3d3b3b', // Blue color
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#3d3b3b', // Vibrant Orange color for action
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginTop: 30,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchLabel: {
        fontSize: 16,
        color: '#bbb',
    },
});

