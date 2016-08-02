import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import ImageController from './ImageController'

var contentHeight = Dimensions.get('window').height-66;
var contentWidth = Dimensions.get('window').width;

class ArticleController extends Component {


  static propTypes = {

  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      dataList: this.props.dataList,
      origin: this.props.origin,
      title: this.props.title,
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

  }

  render() {
    var itemArray = [];
    var imgArray = [];
    for (var item in this.state.dataList) {
      if (this.state.dataList.hasOwnProperty(item)) {
        if (typeof(this.state.dataList[item]) == "object") {
          var imgItem = <TouchableWithoutFeedback key={item*1000} onPress={()=>this.onImagePressed(imgArray)}><Image key={item} source={{uri: this.state.dataList[item].url}} style={{marginTop: 12, marginBottom: 12, width: contentWidth-36, height:this.state.dataList[item].height/this.state.dataList[item].width*(contentWidth-36)}}/></TouchableWithoutFeedback>
          itemArray.push(imgItem);
          imgArray.push(this.state.dataList[item].url);
        } else {
          var textItem = <Text key={item} style={{marginLeft: 18, marginRight: 18, marginTop: 12, marginBottom: 12, fontSize: 16}}>{this.state.dataList[item]}</Text>;
          itemArray.push(textItem);
        }
      }
    }

    return (
      <View>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#BB2222'}}>
          <View style={{marginTop:22, flex:1, flexDirection:'row', marginLeft: 12, marginRight: 12}}>
            <TouchableHighlight onPress={()=>this.onBackPressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                返回
              </Text>
            </TouchableHighlight>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#FFFFFF', fontSize:17}}>{this.state.origin}</Text>
            </View>
            <TouchableHighlight onPress={()=>this.onSharePressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                分享
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView style={{height: contentHeight}} contentContainerStyle={{alignItems: 'center'}}>
          {itemArray}
        </ScrollView>
      </View>
    )
  }
}

export default ArticleController
