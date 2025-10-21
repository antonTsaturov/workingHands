import AsyncStorage from '@react-native-async-storage/async-storage';

class StoreData {
  // Save data
  static async saveData(key, data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Data saved successfully for key: ${key}`);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Get data 
  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  // Remove data
  static async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed successfully for key: ${key}`);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  // Get all keys
  static async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  // Clear all data 
  static async clearAll() {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}

export default StoreData;
