import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/navigationService';
import { Route } from '../utils/routes';
import BeforeLoginNavigator from './beforeLogin';
import AfterLoginNavigator from './afterLogin';
import { useDispatch, useSelector } from 'react-redux';
import { ipLoginAction } from '../redux/actions/loginAction';
import LoaderScreen from '../components/LoaderScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const dispatch = useDispatch<any>()
    const { isLoggedIn, isLoading } = useSelector((store: any) => store.loginReducer);

    const iplogin = async () => {
        await dispatch(ipLoginAction())
    }

    useEffect(() => {
        iplogin();        
    }, [])

    if (isLoading) {
        return (
            <LoaderScreen visible={isLoading}/>
        );
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={Route.AUTHSTACK}
                screenOptions={{ headerShown: false }}
            >
                {
                    isLoggedIn ? (
                        <Stack.Screen
                            name={Route.APPSTACK}
                            component={AfterLoginNavigator}
                        />) : (<Stack.Screen
                            name={Route.AUTHSTACK}
                            component={BeforeLoginNavigator}
                        />)
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
