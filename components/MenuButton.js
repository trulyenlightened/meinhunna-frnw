import React from 'react';
import { TouchableOpacity, StyleSheet, Image,View } from 'react-native';
import PropTypes from 'prop-types';
import {MENUICON} from "../assets";


export default function MenuButton(props) {
  const { onPress, style } = props;

  return (
    <View style={{width:'100%',height:75,  borderWidth:0.2,
      padding: 20,
      borderColor:"grey",
      shadowColor: "#000000",
      shadowOffset: { width: 1, height: 3 },
      shadowRadius: 5}}>
    <TouchableOpacity style={[styles.menu, style]} onPress={onPress}>
      <Image style={styles.menuImage} resizeMode='center' source={MENUICON} />
    </TouchableOpacity>
    </View>
  );
}

MenuButton.defaultProps = {
  style: {},
};

MenuButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 10,
    top: 20,
    right: 0,

  },
  menuImage: {
    zIndex: 11,
    width: 30,
    height: 30,
  },
});
