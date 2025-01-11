import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { warning } from '../../../utils/images';

const LiveStatus = () => {
  return (
    <View style={styles.container}>
      <Image source={warning} style={styles.warningImage} />
      <Text style={styles.liveText}>Live Status Not Avilable</Text>
      <Text style={styles.loadingDataText}>There has been problem loading {"\n"} this data.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reload</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LiveStatus;
