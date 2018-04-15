import React from 'react';
import { Text, Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderLogo from './../components/header';
import Modal from 'react-native-modal';
import AuthService from '../service/authservice';
import s from '../styles/styles';

export default class LoginScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showPasswordReset:false,
        showPasswordResetConfirm:false,
        loginError: "",
        loading: false,
        username: "kenan.ekici@outlook.com",
        password: "kenan123"
      }
    }

    static navigationOptions = {
      headerTitle: <HeaderLogo/>
    };

    showConfirmModal() {
      this.setState({showPasswordReset:false})
      this.setState({showPasswordResetConfirm:true})
    }

    tryLogin = async () => {  

      await this.setState({loading: true});
      let service = new AuthService();
      let success = await service.login(this.state.username, this.state.password);
      await this.setState({loading: false});
      if (success) {
          this.props.navigation.navigate('App');
      } else {
          this.setState({loginError: "Wrong email or password. Try again."});                
      }
    }
  
    render() {

      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
          <View style={s.centerContainer}>
            <Text style={s.h1}>Login to Wegpiraat</Text>
            <Text style={[s.errorMessage]}>{this.state.loginError}</Text>
            <TextInput onChangeText={(text)=>this.setState({username:text})} value={this.state.username} style={s.entry} placeholder="Email" />
            <TextInput onChangeText={(text)=>this.setState({password:text})} value={this.state.password} secureTextEntry={true} style={s.entry} placeholder="Password"/>     
            <TouchableOpacity disabled={this.state.loading} style={[s.standardButton]} onPress={() => { this.tryLogin()}}>
                {this.state.loading && <ActivityIndicator animating={true} color="white" /> }             
                <Text style={s.standardButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={[s.a]} onPress={()=>this.setState({showPasswordReset:true})}>I forgot my password</Text>        
          </View>

          <View style={[s.stretchContainer, s.smallShadow]}>
            <Text style={[s.standardText]}>New to Wegpiraat? Create an account.</Text>  
            <TouchableOpacity style={[s.standardButton]} onPress={()=> this.props.navigation.navigate('Register', { id: 100 })}>
              <Text style={[s.standardButtonText]}>Register</Text>
            </TouchableOpacity>
          </View>

          <Modal
            style={s.container}
            isVisible={this.state.showPasswordReset}
            backdropOpacity={0.5}
            onBackdropPress={() => this.setState({showPasswordReset:false})}
            animationIn="zoomInUp"
            animationOut="fadeOutUp">
              <View style={s.modalContainer}>
                <Text style={s.h3}>Send a reset token to your email</Text>
                <TextInput placeholder="Email" style={s.entry} />
                <TouchableOpacity style={[s.standardButton]} onPress={()=>{}}>
                  <Text style={[s.standardButtonText]}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.standardButton]} onPress={()=>this.setState({showPasswordReset:false, showPasswordResetConfirm:true})}>
                  <Text style={[s.standardButtonText]}>I already have a token</Text>
                </TouchableOpacity>
              </View>
          </Modal>

          <Modal
            style={s.container}
            isVisible={this.state.showPasswordResetConfirm}
            backdropOpacity={0.5}
            onBackdropPress={() => this.setState({showPasswordResetConfirm:false})}
            animationIn="zoomInUp"
            animationOut="fadeOutUp">
              <View style={s.modalContainer}>
                <Text style={s.h3}>Check your email inbox for your token:</Text>
                <TextInput style={s.entry} placeholder="password reset token" />
                <Text style={s.entryHeader}>New password</Text>
                <TextInput style={s.entry} placeholder="password" />
                <Text style={s.entryHeader}>Confirm new password</Text>
                <TextInput style={s.entry} placeholder="password" />
                <TouchableOpacity style={s.standardButton} onPress={()=>this.setState({showPasswordResetConfirm:false})}>
                  <Text style={s.standardButtonText}>Change password</Text>
                </TouchableOpacity>
              </View>
          </Modal>

        </ScrollView>
      )
    }
  }
  