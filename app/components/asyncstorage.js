export class StoreData {
  
  //constructor(name) {
    //this.name = name;
  //}
  
  async save (key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('StoreData save error: ', e);
    }
  };
  
  async read(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('StoreData read error: ', e);
    }
  }
}
