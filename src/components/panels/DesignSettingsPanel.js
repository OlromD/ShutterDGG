import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from '../../style/DesignPageStyle';
import config from '../../config/DesignConfig';

export default class DesignSettingsPanel extends Component {
  constructor(props){
    super(props);
  }

  _getTimeSequenceTableItems(){
      const { design, onDesignChange } = this.props;
      return config.timeSequence.map((el) => (
        <TouchableHighlight
          style = { styles.panelPropTableItem }
          key = { el }
          onPress = { () => onDesignChange(Object.assign({}, design, { time : el }))}
        >
          <Text
            style = { [styles.panelPropTableItemText, {color: (design.time === el)?'#68c6c8': '#999'}] }
            key = { el }
          >
            { el }
          </Text>
        </TouchableHighlight>
      ));
  }
  _getMovingSequenceListItems(){
    const { design, onDesignChange } = this.props;
    return config.movingSequence.map((el) => (
      <TouchableHighlight
        style = { styles.panelPropListItem }
        key = { el }
        onPress = { () => onDesignChange(Object.assign({}, design, { animationType : el }))}
      >
        <Text
          style = { [styles.panelPropListItemText, {color: (design.animationType === el)?'#68c6c8': '#999'}] }
          key = { el }
        >
          { el }
        </Text>
      </TouchableHighlight>)
  );
  }
  _getRepetitionCycleTableItems(){
    const { design, onDesignChange } = this.props;
    return config.repetitionCycle.map((el) => (
      <TouchableHighlight
        style = { styles.panelPropTableItem }
        key = { el }
        onPress = { () => onDesignChange(Object.assign({}, design, { repetitionNumber : el }))}
      >
        <Text
          style = { [styles.panelPropTableItemText, {color: (design.repetitionNumber === el)?'#68c6c8': '#999', fontWeight: (el === 'n')?'800': '300'}] }
          key = { el }
        >
          { el }
        </Text>
      </TouchableHighlight>
    ));
  }

  render(){
    const { visible, onClose } = this.props;
    if (!visible)
      return false;
    return (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <TouchableHighlight style={styles.buttonRounded}
            onPress = { onClose }
          >
            <Text style={styles.buttonRoundedText}>&or;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={[styles.panelTitleText, {width: 500, marginLeft: 20}]}>Movement & Time Sequence of a Single Design</Text>
          </View>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={styles.panelPropTitleText}>Moving Sequences</Text>
            </View>
            <View style={styles.panelPropList}>
              { this._getMovingSequenceListItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.panelPropTitleText}>Time Sequences (Second)</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getTimeSequenceTableItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.panelPropTitleText}>Repetition Cycle in Single Design</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getRepetitionCycleTableItems() }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
