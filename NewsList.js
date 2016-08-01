import React, { Component, } from 'react'
import {
  View,
  Navigator,
  Text,
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import ArticleController from './ArticleController'

var contentHeight = Dimensions.get('window').height-116;

class NewsList extends Component {

  PropTypes:{
    id:React.PropTypes.string,
  }

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      id: this.props.id,
    };
    this.pressRow = this.pressRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://apis.baidu.com/showapi_open_bus/channel_news/search_news?channelId="+this.state.id+"&page=1", {
      method: 'GET',
      headers: {
        'apikey': 'fb9e5e49354669b62934dd0ef59275ac',
      },
    })
    .then((response) => response.json())
    .then(
      (responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.showapi_res_body.pagebean.contentlist),
          loaded: true,
        });
      }
    )
    .catch((error) => {

    })
    .done();
  }

  renderLoadingView() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  pressRow(allList, title, source) {
    this.props.navigator.push({name:'ArticleController', component: ArticleController, params: { dataList: allList, title: title, origin: source}});
  }

  renderRow(data) {
    var thumbnail = require('./img/noimg@2x.png');

    if (data.imageurls.length) {
      thumbnail = {uri: data.imageurls[0].url};
    }

    return (
      <TouchableHighlight onPress={ () => this.pressRow(data.allList, data.title, data.source) }>
        <View style={styles.cell}>
          <Image style={styles.thumbnail} source={thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={{fontSize:17}}>{data.title}</Text>
            <View style={{flexDirection:'row', alignItems:'flex-end'}}>
              <Text style={{fontSize:13}} numberOfLines={1}>{data.link}</Text>
              <Text style={{color: '#FFFFFF', fontSize: 13}}>{data.source}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <ListView
          contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}
          style = {styles.listView}
        />
      </View>

    )
  }
}

var styles = StyleSheet.create({
  listView: {
    height: contentHeight,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 100,
    height: 80,
  },
});

export default NewsList
