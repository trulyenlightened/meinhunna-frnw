import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import NavigationService from '../navigation/NavigationService';


const closeDrawer = () => NavigationService.navigate('DrawerClose');


function SideMenu(props) {
  const {
    navigation,
    notifications,
    user,
    // eslint-disable-next-line
    setInitialState
  } = props;
  // NOTE: stackIndex must correspond to index on MainDrawer
  const defaultItems = [
    {
      name: 'Profile',
      newItems: 0,
      stack: 'ProfileStack',
      route: 'Profile',
      stackIndex: 0,
    },
    {
      name: 'OrderForm',
      newItems: 0,
      stack: 'OrdersStack',
      route: 'Orders',
      stackIndex: 1,
    },
  ];

  const menuItems = [
    ...defaultItems,
  ];

  // const logo = require('../assets/images/fyr-logo.png');

  let activeRoute = null;

  const menuElements = menuItems.map((i, index) => {
    let divider = <View style={styles.divider} />;
    if (index === menuItems.length - 1) {
      divider = null;
    }


    const isActiveRoute = navigation.state.index === i.stackIndex;
    if (isActiveRoute) {
      activeRoute = i.stackIndex;
    }
    return (
      <View style={styles.itemContainer} key={i.route}>
        <TouchableOpacity
          style={[styles.menuItem, isActiveRoute && styles.menuItemActive]}
          onPress={() => {
            if (isActiveRoute) {
              closeDrawer();
            }
              NavigationService.navigateMenu(i.stack);
            }
          }
        >
          <Text style={[styles.text, isActiveRoute && styles.activeText]}>
            {i.name}
          </Text>
        </TouchableOpacity>
        {divider}
      </View>
    );
  });

  return (
    <View style={styles.menuContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={closeDrawer}
        >
        </TouchableOpacity>
      </View>
      {menuElements}
      <View style={styles.footer}>
        <StyledButton
          text="Logout"
          textStyle={styles.textButton}
          style={styles.button}
          onPress={props.logout}
        />
      </View>
    </View>
  );
}



SideMenu.propTypes = {

  user: PropTypes.object.isRequired,

};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    zIndex: 100,
  },
  itemContainer: {
    top: 10,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemActive: {
    borderRightWidth: 7,

  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.33,
  },

  logo: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 0.15 * Dimensions.get('screen').height,
    width: 0.35 * Dimensions.get('screen').width,
    top: 25,
    left: Dimensions.get('screen').width > 500 ? -22 : 10,
    ...Platform.select({
      web: {
        width: '65%',
        height: '80%',
        left: Dimensions.get('screen').width > 500 ? '-5%' : '5%',
        top: '5%',
      },
    }),
  },
  text: {
    fontFamily: 'circular-black',
    fontSize: 22,
    marginTop: 8,
    marginLeft: '12%',
    ...Platform.select({
      web: {
        fontSize: 24,
      },
    }),
  },
  activeText: {

  },
  divider: {
    marginTop: 8,
    marginLeft: '12%',
    marginRight: '12%',
    borderBottomColor: 'rgba(34,33,46,0.15)',
    borderBottomWidth: 0.5,
    ...Platform.select({
      web: { borderBottomWidth: 0 },
    }),
  },
  infoCounter: {
    backgroundColor: '#ED304C',
    width: 16,
    height: 16,
    marginRight: '12%',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    color: 'white',
    fontFamily: 'circular-bold',
    fontSize: 10,
  },
  closeButtonContainer: {
    zIndex: 101,
    position: 'absolute',
    right: 20,
    top: 35,
  },
  closeButton: {
    width: 42,
    height: 42,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  button: {
    width: 120,
    marginTop: 18,
    height: 35,
    alignSelf: 'flex-end',
    ...Platform.select({
      web: {
        width: 140,
      },
    }),
  },
  textButton: {

    ...Platform.select({
      web: {
        fontSize: 20,
      },
    }),
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);
