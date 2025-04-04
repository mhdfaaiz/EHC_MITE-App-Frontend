import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';


export default function App({ navigation }) {



    return (
        <View style={styles.container}>
            <Text>Notification test</Text>
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
});
