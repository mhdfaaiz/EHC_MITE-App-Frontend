import { StyleSheet, Text, Button, View, Image, TouchableOpacity } from 'react-native';

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <View style={[styles.logoContainer, styles.elevation]}>
                <Image 
                    style={styles.logo} 
                    source={require('../assets/adnoc.png')} 
                    resizeMode="contain"
                /> 
            </View>

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome to Gas Panel Monitor</Text>
            <Text style={styles.subText}>Powered by SONIC</Text>

            {/* Navigation Button for New Page */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Choose')}
            >
                <Text style={styles.buttonText}>Go to Main Page</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        width : 200 ,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      elevation: {
        elevation: 20,
        shadowColor: '#000',
      },
    logo: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        borderCurve: 'circular'
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
