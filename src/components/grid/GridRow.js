import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/GlassGridStyle';
import GridCell from './GridCell';

export default class GridRow extends Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps){
    if (nextProps.horizontalIndicators === this.props.horizontalIndicators &&
        nextProps.value === this.props.value)
        return false;
    return true;
  }

  render(){
    return (
      <View style={{flexDirection: 'row'}}>{this.props.children}</View>
    );
  }
}
