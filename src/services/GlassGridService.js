import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

function createRow(n, size, rowKey){
  let cells = [];
  for (var i = 0; i < n; i++) {
    cells.push(<View key={`row${rowKey}col${i}`}style={{width: size, height: size, borderWidth: 1, borderColor: '#444'}}></View>);
  }
  return (
    <View style={{flexDirection: 'row'}} key={rowKey}>
      { cells }
    </View>
  );
}

function createGrid(n, m, size){
  var rows = [];
  for (var i = 0; i < n; i++) {
    rows.push(createRow(m, size, i));
  }
  return (
    <View style={{}}>
      {rows}
    </View>
  );
}

export default (width, height, glWidth, glHeight ) => {
  const columns = glWidth / 5,
        rows = glHeight / 5;
  const cellSize = width / columns;
  return (
    <View style={{width: cellSize * columns, height: cellSize * rows, backgroundColor: '#ccc'}}>
      { createGrid(rows, columns, cellSize)}
    </View>
  );
}
