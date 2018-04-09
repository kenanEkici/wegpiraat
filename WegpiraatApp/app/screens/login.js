import React from 'react';
import { Text, Button, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import HeaderLogo from './../components/header';
import Modal from 'react-native-modal';
import s from '../styles/styles';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
      headerTitle: <HeaderLogo/>    
    };

    showConfirmModal() {
      this.setState({showPasswordReset:false})
      this.setState({showPasswordResetConfirm:true})
    }

    state = 
    { 
      showPasswordReset:false,
      showPasswordResetConfirm:false
    }
  
    render() {
      return (
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={{alignItems:"center"}}>
            <Text style={s.h1}>Login to Wegpiraat</Text>
            <TextInput style={s.entry} placeholder="Email" />
            <TextInput style={s.entry} placeholder="Password"/>     
            <TouchableOpacity style={[s.button, s.exotic, s.smadown]} onPress={()=> this.props.navigation.navigate('App', { id: 100 })}>
              <Text style={s.textBomb}>Login</Text>
            </TouchableOpacity>
            <Text style={{color:"steelblue", marginBottom:30, textDecorationLine:"underline"}} onPress={()=>this.setState({showPasswordReset:true})}>I forgot my password</Text>        
          </View>

          <View style={{alignItems:"center", alignSelf:"stretch", backgroundColor:"white", shadowOffset:{  width: 10,  height: 20,  }, shadowColor: 'black', shadowOpacity: 0.2,}}>
            <Text style={[s.spaceplease]}>New to Wegpiraat? Create an account.</Text>  
            <TouchableOpacity style={[s.button, s.exotic, s.smadown]} onPress={()=> this.props.navigation.navigate('Register', { id: 100 })}>
              <Text style={[s.textBomb]}>Register</Text>
            </TouchableOpacity>
          </View>         

          <Modal
            style={{flex:1}}
            isVisible={this.state.showPasswordReset}
            backdropOpacity={0.5}
            onBackdropPress={() => this.setState({showPasswordReset:false})}
            animationIn="zoomInUp"
            animationOut="fadeOutUp"
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300} >
              <View style={s.content}>

                <View style={{flexDirection:"column", alignItems:"center"}}>
                  <Text style={s.h2}>Send a reset token to my email</Text>
                  <TextInput style={s.entry} placeholder="email address" />
                  <TouchableOpacity style={[s.button, s.exotic, s.medown]} onPress={()=>this.showConfirmModal()}>
                    <Text style={s.smallTextBomb}>Send</Text>
                  </TouchableOpacity>   
                </View>

                <View style={s.rowtastic}>
                  <TouchableOpacity style={s.button} onPress={()=>this.setState({showPasswordReset:false})}>
                    <Text style={s.miniTextBomb}>Go back</Text>
                  </TouchableOpacity>   
                  <TouchableOpacity style={s.button} onPress={()=>this.showConfirmModal()}>
                    <Text style={s.miniTextBomb}>I already have a token</Text>
                  </TouchableOpacity>
                </View>

              </View>            
          </Modal>

          <Modal
            style={{flex:1}}
            isVisible={this.state.showPasswordResetConfirm}
            backdropOpacity={0.5}
            onBackdropPress={() => this.setState({showPasswordResetConfirm:false})}
            animationIn="zoomInUp"
            animationOut="fadeOutUp"
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300}>

              <View style={[s.content, s.centerItems]}>
                <Text style={s.h2}>Check your email inbox for your token:</Text>
                <Text>Token</Text>
                <TextInput style={s.entry} placeholder="password reset token" />
                <Text>New password</Text>
                <TextInput style={s.entry} placeholder="password" />
                <Text>Confirm new password</Text>
                <TextInput style={s.entry} placeholder="password" />
                <TouchableOpacity style={s.button} onPress={()=>this.setState({showPasswordResetConfirm:false})}>
                  <Text style={s.miniTextBomb}>Go back</Text>
                </TouchableOpacity>
              </View>

          </Modal>

        </ScrollView>
      )
    }
  }
  