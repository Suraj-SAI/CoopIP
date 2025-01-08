import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../utils/routes';
import IpLogin from '../screens/BeforeLogin/IploginScreen';

const BeforeLoginStack = createNativeStackNavigator();

const BeforeLoginNavigator = () => {
  return (
    <BeforeLoginStack.Navigator screenOptions={{ headerShown: false }}>
      <BeforeLoginStack.Screen name={Route.IPLOGIN} component={IpLogin} />
    </BeforeLoginStack.Navigator>
  )
}

export default BeforeLoginNavigator