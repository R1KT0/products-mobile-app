import axios from "axios";
import { Platform } from "react-native";

//TODO: conectar mediante env vars, Android e IOS

const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';

export const API_URL =
    (STAGE === 'prod')
        ? process.env.EXPO_PUBLIC_API_URL_PROD
        : (Platform.OS === 'ios')
            ? process.env.EXPO_PUBLIC_API_URL_IOS
            : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log(API_URL, STAGE);


const productsApi = axios.create({
    baseURL: API_URL,
});


//TODO: Interceptors



export { productsApi };

