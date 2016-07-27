import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/GlassGridStyle';

export default class GridCell extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { size, isActive } = this.props;
    const ACTIVE_COLOR = '#fff',
          NOT_ACTIVE_COLOR = '#ccc';
    return (
      <View style={[styles.gridCell, {width: size, height: size, backgroundColor: isActive? ACTIVE_COLOR : NOT_ACTIVE_COLOR}]}>
      </View>
    );
  }
}
