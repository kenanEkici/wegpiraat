import React from 'react';
import { Image, View, Text} from 'react-native';
import s from '../styles/styles';

export default class HeaderLogo extends React.Component {
    render() {
      return (
        <View style={s.centerRowContainer}>
          <Image 
            source={{uri:"http://www.clker.com/cliparts/S/G/R/n/X/M/car-icon-md.png"}} 
            style={s.icon} />
          <Text style={{fontSize:20, fontWeight:"bold", fontFamily:'Roboto', marginLeft:20}}>{this.props.name}</Text> 
        </View>  
      )
    }
  }