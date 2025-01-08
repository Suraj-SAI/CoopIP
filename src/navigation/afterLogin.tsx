import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../utils/routes';
import UnAttended from '../screens/AfterLogin/UnAttendedScreen';

const AfterLoginStack = createNativeStackNavigator();

const AfterLoginNavigator = () => {
  return (
    <AfterLoginStack.Navigator screenOptions={{ headerShown: false }}>
      <AfterLoginStack.Screen name={Route.UNATTENDED} component={UnAttended} />
    </AfterLoginStack.Navigator>
  )
}

export default AfterLoginNavigator