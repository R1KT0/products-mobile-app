import { productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product.interface";


const emptyProduct: Product = {
    id: '',
    title: "Producto Nuevo",
    description: "Sin Descripcion",
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    tags: []
}

export const getProductById = async (id: string): Promise<Product> => {

    if (id === 'new' ) return emptyProduct;


    try {

        const { data } = await productsApi.get<Product>(`/products/${id}`);

        console.log({ data });

        return {
            ...data,
            images: data.images.map(image => `${productsApi.defaults.baseURL}files/product/${image}`)
        };

    } catch (error) {
        throw new Error('Error al obtener el producto');
    }
}