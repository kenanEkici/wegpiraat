import React from 'react';
import { Text, Button, View, ScrollView, TextInput } from 'react-native';
import HeaderLogo from './../components/header';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
      headerTitle: <HeaderLogo/>    
    };
  
    render() {
      return (
        <ScrollView centerContent={true} contentContainerStyle={{ flexGrow:1, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginBottom:30, fontSize:30, fontWeight:"bold", marginTop:20}}>Login to Wegpiraat</Text>
          <TextInput
            style={{height: 40, width:200, fontWeight:"bold", textAlign:"center",  marginBottom:10}}  
            placeholder="Email"            
          />
          <TextInput
            style={{height: 40, width:200, textAlign:"center", marginBottom:30}}       
            placeholder="Password"
          />     
          <View style={{marginBottom:40, width:200}} >
            <Button title="Login" onPress={()=> this.props.navigation.navigate('Menu', { id: 100 }) } ></Button>
          </View>        
          <Text style={{marginBottom:20}}>New to Wegpiraat? Create an account.</Text>
  
          <View style={{marginBottom:20, width:150}}>
            <Button title="Register" onPress={()=> this.props.navigation.navigate('Menu', { id: 100 }) } ></Button>
          </View>
          <View style={{marginBottom:20, width:150}} >
            <Button title="Forgot password?" onPress={()=> this.props.navigation.navigate('Menu', { id: 100 }) } ></Button>
          </View>
        </ScrollView>
      )
    }
  }
  