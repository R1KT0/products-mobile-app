import { User } from "@/core/auth/interface/user"

export type ProductResponse = Product[]

export interface Product {
    id: string
    title: string
    price: number
    description: string
    slug: string
    stock: number
    sizes: Size[]
    gender: Gender
    tags: string[]
    images: string[]
    user: User
}


export enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
    XXXL = 'XXXL',
}

export enum Gender {
    Kid = 'kid',
    Men = 'men',
    Women = 'women',
}