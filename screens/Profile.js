import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../components/MenuButton';
import NavigationService from '../navigation/NavigationService';


const openDrawer = () => NavigationService.navigate('DrawerOpen');

export default function Profile() {
  return (
    <View style={styles.container}>
      <MenuButton style={styles.menubutton} onPress={openDrawer} />
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menubutton:{
    top:5,
    left:5
  }
});
