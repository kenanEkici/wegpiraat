import React from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, TouchableOpacity, CheckBox, ActivityIndicator } from 'react-native';
import { ImagePicker } from 'expo';
import s from '../styles/styles';
import WegpiraatService from '../service/wegpiraatservice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UploadScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          title: "",
          plate: "", 
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
        plate: this.state.plate
      };
      let service = new WegpiraatService();
      let resp = await service.upload(data);
      if (resp) {
          await this.setState({uploading:false, upload:false, title:"", uri:"", plate:""});
      }
    }
    
    render() {
    
      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
          <View style={s.container}>
            <Text style={s.h2}>* All fields are required</Text> 
            <Text style={s.standardText} />
            <TextInput style={s.entry} onChangeText={(text)=>this.setState({title:text})} value={this.state.title} maxLength={40} placeholder="Title"/>
            <TextInput style={s.entry} onChangeText={(text)=>this.setState({plate:text})} value={this.state.plate} maxLength={40} placeholder="Platenumber"/>
            <TouchableOpacity style={s.uploadButton} onPress={()=> this.choosePic() }>
              <View style={s.rowContainer}>
                <CheckBox disabled={true} value={this.state.upload}/>            
                <Text style={s.standardButtonText}>Choose picture</Text>
              </View>
            </TouchableOpacity>
            <Text style={s.standardText}/>
            <View style={{width:250}}><Text style={s.standardText}>By uploading this image I confirm that it applies to the Wegpiraat Terms</Text></View>                                      
            <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={()=> this.upload() }>                          
              {!this.state.uploading && <Ionicons name="ios-add" size={25} color="black" /> }
              {this.state.uploading && <ActivityIndicator animating={true} color="white" /> }
              <Text style={s.standardButtonText}>Upload</Text>              
            </TouchableOpacity>  
          </View>
        </ScrollView>   
      )
    }
  }