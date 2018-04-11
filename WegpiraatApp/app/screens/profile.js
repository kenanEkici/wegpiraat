import React from 'react';
import { Button } from 'react-native';
import AuthService from '../service/authservice';

export default class ProfileScreen extends React.Component {
    
    async logout() {
        let service = new AuthService();
        await service.logout();
        this.props.navigation.navigate('Auth')
    }

    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null
        
        return ( 
            <Button title="Log out" onPress={()=> this.logout()} />
        )
    }
}