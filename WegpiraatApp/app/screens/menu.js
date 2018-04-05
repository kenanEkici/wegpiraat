import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class MenuScreen extends React.Component {

    static navigationOptions = {
      title: "Wegpiraat Menu",
      headerLeft: (
        <Image 
            source={{uri:"http://www.clker.com/cliparts/S/G/R/n/X/M/car-icon-md.png"}} 
            style={{width:30, height:30, marginLeft:30}} />
      ),
    }
  
    render() {
  
      const { params } = this.props.navigation.state;
      const id = params ? params.id : null
  
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>MenuScreen</Text>
          <Text>Param: {JSON.stringify(id)}</Text>
          <Button title="Reload" onPress={()=> this.props.navigation.navigate('Menu')} />
        </View>
      )
    }
  }