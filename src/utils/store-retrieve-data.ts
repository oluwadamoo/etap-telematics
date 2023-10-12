import AsyncStorage from "@react-native-async-storage/async-storage"

interface StoreDataProps {
    key: string;
    value: string;
}
export const storeData = async ({ key, value }: StoreDataProps) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {

    }
}

interface GetDataProps {
    key: string;
}
export const getData = async ({ key }: GetDataProps) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {

    }
}


export const clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {

    }
}