import { View, Text, Image } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { logo } from '../../../utils/images';

const IpLogin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.imgView2}>
          <Image source={logo} style={styles.logoImg} />
        </View>
      </View>
      <Text style={styles.welcomeTxt}>Welcome to the SAI</Text>
      <Text style={styles.txt}>You are unauthorized</Text>
    </SafeAreaView>
  );

}

export default IpLogin