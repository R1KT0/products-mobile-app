import { productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
    try {

        const { data } = await productsApi.get<Product>(`/products/${id}`);

        console.log({ data });

        return {
            ...data,
            images: data.images.map(image => `${productsApi.defaults.baseURL}/files/product/${image}`)
        };

    } catch (error) {
        throw new Error('Error al obtener el producto');
    }
}