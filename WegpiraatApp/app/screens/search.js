import React from 'react';
import { Button, ScrollView, TextInput, TouchableOpacity, Text, View} from 'react-native';
import s from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../components/feed';

export default class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          feed: false,
          filter: ""
        }
    }
    
    render() {
        if (this.state.feed) {
            return (
                <Feed filterType="search" filter={this.state.filter}/>
            )
        }        
        return ( 
            <ScrollView contentContainerStyle={s.scrollContainer}>
                <View style={s.container}>
                    <Text style={s.h1}>Search a Wegpiraat</Text>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <TextInput style={s.searchEntry} onChangeText={(text)=>this.setState({filter:text})} value={this.state.filter} maxLength={10} placeholder="Platenumber"/>
                    <Text style={s.standardText}/>
                    <Text style={s.standardText}/>
                    <TouchableOpacity style={[s.standardButton, s.rowContainer]} onPress={() => this.setState({feed:true})}>
                        <Text style={s.standardButtonText}>Search </Text>
                        <Ionicons name="ios-search" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>            
        )
    }
}