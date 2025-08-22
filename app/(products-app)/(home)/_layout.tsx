import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';




const CheckAuthLayout = () => {

    const { status, checkAuthStatus } = useAuthStore();

    useEffect(() => {
        // Chequea si el usuario está autenticado
        // checkAuthStatus();
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
        // Guardar la ruta del usuario para redirigirlo luego de autenticarse
        return <Redirect href='/(products-app)/auth/login' />
    }

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Productos',
                    headerShown: false
                }}
            />

        </Stack>
    )

}

export default CheckAuthLayout