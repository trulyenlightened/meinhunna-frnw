import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Otp from '../screens/Otp';
import MobileNumber from '../screens/MobileNumber';
import ForgotPassword from '../screens/ForgotPassword';
import Splash from '../screens/Splash';


const transitionConfig = () => ({
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [layout.initWidth, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [
        index - 1,
        index - 0.99,
        index,
        index + 0.99,
        index + 1,
      ],
      outputRange: [0, 1, 1, 0.3, 0],
    });

    return { opacity, transform: [{ translateX }] };
  },
});
const AppLoginNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Login: { screen: Login },
    Register:   { screen: Register },

    Otp: { screen: Otp },
    MobileNumber: { screen: MobileNumber },
    ForgotPassword: { screen: ForgotPassword },
  },
  {
    transitionConfig,
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      header: null,
    }),
  },
);

export default AppLoginNavigator;
