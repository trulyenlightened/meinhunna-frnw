import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacityBase,
  Image,
  Modal
} from 'react-native';
import HelpModal from "./HelpModal";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout,onHelpLineMenu } from '../actions/auth';
import NavigationService from '../navigation/NavigationService';
import {SIDEMENUBACK,MENUICON} from "../assets";


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
      name: 'ऑर्डर फारम',
      newItems: 0,
      stack: 'OrdersStack',
      route: 'Orders',
      stackIndex: 0,
    },
    {
      name: 'प्रोफ़ाइल',
      newItems: 1,
      stack: 'Profile',
      route: 'Profile',
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
      <Image source={SIDEMENUBACK} style={{position:'absolute',zIndex:-2,height:'100%'}} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={closeDrawer}
        >
         <Image source={MENUICON} style={{height:28,alignSelf:'flex-start',tintColor:'#fff'}} resizeMode='center' /> 
        </TouchableOpacity>
        <Text style={styles.bigText}>माजाहरि रंगवाला</Text>
      </View>

      {menuElements}
      <TouchableOpacity style={{marginTop:10,borderWidth:0,marginLeft:8}} onPress={()=>{
        props.logout()
        }}>
          <Text style= {{padding:10,color:'white',fontSize:18,fontWeight:"bold",borderRadius:20,borderColor:'white' }}>लॉग आउट</Text>
        </TouchableOpacity>
      
      <View style={styles.footer}>
      
      <TouchableOpacity onPress={()=>{
        props.onHelpLineMenu(true);
        
        }}
        style={{marginBottom:15,color:'#fff',alignSelf:'flex-start'}}>
      <Text style={{color:'#fff',fontSize:18,alignSelf:'center'}}>हेल्पलाइन</Text>
      </TouchableOpacity>  
      </View>
      <HelpModal />
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
        backgroundColor: '#ffa500',
  },

  bigText: {
    marginTop:29,
    marginLeft:20,
    fontSize:20,
    color:"#572179",
    alignSelf:'center'
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
    alignSelf:'flex-start'
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

    fontSize: 22,
    marginTop: 8,
    marginLeft: '12%',
    color:'white',
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
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
  },
  closeButton: {
    width: 42,
    height: 42,
  },
  footer: {
    left:0,
    position: 'absolute',
    bottom: 20,
    right: 30,
    alignItems:'flex-start',
    flexDirection: 'column',
    padding:10,

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
  bindActionCreators({ logout,onHelpLineMenu }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
