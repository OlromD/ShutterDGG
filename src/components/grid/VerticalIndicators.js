import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/GlassGridStyle';
import Indicator from './Indicator';

export default class VerticalIndicators extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { cellSize } = this.props;
    return (
      <View style={[styles.vertivalIndicatorsContainer, {marginTop: cellSize}]}>
        { this._getVerticalGridIndicators() }
      </View>
    );
  }
  _getVerticalGridIndicators(){
    let res = [];
    const {rows, cols, cellSize} = this.props;
    const index = this.props.verticalIndex,
          indicators = this.props.verticalIndicators;
    for (let i = 0; i < rows; i++){
      res.push(<Indicator key={i} size={cellSize} isActive={index === i} value={indicators[i]}/>);
    }
    return res;
  }
}
