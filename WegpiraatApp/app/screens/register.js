import React from 'react';
import { Text, TouchableOpacity, Image, TextInput, View, ScrollView, CheckBox } from 'react-native';
import s from '../styles/styles';

export default class RegisterScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "Create a Wegpiraat"
    });

    render() {
        return (
            <ScrollView contentContainerStyle={s.scroll} centerContent={true}>
                <View style={{alignItems:"center"}}>
                    <Text style={[s.h2, s.roomplease]}>* All fields are required</Text> 
                    <TextInput style={[s.entry, s.metop]} placeholder="Email"/>
                    <TextInput style={s.entry} placeholder="Password"/>
                    <TextInput style={s.entry} placeholder="Confirm password"/>                     
                    <View style={[s.rowtastic, s.spaceplease]}>
                        <CheckBox/>
                        <Text>I have read the </Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                            <Text style={{fontWeight:"bold", color:"steelblue"}}>Wegpiraat Terms.</Text>
                        </TouchableOpacity>       
                    </View>                        
                    <TouchableOpacity style={[s.button, s.margebomedium, s.exotic]} onPress={()=> this.props.navigation.goBack() }>
                        <Text style={s.textBomb}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>                
        )
    }
}