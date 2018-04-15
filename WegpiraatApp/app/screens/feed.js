import React from 'react';
import { View, Text, Button, Image, TouchableHighlight, 
  ActivityIndicator, FlatList, Animated, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import WegpiraatService from '../service/wegpiraatservice';
import s from '../styles/styles';
import con from '../configuration/settings';
import Modal from 'react-native-modal';

export default class FeedScreen extends React.Component {

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
    let data = await this.service.getAllWegpiraten(1);
    await this.setState({data:data.docs, total:data.pages, loading:false});
  };

  scrollData = async() => {
    //only if there are any more pages
    if (this.state.page <= this.state.total) {
      await this.setState({scrolling:true, page:this.state.page + 1}); //increment page
      let data = await this.service.getAllWegpiraten(this.state.page);
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
        <View style={{flex: 1, alignItems:"center", backgroundColor:"rgb(254,241,207)"}}>   
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
            <View style={[s.container, s.spaceplease]}>
              <View style={[s.flat]}>
                <Text style={s.h2}>{item.title}</Text>
                <Image style={[s.image, s.smadown]} source={{uri:`${con.files}/${item.picture}`}}></Image>
                <View style={[s.rowtastic, s.medwide]}>
                  <TouchableOpacity style={{alignItems:"center"}} onPress={() => this.like(item._id)}>
                    <Image source={item.likeImg} style={s.icon}/><Text>{item.likeCount}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{alignItems:"center"}} onPress={() => this.setState({showModal:true,comments:item.comments,selected:item._id})}>
                    <Image source={require('../public/comment.png')} style={s.icon}/><Text>{item.comments.length}</Text>
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
          style={{flex: 1, flexDirection: 'column', borderRadius:3, alignItems: 'center', justifyContent:"space-between"}}
          isVisible={this.state.showModal} animationOut="fadeOutUp"
          backdropOpacity={0.5} onBackdropPress={() => this.setState({showModal:false})} >
          <View style={{ backgroundColor:"white", width: 300, height: 450 }}>
            <TextInput placeholder="Comment here (max. 80 characters)" underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(text)=>this.setState({comment:text})} value={this.state.comment} style={[s.multiline, s.paddingmuch]} maxLength={80} multiline={true}/>
            <TouchableOpacity style={[s.commentButton, s.smadown]} onPress={()=> { this.comment() }}>
              {this.state.commenting && <ActivityIndicator animating={true} color="white" /> }   
              <Text style={s.textBomb}>Comment</Text>
            </TouchableOpacity>
            <ScrollView>
              <FlatList                      
                data={this.state.comments}
                renderItem={({item}) => {
                  return (
                    <View style={s.comment}>
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