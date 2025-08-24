import { Product } from '@/core/products/interfaces/product.interface'
import React from 'react'
import { FlatList, StyleProp, ViewStyle } from 'react-native'
import { ProductCard } from './ProductCard'

interface Props {
    style?: StyleProp<ViewStyle>
    products: Product[]

    loadNextPage: () => void
}


const ProductList = ({ products, loadNextPage, style }: Props) => {
    return (
        <FlatList
            style={style}
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8} // Carga más productos cuando el usuario está cerca del final de la lista
        />
    )
}

export default ProductList