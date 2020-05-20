/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './HomeComponent';
import DetailComponent from './DetailComponent';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeComponent}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Detail"
          component={DetailComponent}
          options={{ title: 'Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
