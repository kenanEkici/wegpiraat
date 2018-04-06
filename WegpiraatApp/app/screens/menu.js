import React from 'react';
import { View, Text, Button, Image, TouchableHighlight } from 'react-native';

export default class MenuScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
      title: "Wegpiraat Menu",
      headerLeft: (
        <Image 
            source={{uri:"http://www.clker.com/cliparts/S/G/R/n/X/M/car-icon-md.png"}} 
            style={{width:30, height:30, marginLeft:30}} />
      ),
      headerRight: (
        <TouchableHighlight underlayColor="white" style={{flexDirection:"column", flex:1}} onPress={() => navigation.navigate('Upload')} >         
          <Image 
                source={{uri:"https://png.icons8.com/windows/1600/add.png"}}
                style={{width:40, height:40, marginRight:15}} />                        
        </TouchableHighlight>
      )
    });
  
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