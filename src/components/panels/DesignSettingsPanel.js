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
  componentWillMount(){
    this.setState({
      movingSequence : config.movingSequence[0],
      timeSequence : config.timeSequence[0],
      repetitionCycle : config.repetitionCycle[0],
    });
  }

  _getTimeSequenceTableItems(){
      return config.timeSequence.map((el) => (
        <TouchableHighlight
          style={styles.panelPropTableItem}
          key={el}
          onPress={() => this.setState({timeSequence : el})}
        >
          <Text style={[styles.panelPropTableItemText, {color: (this.state.timeSequence === el)?'#68c6c8': '#999'}]} key={el}>{el}</Text>
        </TouchableHighlight>
      ));
  }
  _getMovingSequenceListItems(){
    return config.movingSequence.map((el) => (
      <TouchableHighlight style={styles.panelPropListItem} key={el}
        onPress={() => this.setState({movingSequence : el})}
      >
        <Text style={[styles.panelPropListItemText, {color: (this.state.movingSequence === el)?'#68c6c8': '#999'}]} key={el}>{el}</Text>
      </TouchableHighlight>)
  );
  }
  _getRepetitionCycleTableItems(){
    return config.repetitionCycle.map((el) => (
      <TouchableHighlight
        style={styles.panelPropTableItem}
        key={'interval'+el}
        onPress={() => this.setState({repetitionCycle: el})}
      >
        <Text style={[styles.panelPropTableItemText, {color: (this.state.repetitionCycle === el)?'#68c6c8': '#999', fontWeight: (el === 'n')?'800': '300'}]} key={'interval'+el}>{el}</Text>
      </TouchableHighlight>
    ));
  }

  render(){
    const { visible, onClose } = this.props;
    if (!visible)
      return (
        <View></View>
      );
    return (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <TouchableHighlight style={styles.buttonRounded}
            onPress={onClose}
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
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Moving Sequences</Text>
            </View>
            <View style={styles.panelPropList}>
              { this._getMovingSequenceListItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Time Sequences (Second)</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getTimeSequenceTableItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
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
