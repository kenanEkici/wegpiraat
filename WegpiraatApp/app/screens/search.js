import React from 'react';
import { Button, ScrollView, TextInput, TouchableOpacity, Text, View} from 'react-native';
import s from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchScreen extends React.Component {
    
    render() {
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null
        
        return ( 
            <ScrollView contentContainerStyle={s.scrollContainer}>
                <View style={s.container}>
                    <Text style={s.h1}>Search a Wegpiraat</Text>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <TextInput style={s.searchEntry} placeholder="Platenumber"/>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <TouchableOpacity style={[s.standardButton, s.rowContainer]}>
                        <Text style={s.standardButtonText}>Search </Text>
                        <Ionicons name="ios-search" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>            
        )
    }
}