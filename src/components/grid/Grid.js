import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../../style/GlassGridStyle';
import GridRow from './GridRow';
import GridCell from './GridCell';
import Canvas from '../Canvas';

function renderCanvas(canvas){
  const ctx = canvas.getContext('2d');
  const that = this;
  function draw(){
    const {hIndicators, vIndicators, size, rows, cols} = that;
    const w = cols * size;
    const h = rows*size;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < cols; i++){
      for (var j = 0; j < rows; j++){
        // ctx.fillStyle = (hIndicators[i] !== vIndicators[j])?'#FFFFFF': '#000000';
        ctx.fillStyle = that.hIndicators[i] === that.vIndicators[j]?'rgb(160,160,160)': 'white';
        ctx.fillRect(i * size, j * size, (i + 1) * size, (j + 1) * size);
      }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < rows; i++){
      ctx.moveTo(0, i*size);
      ctx.lineTo(w, i*size);
    }
    for (let i = 0; i < cols; i++){
      ctx.moveTo(i*size, 0);
      ctx.lineTo(i*size, h);
    }
    ctx.strokeStyle = 'rgb(180,180,180)';
    ctx.stroke();
  }
  draw();
}


export default class Grid extends Component{
  constructor(props){
    super(props);
  }




  render(){
    const {cellSize, verticalIndicators, horizontalIndicators} = this.props;
    const w = cellSize*horizontalIndicators.length,
          h = cellSize*verticalIndicators.length;
    return (
      <View style={styles.gridCellsContainer}>
      <Canvas
        context={{hIndicators: horizontalIndicators, vIndicators : verticalIndicators, size : cellSize, rows : verticalIndicators.length, cols : horizontalIndicators.length}}
        render={renderCanvas}
        style={{width: w, height: h, backgroundColor: 'rgb(160,160,160)'}}
      />
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
