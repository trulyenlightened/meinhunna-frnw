import React from 'react';
import { TouchableOpacity, StyleSheet, Image,Text } from 'react-native';
import PropTypes from 'prop-types';
import {BUTTONIMAGE} from "../assets";


export default function MyButton(props) {
  const { onPress, style,myButtonText,disabled } = props;

  return (
    
    <TouchableOpacity style={[styles.menu, style]} disabled={disabled} onPress={onPress}>
      <Image style={styles.buttonImage} resizeMode='center' source={BUTTONIMAGE} />
        <Text style={styles.buttonText}>{myButtonText}</Text>
    </TouchableOpacity>
  );
}

MyButton.defaultProps = {
  style: {},
  myButtonText:''
};

MyButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  myButtonText:PropTypes.string.isRequired,
  disabled:PropTypes.bool
};

const styles = StyleSheet.create({
  menu: {
    height: 44,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,

  },
  buttonImage: {
    position:'absolute',
    zIndex: -1,
    width: '100%',
    height: 44,
  },
  buttonText: {
      color:'#fff',
      fontSize:18
  }
});
