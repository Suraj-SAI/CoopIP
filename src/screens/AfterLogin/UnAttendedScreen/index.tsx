import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { sendNotification } from '../../../redux/actions/loginAction'

const UnAttended = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sendNotification} style={styles.button}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UnAttended

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "red"
  }
})