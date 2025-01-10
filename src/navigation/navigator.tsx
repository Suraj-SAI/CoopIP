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
import { AppState, AppStateStatus } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const dispatch = useDispatch<any>()
    const { isLoggedIn, isLoading } = useSelector((store: any) => store.loginReducer);
    const appState = useRef(AppState.currentState);

    const iplogin = async () => {
        await dispatch(ipLoginAction())
    }

    useEffect(() => {
        iplogin();

        // const handleAppStateChange = (nextAppState: AppStateStatus) => {
        //     if (
        //         appState.current.match(/inactive|background/) &&
        //         nextAppState === 'active'
        //     ) {
        //         console.log('App has come to the foreground, hitting login API.');
        //         iplogin(); 
        //     }
        //     appState.current = nextAppState;
        // };

        // const subscription = AppState.addEventListener(
        //     'change',
        //     handleAppStateChange
        // );

        // return () => {
        //     subscription.remove();
        // };
    }, [])

    if (isLoading) {
        return (
            <LoaderScreen />
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
