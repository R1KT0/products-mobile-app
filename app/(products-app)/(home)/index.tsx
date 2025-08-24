import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import ProductList from '@/presentation/products/components/ProductList';
import { useProducts } from '@/presentation/products/hooks/useProducts';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

const index = () => {


    const { productsQuery, loadNextPage } = useProducts();
    const primary = useThemeColor({}, 'primary');


    if (productsQuery.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <ActivityIndicator size='large' color={primary} />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
            <ProductList
                style={{
                    flex: 1,
                    width: '100%',
                }}
                products={productsQuery.data?.pages.flatMap(page => page ?? []) ?? []}
                loadNextPage={loadNextPage}
            />
        </View>
    )
}

export default index;