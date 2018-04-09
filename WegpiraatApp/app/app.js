import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import LoginScreen from './screens/login';
import MenuScreen from './screens/menu';
import UploadScreen from './screens/upload';
import RegisterScreen from './screens/register';
import SplashScreen from './screens/splash';
import Menu from './components/tab';

const AuthStack = StackNavigator({ Login: LoginScreen, Register: RegisterScreen });

export default SwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: Menu,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
