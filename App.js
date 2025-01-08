import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home'; // Home page
import Main from './Pages/Main'; // Main page
import Choose from './Pages/Choose'; // choose page
import Settings from './Pages/Settings'; //settings page
import Sample from './Pages/Sample';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name='Choose' component={Choose} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Sample' component={Sample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
