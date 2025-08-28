import { Size } from '@/core/products/interfaces/product.interface';
import ProductImages from '@/presentation/products/components/ProductImages';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup';
import { ThemedTextInput } from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const ProductScreen = ()  =>{
    
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const primary = useThemeColor({}, 'primary');
    const { productQuery, productMutation } = useProduct(`${id}`);
    
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
            headerRight: () => <MenuIconButton 
               icon='camera-outline'
               onPress={()=> router.push('/camera')} 
            />
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

        <Formik
            initialValues={product}
            onSubmit={productMutation.mutate}
        >
            {
                ({values, handleChange, handleSubmit, setFieldValue}) => (
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
                        >
                        <ScrollView>
                            <ThemedView>
                                <ProductImages images={values.images} />
                            <ThemedTextInput 
                                placeholder="Titulo"
                                value={ values.title }
                                onChangeText={handleChange('title')}
                                style={{marginVertical: 5}}
                            />
                            
                            <ThemedTextInput
                                placeholder="Slug"
                                value={ values.slug }
                                onChangeText={handleChange('slug')}
                                style={{marginVertical: 5}}
                              />
                            
                            <ThemedTextInput 
                                placeholder="Descripcion"
                                multiline
                                numberOfLines={5}
                                value={ values.description }
                                onChangeText={handleChange('description')}
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
                                value={ values.price.toString() }
                                onChangeText={handleChange('price')}
                                style={{flex: 1}}
                                />

                            <ThemedTextInput 
                                placeholder="Inventario"
                                value={ values.stock.toString() }
                                onChangeText={handleChange('stock')}
                                style={{flex: 1}}
                                />


                            </ThemedView>



                            <ThemedView style={{ marginHorizontal: 10}}>

                            <ThemedButtonGroup
                                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                    selectedOption={values.sizes}
                                    onSelect={ (selectedSize) => {
                                        const newSizesValue = values.sizes.includes(selectedSize as Size) 
                                        ? values.sizes.filter(s => s !== selectedSize)
                                        : [...values.sizes, selectedSize]
                                        // : values.sizes.push(selectedSize as Size)

                                        setFieldValue('sizes', newSizesValue)
                                    }}
                                />

                                                        
                            <ThemedButtonGroup
                                    options={['kid', 'men', 'women', 'unisex']}
                                    selectedOption={[values.gender]}
                                    onSelect={ (selectedOption) => setFieldValue('gender', selectedOption)}
                                    />

                            </ThemedView>

                            {/* Submit Button */}
                            <View style={{marginVertical: 10, marginHorizontal: 10}}>
                                <ThemedButton
                                icon='save-outline'
                                onPress={() => handleSubmit()}
                                >

                                Guardar   
                                </ThemedButton>
                            </View>

                        </ScrollView >
                    </KeyboardAvoidingView >
                )
            }
    </Formik>
  )
}

export default ProductScreen;