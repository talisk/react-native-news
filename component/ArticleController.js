import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActionSheetIOS,
  Dimensions,
  Linking,
} from 'react-native'
import ImageController from './ImageController'

import * as WechatAPI from 'react-native-wx'
import * as QQAPI from 'react-native-qq'
import * as WeiboAPI from 'react-native-weibo'

var contentHeight = Dimensions.get('window').height-66;
var contentWidth = Dimensions.get('window').width;

class ArticleController extends Component {


  static propTypes = {

  }

  static defaultProps = {
    clicked: 'none',
  }

  constructor(props) {
    super(props)
    this.state = {
      dataList: this.props.dataList,
      origin: this.props.origin,
      title: this.props.title,
      url: this.props.url,
      imgList: this.props.imgList,
    }
    this.onImagePressed = this.onImagePressed.bind(this);
  }

  componentDidMount() {

  }

  onImagePressed(imgArray) {
    this.props.navigator.push({name: 'ImageController', component: ImageController, params: {imgArray: imgArray}});
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  onSharePressed() {
    var BUTTONS = [
      'QQ好友',
      '微信好友',
      '朋友圈',
      '新浪微博',
      'QQ空间',
      '取消分享',
    ];

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length-1,
      tintColor: '#364c62',
    },
    (buttonIndex) => {
      // this.setState({ clicked: BUTTONS[buttonIndex] });
      switch (BUTTONS[buttonIndex]) {
        case '新浪微博':
          console.log("weibo");
          var shareItem;

          if (this.state.imgList.length !== 0) {
            shareItem = {
              type: 'image',
              text: this.state.title + " - 原文：" + this.state.url + "- 来自ReactNews",
              imageUrl: this.state.imgList[0].url,
            };
          } else {
            shareItem = {
              type: 'text',
              text: this.state.title + " - 原文：" + this.state.url + " - 来自ReactNews",
            }
          }
          WeiboAPI.share(shareItem);
          break;
        case '微信好友':
          console.log("friends");
          WechatAPI.shareToSession({
            type: 'news',
            title: this.state.title + " - ReactNews新闻分享",
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        case '朋友圈':
          console.log("moment");
          WechatAPI.shareToTimeline({
            type: 'news',
            title: this.state.title + ' - ReactNews新闻分享',
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;

        case 'QQ好友':
          console.log("qqfriends");
          QQAPI.shareToQQ({
            type: 'news',
            title: this.state.title,
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        case 'QQ空间':
          console.log("qzone");
          QQAPI.shareToQzone({
            type: 'news',
            title: this.state.title,
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        default:
          console.log("cancel");
      }
    });
  }

  render() {
    var itemArray = [];
    var imgArray = [];
    for (var item in this.state.dataList) {
      if (this.state.dataList.hasOwnProperty(item)) {
        if (typeof(this.state.dataList[item]) == "object") {
          var imgItem = <TouchableOpacity key={item*1000} activeOpacity={0.7} onPress={()=>this.onImagePressed(imgArray)}><Image key={item} source={{uri: this.state.dataList[item].url}} style={{marginTop: 12, marginBottom: 12, width: contentWidth-36, height:this.state.dataList[item].height/this.state.dataList[item].width*(contentWidth-36)}}/></TouchableOpacity>
          itemArray.push(imgItem);
          imgArray.push(this.state.dataList[item].url);
        } else {
          var textItem = <Text key={item} style={{marginLeft: 18, marginRight: 18, marginTop: 12, marginBottom: 12, fontSize: 15}}>{this.state.dataList[item]}</Text>;
          itemArray.push(textItem);
        }
      }
    }

    return (
      <View>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#364c62'}}>
          <View style={{marginTop:22, flex:1, flexDirection:'row', marginLeft: 12, marginRight: 12}}>
            <TouchableOpacity onPress={()=>this.onBackPressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                返回
              </Text>
            </TouchableOpacity>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#FFFFFF', fontSize:17}}>来源：{this.state.origin}</Text>
            </View>
            <TouchableOpacity onPress={()=>this.onSharePressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                分享
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{height: contentHeight}} contentContainerStyle={{alignItems: 'center'}}>
          <Text style={{marginLeft: 18, marginRight: 18, marginTop: 12, marginBottom: 12, fontSize: 18, fontWeight: 'bold'}}>
            {this.state.title}
          </Text>
          {itemArray}
          <Text style={{marginLeft: 18, marginRight: 18, marginTop: 12, marginBottom: 12, fontSize: 15}}>
            原文链接：{this.state.url}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

export default ArticleController
