import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Dimensions, Platform } from 'react-native';
import SideMenu from '../components/SideMenu';
import Profile from '../screens/Profile';
import OrderForm from '../screens/OrderForm';


const { width, height } = Dimensions.get('screen');

const transitionConfig = () => ({
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [layout.initWidth, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
      outputRange: [0, 1, 1, 0.3, 0],
    });

    return { opacity, transform: [{ translateX }] };
  },
});

const ProfileStack = StackNavigator(
  {
    Profile: { screen: Profile },
  },

  {
    initialRouteName: 'Profile',
    transitionConfig,
  },
);

const OrdersStack = StackNavigator(
  {
  OrderForm: { screen: OrderForm },

  },

  {
    initialRouteName: 'OrderForm',
    transitionConfig,

  },
);


const MainDrawer = DrawerNavigator(
  {
    OrdersStack:{screen:OrdersStack},
    ProfileStack: { screen: ProfileStack },

  },
  {
    initialRouteName: 'OrdersStack',
    drawerPosition: 'right',
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
    transitionConfig,
    drawerWidth:
      Platform.OS === 'web'
        ? Math.min(height, width) * 0.55
        : Math.min(height, width) * 0.55, // calculates X% of the smaller side of the screen.
    contentComponent: props => <SideMenu {...props} />,
  },
);

export default MainDrawer;
