import { SafeAreaView, View } from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewFullImage = ({ route }: any) => {
    const renderIndicator = (currentIndex: any, allSize: any) => {
        return <View></View>;
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageViewer
                imageUrls={[{ url: route?.params?.url }]}
                renderIndicator={renderIndicator}
            />
        </SafeAreaView>
    );
};

export default ViewFullImage;
