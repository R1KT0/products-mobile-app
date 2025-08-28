import { Product } from '@/core/products/interfaces/product.interface'
import React, { useState } from 'react'
import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { ProductCard } from './ProductCard'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
    style?: StyleProp<ViewStyle>
    products: Product[]

    loadNextPage: () => void
}


const ProductList = ({ products, loadNextPage, style }: Props) => {

    const [isRefreshing, setRefreshing] = useState(false)
    const queryClient = useQueryClient();

    const onPullToRefresh = async() => {
        setRefreshing(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })

        setRefreshing(false)
}


    return (
        <FlatList
            style={style}
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8} // Carga más productos cuando el usuario está cerca del final de la lista
            showsVerticalScrollIndicator={false}

            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
            }
        />
    )
}

export default ProductList