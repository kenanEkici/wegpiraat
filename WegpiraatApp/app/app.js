import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/login';
import MenuScreen from './screens/menu';
import UploadScreen from './screens/upload';
import RegisterScreen from './screens/register';

const MainStack = StackNavigator(
  {
    Home: {
      screen: LoginScreen
    },
    Menu: {
      screen: MenuScreen
    },
    Upload: {
      screen: UploadScreen
    }, 
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: 'Home', 
    navigationOptions: 
    {
    }
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack
    },
  },
  {
    mode: 'card',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}