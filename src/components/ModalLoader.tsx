import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const ModalLoader = ({ visible }: { visible: boolean }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    </Modal>
  );
};

export default ModalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fixed syntax for the color
  },
});
