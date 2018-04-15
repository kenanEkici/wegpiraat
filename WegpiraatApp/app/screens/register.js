import React from 'react';
import { Text, TouchableOpacity, Image, TextInput, View, ScrollView, CheckBox } from 'react-native';
import s from '../styles/styles';

export default class RegisterScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "Create a Wegpiraat"
    });

    render() {
        return (
            <ScrollView contentContainerStyle={s.container}>
                <Text style={s.h2}>* All fields are required</Text>
                <Text style={s.standardText}/>
                <TextInput style={s.entry} placeholder="Email"/>
                <TextInput style={s.entry} placeholder="Password"/>
                <TextInput style={s.entry} placeholder="Confirm password"/>                     
                <View style={s.rowContainer}>
                    <CheckBox/>
                    <Text>I have read the </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Text style={s.a}>Wegpiraat Terms.</Text>
                    </TouchableOpacity>
                </View>
                <Text style={s.standardText}/>
                <Text style={s.standardText}/>
                <TouchableOpacity style={s.standardButton} onPress={()=> this.props.navigation.goBack() }>
                    <Text style={s.standardButtonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>         
        )
    }
}