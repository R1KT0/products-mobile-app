import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";


export const useProduct = (productId: string) => {
    
    
    const queryClient = useQueryClient();
    const productIdRef = useRef(productId); // new / UUID


    const productQuery = useQuery({
        queryKey: ['products', productId], // Usar misma nomenclatura que url de API --> 
        // /api/products/:id --> ['products', '1']
    
        queryFn: () => getProductById(productId),

        staleTime: 1000 * 60 * 60, // 60 minutos
    });


    //Mutation
    const productMutation = useMutation({
        mutationFn: async (data: Product) => updateCreateProduct({
            ...data,
            id: productIdRef.current
        }),
        // mutationFn: async (data: Product) => updateCreateProduct(data),

        onSuccess(data: Product) {
            // TODO: ver curso de tanStackQuery para ver como manejar bien el cache
            //? Invalidamos products queries

            productIdRef.current = data.id;

            queryClient.invalidateQueries({
                //Aca pregunta que data es obsoleta para recargarla
                queryKey: ['products', 'infinite'],
            });

            queryClient.invalidateQueries({
                queryKey: ['products', data.id],
            });


            Alert.alert('Producto guardado', `${data.title} se guardo correctamente`)
        }
    })

    // Mantener id producto en caso de ser uno nuevo

    return {
        productQuery,
        productMutation

    }
}