import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native'

var contentHeight = Dimensions.get('window').height-66;

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
  }

  componentDidMount() {
    // console.log(this.state.dataList);
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  render() {
    var itemArray = [];
    var imgArray = [];
    for (var item in this.state.dataList) {
      if (this.state.dataList.hasOwnProperty(item)) {
        if (typeof(this.state.dataList[item]) == "object") {
          var imgItem = <Image key={item} source={{uri: this.state.dataList[item].url}} style={{marginTop: 12, marginBottom: 12, width: 335, height:this.state.dataList[item].height/this.state.dataList[item].width*335}}/>
          itemArray.push(imgItem);
        } else {
          var textItem = <Text key={item} style={{marginLeft: 18, marginRight: 18, marginTop: 12, marginBottom: 12}}>{this.state.dataList[item]}</Text>;
          itemArray.push(textItem);
        }
      }
    }

    return (
      <View>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#BB2222'}}>
          <TouchableHighlight onPress={()=>this.onBackPressed()} style={{marginTop: 22, justifyContent:'center'}}>
            <Text style={{color: '#FFFFFF'}}>
              Back
            </Text>
          </TouchableHighlight>
          <View style={{flex:1, marginTop:22, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#FFFFFF', fontSize:17}}>{this.state.origin}</Text>
          </View>
        </View>
        <ScrollView style={{height: contentHeight}} contentContainerStyle={{alignItems: 'center'}}>
          {itemArray}
        </ScrollView>
      </View>
    )
  }

  // render() {
  //   var strArray = [];
  //   var imgArray = [];
  //   for (var item in this.state.dataList) {
  //     if (this.state.dataList.hasOwnProperty(item)) {
  //       if (typeof(this.state.dataList[item]) == "object") {
  //         var imgItem = <Image key={item} source={{uri: this.state.dataList[item].url}}/>
  //         imgArray.push(imgItem);
  //       } else {
  //         var textItem = <Text key={item}>{this.state.dataList[item]}</Text>;
  //         strArray.push(textItem);
  //       }
  //     }
  //   }
  //
  //   return (
  //     <View>
  //       <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#BB2222'}}>
  //         <TouchableHighlight onPress={()=>this.onBackPressed()} style={{marginTop: 22, justifyContent:'center'}}>
  //           <Text style={{color: '#FFFFFF'}}>
  //             Back
  //           </Text>
  //         </TouchableHighlight>
  //         <View style={{flex:1, marginTop:22, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
  //           <Text style={{color:'#FFFFFF', fontSize:17}}>{this.state.origin}</Text>
  //         </View>
  //       </View>
  //       <ScrollView style={{height: contentHeight}}>
  //         {imgArray}
  //         {strArray}
  //       </ScrollView>
  //     </View>
  //   )
  // }


}

export default ArticleController
