import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoaderScreen = ({ visible }: any) => {
    return (
        <View>{visible && <ActivityIndicator size="large" color="orange" />}</View>
    )
}

export default LoaderScreen