import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

const FullScreenVideoScreen = ({ route }: any) => {
  const { videoUri } = route.params;
  const navigation = useNavigation<any>();

  const exitFullScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // Lock screen orientation to landscape when the video player is mounted
    Orientation.lockToLandscape();

    // Unlock orientation when exiting fullscreen
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <View style={styles.container}>
      <VideoPlayer
        disableVolume={true}
        disableBack={true}
        disableFullscreen={false}
        source={{
          uri: videoUri,
        }}
        repeat={true}
        rate={3.0}
        onEnterFullscreen={exitFullScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default FullScreenVideoScreen;
