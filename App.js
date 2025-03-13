import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import Main from './Pages/Main';
import Choose from './Pages/Choose';
import Settings from './Pages/Settings';
import Notification from './Components/Notification';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Gaslevel from './Pages/Gaslevel';
import Graph from './Components/Graph';
import GasTank from './Components/Gastank';

export default function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('✅ Notification permission granted.');
      } else {
        console.log('❌ Notification permission denied.');
      }
    };

    const getTokenAndSendToBackend = async () => {
      try {
        const token = await messaging().getToken();
        console.log('🔑 FCM Token:', token);
  
        // Send the token to the backend
        await fetch('https://soniciot.com/api/save-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
      } catch (error) {
        console.error('🔥 Error getting FCM token:', error);
      }
    };
  

    requestUserPermission();
    getTokenAndSendToBackend();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground Notification Received:', remoteMessage);

      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
        vibrate: true,
        importance: 4,
      });
    });

    return unsubscribe; // Cleanup function
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Alarms" component={Main} />
        <Stack.Screen name="Main" component={Choose} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="GasLevel" component={Gaslevel} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="GasTank" component={GasTank} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
