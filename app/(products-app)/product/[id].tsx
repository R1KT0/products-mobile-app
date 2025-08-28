import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { ThemedTextInput } from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';


const ProductScreen = ()  =>{
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({

            headerRight: () => <Ionicons name='camera-outline' size={24} />
    
    })


  },[])
  
  
    return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
        <ScrollView>
            <ThemedView>
            
            <ThemedTextInput placeholder="Titulo" style={{marginVertical: 5}}/>
            
            <ThemedTextInput placeholder="Slug" style={{marginVertical: 5}}/>
            
            <ThemedTextInput 
                placeholder="Descripcion"
                multiline
                numberOfLines={5}
                style={{marginVertical: 5}}
            />

            <ThemedView
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    gap: 10, 
                }}
            />


            <ThemedTextInput 
                placeholder="Precio"
                style={{flex: 1}}
            />

            <ThemedTextInput 
                placeholder="Inventario"
                style={{flex: 1}}
            />


            </ThemedView>
        </ScrollView >
    </KeyboardAvoidingView >
  )
}

export default ProductScreen;