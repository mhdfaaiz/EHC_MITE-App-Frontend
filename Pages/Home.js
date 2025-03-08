import { StyleSheet, Text, Button, View, Image, TouchableOpacity } from 'react-native';

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <Image style={styles.logo} source={require('../assets/adnoc.png')} />


            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome to Gas Panel Monitor</Text>
            <Text style={styles.subText}>Powered by SONIC</Text>

            {/* Navigation Button for New Page */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Gaslevel')}
            >
                <Text style={styles.buttonText}>Go to Main Page</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
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
    button: {
        backgroundColor: '#3d3b3b',
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
