import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/login';
import MenuScreen from './screens/menu';

const RootStack = StackNavigator(
  {
    Home: {
      screen: LoginScreen
    },
    Menu: {
      screen: MenuScreen
    }
  },
  {
    initialRouteName: 'Home', 
    navigationOptions: {
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}