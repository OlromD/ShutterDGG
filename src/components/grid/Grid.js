import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../../style/GlassGridStyle';
import GridRow from './GridRow';
import GridCell from './GridCell';

export default class Grid extends Component{
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps){
    if (nextProps.horizontalIndicators === this.props.horizontalIndicators &&
       nextProps.verticalIndicators === this.props.verticalIndicators)
       return false;
    return true;
  }
  render(){
    return (
      <View style={styles.gridCellsContainer}>
        { this._getGrid() }
      </View>
    );
  }

  _getGridRow(row){
    let res = [];
    const { cellSize, horizontalIndicators, verticalIndicators} = this.props;
    for (let i = 0; i < horizontalIndicators.length; i++)
      res.push(<GridCell key={i} isActive={horizontalIndicators[i] !== verticalIndicators[row]} size={cellSize}/>);
    return res;
  }
  _getGrid(){
    const {cellSize, verticalIndicators, horizontalIndicators} = this.props;
    let res = [];
    for (let i = 0; i < verticalIndicators.length; i++){
      res.push(<GridRow key={i} value={verticalIndicators[i]} horizontalIndicators={horizontalIndicators}>{this._getGridRow(i)}</GridRow>);
    }
    return res;
  }
}
