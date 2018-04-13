import React from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { ImagePicker } from 'expo';
import s from '../styles/styles';
import WegpiraatService from '../service/wegpiraatservice';

export default class UploadScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          title: "",
          desc: "", 
          uri: ""         
      };
    }

    choosePic = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      await this.setState({uri: result.uri});     
    };

    upload = async() => {
      let data = {
        pic: this.state.uri,
        title: this.state.title,
        desc: this.state.desc
      };
      let service = new WegpiraatService();
      let resp = await service.upload(data);
    }
    

    render() {
    
      return (
        <ScrollView contentContainerStyle={s.scroll} centerContent={true}>
          <View style={{alignItems:"center"}}>
            <Text style={[s.h2, s.medown, s.smatop]}>* All fields are required</Text> 
            <Text style={s.entryTitle}>Title</Text>
            <TextInput underlineColorAndroid='black'  onChangeText={(text)=>this.setState({title:text})} value={this.state.title} style={s.entry} maxLength={40}/>
            <Text style={s.entryTitle}>Description</Text>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(text)=>this.setState({desc:text})} value={this.state.desc} style={[s.entry, s.multiline]} maxLength={110} multiline={true}/>
            <View style={[s.rowtastic, s.smatop, s.medown]}>
              <CheckBox/>
              <Button onPress={()=> this.choosePic()} style={[s.button]} title="Upload image" />
            </View> 
            <Text style={[s.smadown, s.p, s.smatop]}>By uploading this image I confirm that it applies to the Wegpiraat Terms</Text>                                           
            <TouchableOpacity style={[s.button, s.margebomedium, s.exotic]} onPress={()=> this.upload() }>
              <Text style={s.textBomb}>Upload</Text>
            </TouchableOpacity>  
          </View>
        </ScrollView>   
      )
    }
  }