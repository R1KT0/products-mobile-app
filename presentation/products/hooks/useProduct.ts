import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ['products', productId], // Usar misma nomenclatura que url de API --> 
        // /api/products/:id --> ['products', '1']
    
        queryFn: () => getProductById(productId),

        staleTime: 1000 * 60 * 60, // 60 minutos
    });


    //Mutation
    const productMutation = useMutation({
        mutationFn: updateCreateProduct,
        // mutationFn: async (data: Product) => updateCreateProduct(data),

        onSuccess(data: Product) {
            // TODO: Invalidar products queries

            Alert.alert('Producto guardado', `${data.title} se guardo correctamente`)
        }
    })

    // Mantener id producto en caso de ser uno nuevo

    return {
        productQuery,
        productMutation

    }
}