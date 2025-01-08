import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data into local storage.
 * @param key - The key for the data to be stored.
 * @param value - The value to be stored.
 */
export const saveData = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error saving data with key "${key}":`, error);
    return false;
  }
};

/**
 * Get data from local storage.
 * @param key - The key for the data to be retrieved.
 */
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error(`Error retrieving data with key "${key}":`, error);
    return null;
  }
};

/**
 * Remove data from local storage.
 * @param key - The key for the data to be removed.
 */
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data with key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all data from local storage.
 */
export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing local storage:', error);
    return false;
  }
};
