import { returnUserToken } from '@/core/auth/actions/auth-actions';
import { productsApi } from '@/core/auth/api/productsApi';
import { AuthResponse } from '@/core/auth/interface/user';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

const RegisterScreen = () => {
    const { height, width } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background');

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const validateRegister = () => {
        const { fullName, email, password } = form;
        if (fullName.length === 0 || email.length === 0 || password.length === 0) {
            Alert.alert('Error', 'Por favor ingresa todos los campos');
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

    const onRegister = async () => {
        if (validateRegister()) return;
        console.log('🚀 Enviando request a:', `${productsApi.defaults.baseURL}auth/register`);

        const { data } = await productsApi.post<AuthResponse>('auth/register', form);
        console.log('✅ Register successful:', { data });

        router.push('/auth/login');

        return returnUserToken(data);
    }


    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ScrollView
                style={{
                    width: '100%',
                    paddingTop: 40,
                    backgroundColor
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
                    <ThemedText type='title'> Crear cuenta </ThemedText>
                    <ThemedText style={{ color: 'grey', textAlign: 'center' }}> Por favor crea una cuenta para continuar </ThemedText>
                </View>

                {/* Formulario de login */}
                <View style={{
                    marginTop: 20,
                    width: '100%',
                    maxWidth: 350
                }}>
                    <ThemedTextInput
                        placeholder='Nombre'
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='person-outline'
                        value={form.fullName}
                        onChangeText={(text) => setForm({ ...form, fullName: text })}
                    />

                    <ThemedTextInput
                        placeholder='Correo electrónico'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        icon='mail-outline'
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                    />

                    <ThemedTextInput
                        placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        icon='lock-closed-outline'
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                    />
                </View>

                {/* Boton de login */}


                <ThemedButton
                    icon='person-add-outline'
                    onPress={onRegister}
                >
                    Crear cuenta
                </ThemedButton>

                {/* Boton de iniciar sesion */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <ThemedText style={{ marginRight: 5 }}>¿Ya tienes una cuenta?</ThemedText>
                    <ThemedLink
                        style={{ marginHorizontal: 5 }}
                        href='/auth/login'
                        icon='log-in-outline'
                    >
                        Iniciar sesión
                    </ThemedLink>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen