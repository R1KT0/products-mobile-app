import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';




const CheckAuthLayout = () => {

    const { status, checkAuthStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, 'background');
    const primary = useThemeColor({}, 'primary');

    useEffect(() => {
        // Chequea si el usuario está autenticado
        checkAuthStatus();

    }, []);



    if (status === 'checking') {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5
                }}
            >
                <ActivityIndicator />
            </View>
        )
    }

    if (status === 'unauthenticated') {
        return <Redirect href='/auth/login' />
    }

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor,
                },
                contentStyle: {
                    backgroundColor,
                },
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    title: 'Productos',
                    headerLeft: () => <LogoutIconButton />
                    // headerShown: false
                }}
            />

        </Stack>
    )

}

export default CheckAuthLayout