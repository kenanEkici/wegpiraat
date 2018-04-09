import React from 'react';
import { Button } from 'react-native';

export default class ProfileScreen extends React.Component {
    
    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null
        
        return ( 
            <Button title="Log out" onPress={()=> this.props.navigation.navigate('Auth')} />
        )
    }
}