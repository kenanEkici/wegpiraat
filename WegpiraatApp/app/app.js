import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import SplashScreen from './screens/splash';
import Menu from './components/tab';

const AuthStack = StackNavigator({ Login: LoginScreen, Register: RegisterScreen });
const MenuStack = StackNavigator({ Menu: Menu});
console.disableYellowBox = true;

export default SwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: MenuStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
