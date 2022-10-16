import 'react-native-gesture-handler';
import React from 'react';
import { EntryStackScreen } from "./src/screens/EntryHandler";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <EntryStackScreen />
    </NavigationContainer>
  );
}
