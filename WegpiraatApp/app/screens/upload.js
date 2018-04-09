import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class UploadScreen extends React.Component {

    static navigationOptions = {
      title: "Upload Wegpiraat"           
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