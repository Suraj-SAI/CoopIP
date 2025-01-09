import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/navigationService';
import { Route } from '../utils/routes';
import BeforeLoginNavigator from './beforeLogin';
import AfterLoginNavigator from './afterLogin';
import * as Storage from '../helper/AsyncStorageConfig';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ipLoginAction } from '../redux/actions/loginAction';


const Stack = createNativeStackNavigator();

const Navigator = () => {
    const dispatch = useDispatch<any>()
    const { isLoggedIn } = useSelector((store: any) => store.loginReducer)

    const getDataAndLogin = async () => {
        try {
            const uniqueId = await Storage.getData("uniqueId");
            const token = await Storage.getData("token");
            console.log(uniqueId , token , "3 data");
            
            if (uniqueId && token) {
                await loginWithIp(uniqueId, token);
            } else {
                Toast.show('Missing required data for login', 2000);
            }
        } catch (error) {
            console.error("Error fetching data from storage:", error);
            Toast.show('Error fetching data', 2000);
        }
    };

    const loginWithIp = async (uniqueId: any, token: any) => {
        try {
            try {
                await dispatch(ipLoginAction(uniqueId, token))
            } catch (error) {
                Toast.show('Ip Login Failed', 2000, {
                    backgroundColor: 'red',
                });
            }

        } catch (error) {
            Toast.show('Invalid Ip Address', 2000, {
                backgroundColor: 'red',
            });
        }
    }

    useEffect(() => {
        getDataAndLogin()
    }, [])

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
