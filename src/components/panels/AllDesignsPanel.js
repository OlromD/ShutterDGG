import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Image
} from 'react-native';
import config from '../../config/DesignConfig';
import { RECYCLING_BIN, CLOSE_ICON, CONFIRM_ICON } from '../../config/ApplicationConfig';
import styles from '../../style/DesignPageStyle';

export default class AllDesignsPanel extends Component {
  constructor(props){
    super(props);
  }

  _getAllDesignsTable(){
    const { designs, active, onDesignItemPress } = this.props;
    return designs.map((el, index) => (
      <TouchableHighlight style={
          [
            styles.panelPropTableDesignItem,
            {
              backgroundColor: (el === null)? '#ccc': (active === index)?'#69c9c8':'#f3f4f8',
            }
          ]
        }
        key={index}
        onPress={() => {
          if (el !== null)
            onDesignItemPress(index)
          }
        }
      >
          <Text style={styles.panelPropTableItemText} key={index}>{(el === null)?'':((index < 10)?'0': '') + index}</Text>
      </TouchableHighlight>
    ));
  }

  deleteDesign(){
    let { designs, onDesignItemDelete } = this.props;
        index = this.props.active;
    if (index === null)
      return;
    Alert.alert(
      'Confirm deletion',
      'Do you want to delete this design?',
      [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          onPress : () => {
            designs[index] = null;
            onDesignItemDelete(designs);
          }
        }
      ]
    );

  }

  render(){
    const { visible, onClose, onDesignItemDelete, onDesignItemSelect} = this.props;
    if (!visible)
      return false;
    return (
      <View style={styles.panel}>
        <View style={[styles.panelHeader, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <TouchableHighlight style={[styles.buttonRectangle, { justifyContent: 'center', alignItems: 'center'}]}
            onPress = { onDesignItemSelect }
          >
            <Image source = { CONFIRM_ICON }/>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRectangle, { justifyContent: 'center', alignItems: 'center'}]}
            onPress = { onClose }
          >
            <Image source = { CLOSE_ICON }/>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRectangle, { justifyContent: 'center', alignItems: 'center'}]}
            onPress = { this.deleteDesign.bind(this) }
          >
            <Image source = { RECYCLING_BIN }/>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={styles.panelPropTitleText}>Designs List</Text>
            </View>
            <View style={styles.panelPropDesignsTable}>
              { this._getAllDesignsTable() }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
// this.deleteDesignsFromAll.bind(this)
