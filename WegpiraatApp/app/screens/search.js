import React from 'react';
import { } from 'react-native';

export default class SearchScreen extends React.Component {
    
    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null
        
        return ( 
            <Button title="Log out" onPress={()=> this.props.navigation.navigate('Auth')} />
        )
    }
}