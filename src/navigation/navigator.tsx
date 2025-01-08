import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/navigationService';
import { Route } from '../utils/routes';
import BeforeLoginNavigator from './beforeLogin';
import AfterLoginNavigator from './afterLogin';
import * as Storage from '../helper/AsyncStorageConfig';
import Toast from 'react-native-simple-toast';


const Stack = createNativeStackNavigator();

const Navigator = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const getDataAndLogin = async () => {
        try {
            const uniqueId = await Storage.getData("uniqueId");
            const token = await Storage.getData("token");
            const ip = await Storage.getData("ipAddress");

            if (uniqueId && token && ip) {
                await loginWithIp(uniqueId, token, ip);
            } else {
                Toast.show('Missing required data for login', 2000);
            }
        } catch (error) {
            console.error("Error fetching data from storage:", error);
            Toast.show('Error fetching data', 2000);
        }
    };

    const loginWithIp = async (uniqueId: any, token: any, ip: any) => {
        try {
            const data = {
                user_id: uniqueId,
                firebase_token: token,
                ip_address: ip,
                company_name: "Coop"
            }
            console.log(data, "Data");
            Toast.show('Data', 2000);

        } catch (error) {
            Toast.show('Invalid Ip Address', 2000);
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
                    loggedIn ? (
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
