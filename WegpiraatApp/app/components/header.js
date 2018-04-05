import React from 'react';
import { Image, View, Text} from 'react-native';

export default class HeaderLogo extends React.Component {
    render() {
      return (
        <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignContent:"center"}}>
          <Image 
            source={{uri:"http://www.clker.com/cliparts/S/G/R/n/X/M/car-icon-md.png"}} 
            style={{width:30, height:30}} />   
          <Text style={{ fontSize:20, fontWeight:"bold", fontFamily:'Roboto', marginLeft:20}}>Wegpiraat</Text> 
        </View>  
      )
    }
  }