import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import FeedScreen from '../screens/feed';
import MenuScreen from '../screens/menu';

export default Menu = TabNavigator(
    {
        Feed: MenuScreen,
        Upload: FeedScreen,
        Search: FeedScreen,
        Profile: FeedScreen
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Feed') {
                    iconName = `ios-car${focused ? '' : '-outline'}`;
                } else if (routeName === 'Upload') {
                    iconName = `ios-add${focused ? '' : '-outline'}`;
                } else if (routeName === 'Search') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#81C784',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);