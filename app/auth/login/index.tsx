import { ThemedText } from '@/presentation/theme/components/ThemedText';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, useWindowDimensions, View } from 'react-native';

const LoginScreen = () => {
    const { height } = useWindowDimensions();


    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{
                    paddingTop: 40
                }}
            >
                <View
                    style={{
                        padding: height * 0.35,
                    }}
                >

                    <ThemedText type='title'> Iniciar sesión </ThemedText>
                    <ThemedText style={{ color: 'grey' }}> Por favor ingresa tu correo y contraseña </ThemedText>

                </View>




                {/* Formulario de login */}
                <View style={{ marginTop: 20 }}>

                    <TextInput
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <TextInput
                        placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                    />



                </View>



            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen