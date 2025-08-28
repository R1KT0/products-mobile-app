import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ['products', productId], // Usar misma nomenclatura que url de API --> 
        // /api/products/:id --> ['products', '1']
    
        queryFn: () => getProductById(productId),

        staleTime: 1000 * 60 * 60, // 60 minutos
    });


    //Mutation

    // Mantener id producto en caso de ser uno nuevo

    return {
        productQuery

    }
}