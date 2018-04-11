import React from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, TouchableOpacity, CheckBox} from 'react-native';
import s from '../styles/styles';

export default class UploadScreen extends React.Component {

    render() {
    
      return (
        <ScrollView contentContainerStyle={s.scroll} centerContent={true}>
          <View style={{alignItems:"center"}}>
            <Text style={[s.h2, s.medown, s.smatop]}>* All fields are required</Text> 
            <Text style={s.entryTitle}>Title</Text>
            <TextInput underlineColorAndroid='black' style={s.entry} maxLength={40}/>
            <Text style={s.entryTitle}>Description</Text>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={[s.entry, s.multiline]} maxLength={110} multiline={true}/>
            <View style={[s.rowtastic, s.smatop, s.medown]}>
              <CheckBox/>
              <Button onPress={()=> {}} style={[s.button]} title="Upload image" />
            </View> 
            <Text style={[s.smadown, s.p, s.smatop]}>By uploading this image I confirm that it applies to the Wegpiraat Terms</Text>                                           
            <TouchableOpacity style={[s.button, s.margebomedium, s.exotic]} onPress={()=> this.props.navigation.goBack() }>
              <Text style={s.textBomb}>Upload</Text>
            </TouchableOpacity>  
          </View>
        </ScrollView>   
      )
    }
  }