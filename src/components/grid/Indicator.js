import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/GlassGridStyle';

export default class Indicator extends Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps){
    if (nextProps.value === this.props.value && nextProps.isActive === this.props.isActive)
      return false;
    return true;
  }

  render(){
    const { size, isActive, value } = this.props;
    const ACTIVE_COLOR = 'orange',
          NOT_ACTIVE_COLOR = 'yellow';
    return (
      <View style={[styles.gridIndicator, {width: size, height: size, backgroundColor: isActive? ACTIVE_COLOR: NOT_ACTIVE_COLOR}]}>
        <Text style={{textAlign: 'center', fontSize: size*.6}}>{value}</Text>
      </View>
    );
  }
}
