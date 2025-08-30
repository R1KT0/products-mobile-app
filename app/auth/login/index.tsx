import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

import { testApiConnection, testLoginEndpoint } from '@/core/api/apiTest';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { ThemedTextInput } from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { router } from 'expo-router';

const LoginScreen = () => {
    const { login } = useAuthStore();
    const { height, width } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background');

    const [isPosting, setIsPosting] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const validateLogin = () => {
        const { email, password } = form;
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
            return true;
        }
        if (!email.includes('@')) {
            Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
            return true;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return true;
        }
        if (password.length > 15) {
            Alert.alert('Error', 'La contraseña debe tener menos de 15 caracteres');
            return false;
        }
        return false;
    }

    const onLogin = async () => {
        if (validateLogin()) return;

        setIsPosting(true);

        const wasSuccess = await login(form.email, form.password);

        setIsPosting(false);

        if (!wasSuccess) {
            Alert.alert('Error', 'Correo o contraseña incorrectos');
            return;
        }

        router.push('/(products-app)/(home)');

    }

    const onTestApi = async () => {
        setIsTesting(true);

        try {
            console.log('🧪 Iniciando pruebas de API...');

            // Test 1: Conectividad general
            const connectionTest = await testApiConnection();
            console.log('📡 Test de conectividad:', connectionTest);

            // Test 2: Endpoint específico
            const loginTest = await testLoginEndpoint();
            console.log('🔐 Test de endpoint login:', loginTest);

            // Mostrar resultados
            let message = 'Pruebas completadas:\n\n';
            message += `Conectividad: ${connectionTest.success ? '✅ OK' : '❌ Falló'}\n`;
            message += `Endpoint Login: ${loginTest.success ? '✅ OK' : '❌ Falló'}\n\n`;

            if (!connectionTest.success) {
                message += '🔍 Problemas detectados:\n';
                message += '• Verifica que tu servidor esté corriendo\n';
                message += '• Si usas dispositivo físico, cambia localhost por tu IP local\n';
                message += '• Verifica que el puerto 3000 esté abierto';
            }

            Alert.alert('Resultado de Pruebas', message);

        } catch (error) {
            console.error('❌ Error en pruebas:', error);
            Alert.alert('Error', 'Error al ejecutar las pruebas');
        } finally {
            setIsTesting(false);
        }
    }

    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ScrollView
                style={{
                    width: '100%',
                    paddingTop: 40,
                    backgroundColor: backgroundColor
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        paddingTop: height * 0.15,
                        paddingBottom: height * 0.1,
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <ThemedText type='title'> Iniciar sesión </ThemedText>
                    <ThemedText style={{ color: 'grey', textAlign: 'center' }}> Por favor ingresa tu correo y contraseña </ThemedText>
                </View>

                {/* Formulario de login */}
                <View style={{
                    marginTop: 20,
                    width: '100%',
                    maxWidth: 350
                }}>
                    <ThemedTextInput
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='mail-outline'
                        value={form.email}
                        onChangeText={(value: string) => setForm({ ...form, email: value })}
                    />

                    <ThemedTextInput
                        placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        icon='lock-closed-outline'
                        value={form.password}
                        onChangeText={(value: string) => setForm({ ...form, password: value })}
                    />
                </View>

                {/* Boton de login */}
                <View style={{
                    marginTop: 30,
                    width: '100%',
                    maxWidth: 350
                }}>
                    <ThemedButton
                        icon='log-in-outline'
                        onPress={onLogin}
                        disabled={isPosting}
                    >
                        {isPosting ? 'Ingresando...' : 'Ingresar'}
                    </ThemedButton>
                </View>

                {/* Boton de prueba de API */}
                <View style={{
                    marginTop: 20,
                    width: '100%',
                    maxWidth: 350
                }}>
                    <ThemedButton
                        icon='bug-outline'
                        onPress={onTestApi}
                        disabled={isTesting}
                        style={{ backgroundColor: '#666' }}
                    >
                        {isTesting ? 'Probando...' : 'Probar API'}
                    </ThemedButton>
                </View>

                {/* Boton de registro */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <ThemedText style={{ marginRight: 5 }}>¿No tienes una cuenta?</ThemedText>
                    <ThemedLink
                        style={{ marginHorizontal: 5 }}
                        href='/auth/register'
                        icon='person-add-outline'
                    >
                        Crear cuenta
                    </ThemedLink>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
        // </SafeAreaView >
    )
}

export default LoginScreen