import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Navigator,
  StatusBar,
} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NewsList from './NewsList'

class MainController extends Component {

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#BB2222'}}>
          <View style={{flex:1, marginTop:22, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#FFFFFF', fontSize:17}}>ReactNews</Text>
          </View>
        </View>
        <ScrollableTabView
          tabBarBackgroundColor='#BB2222'
          tabBarUnderlineColor='#FFFFFF'
          tabBarActiveTextColor='#FFFFFF'
          tabBarInactiveTextColor='#BBBBBB'
          renderTabBar={() => <ScrollableTabBar/>}>
          <NewsList
            tabLabel='国内'
            navigator={this.props.navigator}
            id='5572a109b3cdc86cf39001db'
          />
          <NewsList
            tabLabel='国际'
            navigator={this.props.navigator}
            id='5572a109b3cdc86cf39001de'
          />
          <NewsList
            tabLabel='娱乐'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001eb'
          />
          <NewsList
            tabLabel='游戏'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001ee'
          />
          <NewsList
            tabLabel='科技'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001f4'
          />
          <NewsList
            tabLabel='社会'
            navigator={this.props.navigator}
            id='5572a10bb3cdc86cf39001f8'
          />
          <NewsList
            tabLabel='电视'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001ed'
          />
          <NewsList
            tabLabel='电影'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001ec'
          />
          <NewsList
            tabLabel='体育'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001ea'
          />
        </ScrollableTabView>
      </View>
    )
  }
}

export default MainController
