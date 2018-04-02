import React from 'react';
import { Alert, StyleSheet,FlatList, ActivityIndicator, ScrollView, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  constructor(){
    super()
    this.state= {text:""}
  }

  componentDidMount(){
    return fetch('https://swapi.co/api/people/?format=json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <ScrollView> 
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.name}, {item.height}</Text>}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
