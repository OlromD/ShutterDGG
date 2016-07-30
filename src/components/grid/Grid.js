import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Canvas from '../Canvas';
import styles from '../../style/GlassGridStyle';

// function which will be passed to the WebView as a string
function renderCanvas(canvas){
  const ctx = canvas.getContext('2d'),
        self = this;
  function draw(){
    const { hIndicators, vIndicators, size, rows, cols } = self,
          w = cols * size,
          h = rows * size,
          ACTIVE_COLOR = 'rgb(255, 255, 255)',
          NO_ACTIVE_COLOR = 'rgb(160,160,160)',
          GRID_LINE_COLOR = 'rgb(180,180,180)',
          GRID_LINE_WIDTH = 1;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        ctx.fillStyle = ( self.hIndicators[i] === self.vIndicators[j] )? NO_ACTIVE_COLOR : ACTIVE_COLOR;
        ctx.fillRect(i * size, j * size, (i + 1) * size, (j + 1) * size);
      }
    }
    ctx.lineWidth = GRID_LINE_WIDTH;
    for (let i = 0; i < rows; i++){
      ctx.moveTo(0, i * size);
      ctx.lineTo(w, i * size);
    }
    for (let i = 0; i < cols; i++){
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, h);
    }
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.stroke();
  }
  draw();
}


export default class Grid extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { cellSize, verticalIndicators, horizontalIndicators } = this.props,
          w = cellSize * horizontalIndicators.length,
          h = cellSize * verticalIndicators.length,
          context = {
            hIndicators: horizontalIndicators,
            vIndicators: verticalIndicators,
            size:        cellSize,
            rows:        verticalIndicators.length,
            cols:        horizontalIndicators.length
          },
          webViewStyles = {
            width:            w,
            height:           h,
            backgroundColor:  'rgb(160,160,160)'
          };

    return (
      <View style = { styles.gridCellsContainer }>
        <Canvas
          context = { context }
          render = { renderCanvas }
          style = { webViewStyles }
        />
      </View>
    );
  }
}
