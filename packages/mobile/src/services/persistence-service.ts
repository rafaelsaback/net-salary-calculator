import { AsyncStorage } from 'react-native';

export class PersistenceService {
  public static storeData = (key: string, value: any) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  };

  public static getData = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  };
}
