import React from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, TouchableOpacity, CheckBox, ActivityIndicator } from 'react-native';
import { ImagePicker } from 'expo';
import s from '../styles/styles';
import WegpiraatService from '../service/wegpiraatservice';

export default class UploadScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          title: "",
          desc: "", 
          uri: "",
          upload:false,
          uploading: false       
      };
    }

    choosePic = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      await this.setState({uri: result.uri, upload:true});     
    };

    upload = async() => {
      await this.setState({uploading:true});
      let data = {
        pic: this.state.uri,
        title: this.state.title,
        desc: this.state.desc
      };
      let service = new WegpiraatService();
      let resp = await service.upload(data);
      if (resp) {
          await this.setState({uploading:false, upload:false, title:"", uri:"", desc:""});
      }
    }
    
    render() {
    
      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
          <View style={s.container}>
            <Text style={s.h2}>* All fields are required</Text> 
            <Text style={s.standardText} />
            <TextInput style={s.entry} onChangeText={(text)=>this.setState({title:text})} value={this.state.title} maxLength={40} placeholder="Title"/>
            <Text style={s.entryHeader}>Description</Text>
            <TextInput style={s.multiline} onChangeText={(text)=>this.setState({desc:text})} value={this.state.desc} maxLength={110} multiline={true}/>
            <TouchableOpacity style={s.uploadButton} onPress={()=> this.choosePic() }>
              <View style={s.rowContainer}>
                <CheckBox disabled={true} value={this.state.upload}/>            
                <Text style={s.standardButtonText}>Choose picture</Text>
              </View>
            </TouchableOpacity>
            <Text style={s.standardText}/>
            <View style={{width:250}}><Text style={s.standardText}>By uploading this image I confirm that it applies to the Wegpiraat Terms</Text></View>                                      
            <TouchableOpacity style={s.standardButton} onPress={()=> this.upload() }>
              {this.state.uploading && <ActivityIndicator animating={true} color="white" /> }  
              <Text style={s.standardButtonText}>Upload</Text>
            </TouchableOpacity>  
          </View>
        </ScrollView>   
      )
    }
  }