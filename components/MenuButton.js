import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';


export default function MenuButton(props) {
  const { onPress, style } = props;

  return (
    <TouchableOpacity style={[styles.menu, style]} onPress={onPress}>
      <Image style={styles.menuImage}  />
    </TouchableOpacity>
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
    top: 35,
    right: 20,
    backgroundColor:'black'
  },
  menuImage: {
    zIndex: 11,
    width: 40,
    height: 40,
  },
});
