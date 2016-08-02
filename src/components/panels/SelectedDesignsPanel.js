import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert
} from 'react-native';
import config from '../../config/DesignConfig';
import styles from '../../style/DesignPageStyle';

export default class SelectedDesignsPanel extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.setState({
      intervalTime : config.intervalTime[0]
    });
  }
  _getSelectedDesignsTable(){
    const { designs, active, onDesignItemPress } = this.props;
    return designs.map((el, index) => (
      <TouchableHighlight
        style={[
          styles.panelPropTableItem,
          {
            backgroundColor: (el === null)? '#ccc': (active === index)?'#69c9c8':'#f3f4f8',
          }
        ]}
        key={'selected' + index}
        onPress={() => {
          if (el !== null)
            onDesignItemPress(index);
          }
        }
      >
        <Text style={styles.panelPropTableItemText} key={'selected' + index}>{(el === null)?'':((el < 10)?'0': '') + el}</Text>
      </TouchableHighlight>
    ));
  }

  _getIntervalTimeTableItems(){
    return config.intervalTime.map((el) => (
      <TouchableHighlight
        style={styles.panelPropTableItem}
        key={el}
        onPress={() => this.setState({intervalTime : el})}
      >
        <Text style={[styles.panelPropTableItemText, {color: (this.state.intervalTime === el)?'#68c6c8': '#999'}]} key={el}>{el}</Text>
      </TouchableHighlight>
    ));
  }

  deleteDesign(){
    let { designs, onDesignItemDelete } = this.props,
        index = this.props.active;
    if (index === null)
      return;
    Alert.alert(
      'Confirm deletion',
      'Do you want to delete this design from selected designs?',
      [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          onPress : () => {
            designs[index] = null;
            onDesignItemDelete(designs)
          }
        }
      ]
    );
  }

  render (){
    const { visible, onClose } = this.props;
    if (!visible)
      return false;
    return (
      <View style={[styles.panel, {height: 500, flex: 0}]}>
        <View style={[styles.panelHeader, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <TouchableHighlight style={styles.buttonRectangle}
            onPress = { onClose }
          >
            <Text style={styles.buttonRectangleText}>&or;</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonRectangle}
            onPress = { this.deleteDesign.bind(this) }>
            <Text style={styles.buttonRectangleText}>&#10005;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={[styles.panelTitleText, {width: 300, marginLeft: -3}]}>Movement & Time Sequence in Multiple Designs</Text>
          </View>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={[styles.titleCaret, {width: 40}]}>&or;</Text>
              <Text style={[styles.panelPropTitleText, {fontSize: 20}]}>Choose/Change up to 12 designs</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getSelectedDesignsTable() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={[styles.titleCaret, {width: 40}]}>&or;</Text>
              <Text style={[styles.panelPropTitleText, {fontSize: 20}]}>Interval Time within Designs in Second(s)</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getIntervalTimeTableItems() }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
