import React from 'react';
import { Button, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          service: new AuthService(),
          username: null,
          email: null
        }        
    }

    async componentDidMount() {
        await this.getData();
    }

    async logout() {
        await this.state.service.logout();
        this.props.navigation.navigate('Auth');
    }

    async getData() {
        let user = await this.state.service.getUser();
        await this.setState({username:user.username});
        await this.setState({email:user.email});
    }

    render() {
        
        return (
            <ScrollView contentContainerStyle={s.scrollContainerCenter}>
                <Image style={s.profile} source={require('../public/profile.png')}/>
                <Text style={s.h2}>{this.state.username}</Text>
                <Text style={s.h3}>{this.state.email}</Text>
                <View style={s.profileCard}>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.setState({feed:true})}>
                        <Text style={s.profileButtonText}>Posts</Text>
                        <Ionicons name="ios-search" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.setState({feed:true})}>
                        <Text style={s.profileButtonText}>Likes</Text>
                        <Ionicons name="ios-search" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.setState({feed:true})}>
                        <Text style={s.profileButtonText}>Comments</Text>
                        <Ionicons name="ios-search" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]}>
                        <Ionicons name="ios-search" size={25} color="black" />
                        <Text style={s.standardButtonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={() => this.logout()}>
                        <Ionicons name="ios-search" size={25} color="black" />
                        <Text style={s.standardButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}