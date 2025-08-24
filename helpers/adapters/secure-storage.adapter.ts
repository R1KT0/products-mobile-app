import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';


export class SecureStorageAdapter {
    static async saveItem(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error('Error saving item', error);
            Alert.alert('Error', 'Error saving item');
        }
    }


    static async getItem(key: string) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error('Error getting item', error);
            Alert.alert('Error', 'Error getting item');
        }
    }


    static async deleteItem(key: string) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error deleting item', error);
            Alert.alert('Error', 'Error deleting item');
        }
    }





}