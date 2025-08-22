import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { View } from 'react-native';

const index = () => {

    const primary = useThemeColor
        ({ light: 'white', dark: 'white' }, 'primary')

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText type='title' style={{ color: primary }}>Home</ThemedText>
            <ThemedText type='title' style={{ color: primary }}>Home</ThemedText>
        </View>
    )
}

export default index;