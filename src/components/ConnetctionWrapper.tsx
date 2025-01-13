import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ConnectivityWrapperProps {
  children: React.ReactNode;
}

const ConnectivityWrapper: React.FC<ConnectivityWrapperProps> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected || !state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {children}
      {isOffline && (
        <View style={styles.offlineOverlay}>
          <Text style={styles.offlineText}>
            You are offline. Please check your internet connection.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConnectivityWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it appears on top of everything
  },
  offlineText: {
    color: 'red',
    fontSize: hp(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    backgroundColor :"#fffF",
    paddingVertical : hp(5)
  },
});
