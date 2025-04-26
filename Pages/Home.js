import React, { version } from 'react';
import { StyleSheet, Text, Button, View, Image, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import SignalDisplay from '../Components/signalDisplay';
export default function App({ navigation }) {
    return (
        <ImageBackground
            source={require("../assets/BG.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Logo Section */}
                    <View style={[styles.logoContainer, styles.elevation]}>
                        <Image 
                            style={styles.logo} 
                            source={require('../assets/logos.png')} 
                            resizeMode="contain"
                        /> 
                    </View>
                    <View style={[styles.borealpicContainer, styles.elevation]}>
                        <Image 
                            style={styles.borealpic} 
                            source={require('../assets/borealpic.jpg')} 
                            resizeMode="contain"
                        /> 
                    </View>                    
                </View>
                {/* Navigation Button for New Page */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>Go to Main Page</Text>
                </TouchableOpacity>
                <Text style={styles.version}>V 0.1</Text>
                <Text style={styles.subText}>Powered by SONIC</Text>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.58)',
        borderRadius: 5,
        marginTop: 25,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    elevation: {
        elevation: 50,
        shadowColor: '#000',
    },
    logo: {
        width: 250,
        height: 300,
        resizeMode: 'contain',
    },
    borealpic: {
        width: '99%',
        height: '99%',
        opacity: 0.8,
    },
    borealpicContainer: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.58)',
        borderRadius: 5,
        marginTop: 25,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    boreallogo : {
        width: 150,
        height: 200,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '900',
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        width: '80%'
    },
    subText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.51)',
        textAlign: 'center',
        marginBottom: 30
    },
    version: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.51)',
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        backgroundColor: 'rgba(48, 92, 237, 0.5)',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 10,
        width: '70%',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});