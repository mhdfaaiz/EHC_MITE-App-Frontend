import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const Header = ({ handleNextPage }) => {
    return (
        <View style={styles.first}>
            <Image 
                style={styles.logo} 
                source={require('../assets/logos.png')} 
                resizeMode="contain"
            />
            <Icon style={styles.settings} name="settings-outline" size={30} color="gray" onPress={handleNextPage} />
        </View>
    );
};

export default Header;