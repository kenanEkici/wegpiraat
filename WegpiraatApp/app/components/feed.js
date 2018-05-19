import React from 'react';
import { View, Text, Button, Image, TouchableHighlight, 
  ActivityIndicator, FlatList, Animated, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import WegpiraatService from '../service/wegpiraatservice';
import s from '../styles/styles';
import con from '../configuration/settings';
import Modal from 'react-native-modal';

export default class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.service = new WegpiraatService();
    this.state = {
      data: null,
      loading: false,
      scrolling: false,
      page: 1,
      total: 0,
      showModal: false,
      comments: [],
      comment: "",
      selected: null,
      commenting: false
    }
  }

  async componentDidMount(){
    await this.getData();
  }

  getData = async() => {
    await this.setState({loading:true, page:1}); //reset the page count 
    let data = await this.service.getWegpiraten(1, this.props.filterType, this.props.filter);
    await this.setState({data:data.docs, total:data.pages, loading:false});
  };

  scrollData = async() => {
    //only if there are any more pages
    if (this.state.page <= this.state.total) {
      await this.setState({scrolling:true, page:this.state.page + 1}); //increment page
      let data = await this.service.getWegpiraten(this.state.page, this.props.filterType, this.props.filter);
      await this.setState({data:this.state.data.concat(data.docs), scrolling:false});
    }
  }

  footer = () => {
    if (!this.state.scrolling) return null; 
    return this.indicator();   
  };

  indicator = () => {
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE", alignItems:"center" }} >
        <Text>Loading more pirates</Text>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  like = async(id) => {
      let res = await this.service.like(id);
      if (res) {
        let data = this.state.data;
        for(let i = 0; i < data.length; i++) {
            if (data[i]._id == id) { //found the post
              data[i].liked = !data[i].liked; //reverse the lik
              if (data[i].liked) {
                data[i].likeImg = require("../public/like.png");  
                data[i].likeCount = ++data[i].likeCount;                
              } else {
                data[i].likeImg = require("../public/unlike.png");
                data[i].likeCount = --data[i].likeCount; 
              }
            }
        }
        await this.setState({data:data}); //rerender the data
      }
  }

  comment = async() => {
      await this.setState({commenting:true});
      let resp = await this.service.comment(this.state.selected, this.state.comment);
      if (resp) {
        let comments = [resp].concat(this.state.comments);
        await this.setState({comments, comments, comment:"", commenting:false});
      }
  }

  render() {

    if(this.state.loading){
      return(
        <View style={{flex: 1, padding:40, alignItems:"center", backgroundColor:"rgb(254,241,207)"}}>   
          <Text style={s.h2}>Loading the pirates...</Text>       
          <Image style={{height:400}} source={require('../public/loading.gif')}/>          
        </View>
      )
    }

    return (
      <View>
        <FlatList
          onRefresh={() => this.getData()}
          refreshing={this.state.loading}
          onEndReachedThreshold={0.3}
          onEndReached={() => this.scrollData()}
          data={this.state.data}
          renderItem={({item}) => {            
            return (
            <View style={s.container}>
              <View style={s.flatContainer}>
                <Text style={s.h2}>{item.title}</Text>
                <Image style={s.image} source={{uri:item.picture}}></Image>
                <View style={s.iconRowContainer}>
                  <TouchableOpacity style={s.iconButton} onPress={() => this.like(item._id)}>
                    <Image style={s.icon} source={item.likeImg}/><Text>{item.likeCount}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.iconButton} onPress={() => this.setState({showModal:true,comments:item.comments,selected:item._id})}>
                    <Image style={s.icon} source={require('../public/comment.png')}/><Text>{item.comments.length}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View><Text>{item.createdAt}</Text></View>
            </View>
            )
          }
          }
          ListFooterComponent={this.footer}>
        </FlatList>  
        <Modal
          style={s.scrollContainerCenter}
          isVisible={this.state.showModal} animationOut="fadeOutUp"
          backdropOpacity={0.5} onBackdropPress={() => this.setState({showModal:false})} >
          <View style={s.modalContainer}>
            <TextInput style={s.multiline} placeholder="Comment here (max. 80 characters)" 
              onChangeText={(text)=>this.setState({comment:text})} value={this.state.comment} maxLength={80} multiline={true}/>
            <TouchableOpacity style={s.commentButton} onPress={()=> { this.comment() }}>
              {this.state.commenting && <ActivityIndicator animating={true} color="white" /> }   
              <Text style={s.standardButtonText}>Comment</Text>
            </TouchableOpacity>
            <ScrollView style={{width:250}}>
              <FlatList 
                data={this.state.comments}
                renderItem={({item}) => {
                  return (
                    <View style={s.commentContainer}>
                      <Text style={s.commentHeader}>{item.postedBy}</Text>
                      <Text style={s.commentBody}>{item.commentData}</Text>
                    </View>
                  )
                }} />            
            </ScrollView>            
          </View>
        </Modal>
      </View>  
    )
  }
}