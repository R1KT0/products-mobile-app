import { FlatList, Image } from "react-native";


interface Props {
    images: string[];
}

const ProductImages = ({ images }: Props) => {
    
    if (images.length === 0) {
        return <Image source={require('../../../assets/images/no-product-image.png')} style={{ width: '100%', height: 200 }} />
    }
    
    return (
       <FlatList
            data={images}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => 
                <Image 
                    source={{ uri: item }} 
                    style={{ 
                        width: 300,
                        height: 300,
                        borderRadius: 20,
                        marginHorizontal: 10,
                    }} 
                />
            }
       />
      
    )
}

export default ProductImages