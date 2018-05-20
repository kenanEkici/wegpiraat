import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import HeaderLogo from '../components/header';

import FeedScreen from '../screens/feed';
import UploadScreen from '../screens/upload';
import SearchScreen from '../screens/search';
import ProfileScreen from '../screens/profile';

export default Menu = TabNavigator(
    {
        Feed: FeedScreen,
        Upload: UploadScreen,
        Search: SearchScreen,
        Profile: ProfileScreen
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
            headerTitle: ({}) => {
                const { routeName } = navigation.state;
                let title;
                if (routeName === 'Feed') {
                    title = "Wegpiraten"
                } else if (routeName === 'Upload') {
                    title = "Upload a Wegpiraat"
                } else if (routeName === 'Search') {
                    title = "Search"
                } else if (routeName === 'Profile') {
                    title = "My Wegpiraat"
                }
                return <HeaderLogo name={title}/>;
            }
        }),
        tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    },
);