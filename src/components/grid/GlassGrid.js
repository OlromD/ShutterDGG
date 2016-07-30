import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../../style/GlassGridStyle';
import HorizontalIndicators from './HorizontalIndicators';
import VerticalIndicators from './VerticalIndicators';
import Grid from './Grid';

export default class GlassGrid extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { rows, cols, cellSize, horizontalIndicators, verticalIndicators, horizontalIndex, verticalIndex } = this.props;
    return (
      <View style = { styles.grid }>
        <View style = { styles.gridContainer }>
          <View style = { { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }>
            <HorizontalIndicators
              cols = { cols }
              horizontalIndicators = { horizontalIndicators }
              cellSize = { cellSize }
              horizontalIndex = { horizontalIndex }
            />
            <Grid
              cellSize = { cellSize }
              verticalIndicators = { verticalIndicators }
              horizontalIndicators = { horizontalIndicators }
            />
          </View>
          <VerticalIndicators
            rows = { rows }
            cellSize = { cellSize }
            verticalIndex = { verticalIndex }
            verticalIndicators = { verticalIndicators }
          />
        </View>
      </View>
    );
  }
}
