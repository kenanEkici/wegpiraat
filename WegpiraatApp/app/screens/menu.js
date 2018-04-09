import React from 'react';
import { View, Text, Button, Image, TouchableHighlight } from 'react-native';

export default class MenuScreen extends React.Component {
          
  render() {

    const { params } = this.props.navigation.state;
    const id = params ? params.id : null

    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>MenuScreen</Text>
        <Text>Param: {JSON.stringify(id)}</Text>
        <Button title="Reload" onPress={()=> this.props.navigation.navigate('Menu')} />
        <Button title="Log out" onPress={()=> this.props.navigation.navigate('Auth')} />
      </View>
    )
  }
}