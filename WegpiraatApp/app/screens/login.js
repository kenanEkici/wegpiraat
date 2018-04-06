import React from 'react';
import { Text, Button, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import HeaderLogo from './../components/header';
import Modal from 'react-native-modal';
import modalstyles from '../modals/modalstyles';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
      headerTitle: <HeaderLogo/>    
    };

    state = { showPasswordReset:false }
  
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
            <Button title="Forgot password?" onPress={()=>this.setState({showPasswordReset:true})}></Button>
          </View>

          <Modal
            isVisible={this.state.showPasswordReset}
            backdropOpacity={0.5}
            onBackdropPress={() => this.setState({showPasswordReset:false})}
            animationIn="zoomInUp"
            animationOut="fadeOutUp"
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300} >
                <View style={modalstyles.modalContent}>
                    <Text>Send a reset token to my email</Text>
                    <TextInput style={{width:200}} placeholder="email address" />
                    <TouchableOpacity onPress={() => this.setState({showPasswordReset:false})}>
                        <View style={modalstyles.button}>
                            <Text>Go back</Text>
                        </View>
                    </TouchableOpacity>
                </View>            
            </Modal>
        </ScrollView>
      )
    }
  }
  