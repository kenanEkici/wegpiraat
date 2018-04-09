import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Text } from 'react-native';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
        
      // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    
      // Render any loading content that you like here
    render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
            <Text>Loading</Text>
          </View>
        );
    }
}