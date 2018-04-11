import React from 'react';
import { View, Text, Button, Image, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native';
import WegpiraatService from '../service/wegpiraatservice';

export default class FeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false
    }
  }

  async componentDidMount(){
      await this.setState({loading:true});
      let service = new WegpiraatService();
      let data = await service.getAllWegpiraten();
      await this.setState({data:data, loading:false});
  }

  render() {

    if(this.state.loading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => 
            <Text>{item.title}</Text>
          }
        />
      </View>
    )
  }
}