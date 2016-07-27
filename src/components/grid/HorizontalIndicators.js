import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/GlassGridStyle';
import Indicator from './Indicator';

export default class HorizontalIndicators extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={[styles.horizontalIndicatorsContainer, {alignItems: 'center', justifyContent: 'center'}]}>
        { this._getHorizontalGridIndicators() }
      </View>
    );
  }

  _getHorizontalGridIndicators(){
    let res = [];
    const { cols, cellSize } = this.props;
    const index = this.props.horizontalIndex,
          indicators = this.props.horizontalIndicators;
    for (let i = 0; i < cols; i++){
      res.push(<Indicator key={i} size={cellSize} isActive={index === i} value={indicators[i]}/>);
    }
    return res;
  }

}
