import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import AuthService from '../service/authservice';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
        
      // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        var result = await new AuthService().authorised();
        this.props.navigation.navigate(result ? 'App' : 'Auth');
    };
    
      // Render any loading content that you like here
    render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
            <Text>Wegpiraat is loading</Text>
          </View>
        );
    }
}