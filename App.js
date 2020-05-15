import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import { AppLoading } from 'expo';
import { StackNavigator } from '@react-navigation/native';
import RootNavigator from './navigation';

import store from './store';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Ignore warning on Android
    // More here https://github.com/firebase/firebase-js-sdk/issues/97
    console.ignoredYellowBox = ['Setting a timer'];
    console.disableYellowBox = true;
  }
  state = {
    isLoadingComplete: false,
  };


  render() {

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
          <RootNavigator {...this.props} />

        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
