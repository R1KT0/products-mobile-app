import { productsApi } from "@/core/api/productsApi";
import { type ProductResponse } from "../interfaces/product.interface";

export const getProducts = async (limit = 20, offset = 0) => {
    try {

        const { data } = await productsApi.get<ProductResponse>('/products', {
            params: {
                limit,
                offset,
            },
        });

        console.log({ data });

        return data.map((product) => ({
            ...product,
            images: product.images.map(image => `${productsApi.defaults.baseURL}/files/product/${image}`)
        }));

    } catch (error) {
        console.log(error);
        return null;
    }
}