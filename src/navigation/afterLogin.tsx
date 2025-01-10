import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../utils/routes';
import HomePage from '../screens/AfterLogin/Home';

const AfterLoginStack = createNativeStackNavigator();

const AfterLoginNavigator = () => {
  return (
    <AfterLoginStack.Navigator screenOptions={{ headerShown: false }}>
      <AfterLoginStack.Screen name={Route.UNATTENDED} component={HomePage} />
    </AfterLoginStack.Navigator>
  )
}

export default AfterLoginNavigator