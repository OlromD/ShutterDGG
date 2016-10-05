import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Image
} from 'react-native';
import config from '../../config/DesignConfig';
import styles from '../../style/DesignPageStyle';
import { RECYCLING_BIN, CLOSE_ICON, CONFIRM_ICON } from '../../config/ApplicationConfig';

export default class SelectedDesignsPanel extends Component {
  constructor(props){
    super(props);
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
    const { intervalTime, onIntervalTimeChange } = this.props;
    return config.intervalTime.map((el) => (
      <TouchableHighlight
        style = { styles.panelPropTableItem }
        key = { el }
        onPress = { () => onIntervalTimeChange(el) }
      >
        <Text style={[styles.panelPropTableItemText, {color: (intervalTime === el)?'#68c6c8': '#999'}]} key={el}>{el}</Text>
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
          <TouchableHighlight style={[styles.buttonRectangle, { justifyContent: 'center', alignItems: 'center'}]}
            onPress = { onClose }
          >
             <Image source = { CLOSE_ICON }/>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRectangle, { justifyContent: 'center', alignItems: 'center'}]}
            onPress = { this.deleteDesign.bind(this) }>
            <Image source = { RECYCLING_BIN }/>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={[styles.panelTitleText, {width: 300, marginLeft: -3}]}>Movement & Time Sequence in Multiple Designs</Text>
          </View>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={[styles.panelPropTitleText, {fontSize: 20}]}>Choose/Change up to 12 designs</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getSelectedDesignsTable() }
            </View>
            <View style={styles.panelPropTitle}>
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
