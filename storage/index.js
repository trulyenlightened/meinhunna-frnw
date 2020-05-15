import { AsyncStorage, Platform } from 'react-native';

const nativeStorage = {
  get(key) {
    return AsyncStorage.getItem(key)
      .catch((err) => {
        throw new Error(`[react-native-storage-wrapper] - ${err}`);
      });
  },
  set(key, value) {
    return AsyncStorage.setItem(key, value)
      .catch((err) => {
        throw new Error(`[react-native-storage-wrapper] - ${err}`);
      });
  },
  del(key) {
    return AsyncStorage.removeItem(key)
      .catch((err) => {
        throw new Error(`[react-native-storage-wrapper] - ${err}`);
      });
  },
  clear() {
    return AsyncStorage.clear()
      .catch((err) => {
        throw new Error(`[react-native-storage-wrapper] - ${err}`);
      });
  },
};

const webStorage = {
  get(key) {
    return new Promise((resolve, reject) => {
      if (window.localStorage) {
        try {
          resolve(localStorage.getItem(key));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
    })
      .catch((err) => {
        throw new Error(`[web-storage-wrapper] - ${err}`);
      });
  },
  set(key, value) {
    return new Promise((resolve, reject) => {
      if (window.localStorage) {
        try {
          resolve(localStorage.setItem(key, value));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
    })
      .catch((err) => {
        throw new Error(`[web-storage-wrapper] - ${err}`);
      });
  },
  del(key) {
    return new Promise((resolve, reject) => {
      if (window.localStorage) {
        try {
          resolve(localStorage.removeItem(key));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
    })
      .catch((err) => {
        throw new Error(`[web-storage-wrapper] - ${err}`);
      });
  },
  clear() {
    return Promise((resolve, reject) => {
      if (window.localStorage) {
        try {
          resolve(localStorage.clear());
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
    })
      .catch((err) => {
        throw new Error(`[web-storage-wrapper] - ${err}`);
      });
  },
};

const PlatformStorage = Platform.OS === 'web' ? webStorage : nativeStorage;

export default PlatformStorage;
