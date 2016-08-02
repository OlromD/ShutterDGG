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
    const { rows, cols, cellSize, horizontalIndex, verticalIndex } = this.props;
    const { indicators } = this.props.design;
    return (
      <View style = { styles.grid }>
        <View style = { styles.gridContainer }>
          <View style = { { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }>
            <HorizontalIndicators
              cols = { cols }
              horizontalIndicators = { indicators.horizontal }
              cellSize = { cellSize }
              horizontalIndex = { horizontalIndex }
            />
            <Grid
              cellSize = { cellSize }
              verticalIndicators = { indicators.vertical }
              horizontalIndicators = { indicators.horizontal }
            />
          </View>
          <VerticalIndicators
            rows = { rows }
            cellSize = { cellSize }
            verticalIndex = { verticalIndex }
            verticalIndicators = { indicators.vertical }
          />
        </View>
      </View>
    );
  }
}
