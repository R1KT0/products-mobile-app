import ProductImages from '@/presentation/products/components/ProductImages';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup';
import { ThemedTextInput } from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';


const ProductScreen = ()  =>{
    
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const primary = useThemeColor({}, 'primary');
    const { productQuery } = useProduct(`${id}`);
    
    
   // TODO: descomentar en casa jeje  
    // if (productQuery.isLoading) {
    //     return (
    //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //             <ActivityIndicator size='large' color={primary} />
    //         </View>
    //     )
    // }

    if (!productQuery.data) {
        console.log("Entramos aca che");
        
        return <Redirect href='/(products-app)/(home)' />
    }

    const product = productQuery.data!;

    useEffect(() => {
        navigation.setOptions({

            headerRight: () => <Ionicons name='camera-outline' size={24} />
    
    })


  },[])
  
    useEffect(() => {
    
        if (productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title,
            })
        }


    }, [productQuery.data])


    return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
        <ScrollView>
            <ThemedView>
                <ProductImages images={product.images} />
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



            <ThemedView style={{ marginHorizontal: 10}}>

            <ThemedButtonGroup
                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                    selectedOption={product.sizes}
                    onSelect={ (options) => console.log(options)}
                />

                                        
            <ThemedButtonGroup
                    options={['kid', 'men', 'women', 'unisex']}
                    selectedOption={[product.gender]}
                    onSelect={ (options) => console.log(options)}
                />

            </ThemedView>

            {/* Submit Button */}
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
                <ThemedButton
                  icon='save-outline'
                  onPress={() => console.log('Guardando')}
                >

                 Guardar   
                </ThemedButton>
            </View>

        </ScrollView >
    </KeyboardAvoidingView >
  )
}

export default ProductScreen;