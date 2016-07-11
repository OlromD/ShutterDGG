import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  Alert,
  Picker
} from 'react-native';
import styles from '../../style/AllDesignsPageStyle';
import modalStyles from '../../style/AllDesignsPageModalStyle';

function arrayFactory(length){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(i);
  return arr;
}

const PickerItem = Picker.Item;

export default class AllDesignsPage extends Component {

  componentWillMount(){
    this.state = {
      allDesignsList : arrayFactory(40),
      selectedDesignsList : [1, 45, 16, 2, 4, 5, 17, 42].sort((a,b) => a - b),
      currentDesign: null,
      allDesignsModalVisible : false,
      timeInterval : '1'
    }
  }

  _chooseActionForDesign(el){
    this._setModalVisibility(true);
    this.setState({
      currentDesign : el,
    });

  }

  _getSelectedDesignsList(arr){
    return [].map.call(arr, (el, index) => {
      const text = ((el < 10)? '0': '') + el;
      return (
        <TouchableHighlight style={styles.designItem} key={el}>
          <Text style={styles.designItemText} key={el}>{text}</Text>
        </TouchableHighlight>);
    });
  }
  _getAllDesignsList(arr){
    return [].map.call(arr, (el, index) => {
      const text = ((el < 10)? '0': '') + el;
      return (
        <TouchableHighlight style={styles.designItem} key={el} onPress={() => this._chooseActionForDesign(el)}>
          <Text style={styles.designItemText} key={el}>{text}</Text>
        </TouchableHighlight>);
    });
  }

  _removeDesignFromAllDesings(){
    this._setModalVisibility(false);
    let designs = this.state.allDesignsList;
    const design = this.state.currentDesign,
          index = designs.indexOf(design);
    if (index !== -1)
      designs.splice(index, 1);
    this.setState({
      allDesignsList : arrayFactory(designs.length)
    });
  }
  _addDesignToSelectedDesigns(){
    this._setModalVisibility(false);
    let designs = [].concat(this.state.selectedDesignsList);
    const design = this.state.currentDesign;
    if (designs.indexOf(Number.parseInt(design, 10)) !== -1){
      Alert.alert(`You can't add this design`, `Design ${ ((design < 10)? '0' :'') + design } is already contained in the selected designs.`, [{ text : 'GOT IT!'}]);
      return;
    }
    if (designs.length > 11){
      Alert.alert(`You can't add this design`, 'You can add only 12 designs to selected designs.', [{text: 'GOT IT!'}]);
      return;
    }
    this.setState({
      selectedDesignsList: designs.concat([design]).sort((a,b) => a - b)
    });
  }
  _editCurrentDesign(){
    this._setModalVisibility(false);
    this.props.navigator.push({
      id: 'NewDesignPage'
    });
  }
  _setModalVisibility(value){
    if (!value)
      this.setState({
        allDesignsModalVisible: value,
      });
    this.setState({
      allDesignsModalVisible: value,
    });
  }

  _createNewDesign(){
    this.props.navigator.push({
      id: 'NewDesignPage'
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.selectedDesignsList}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Selected Designs</Text>
              </View>
              <View style={styles.designsContainer}>
                { this._getSelectedDesignsList(this.state.selectedDesignsList) }
              </View>
            </View>

            <View style={styles.controlPanel}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Properties</Text>
              </View>
              <View style={styles.controlPanelOptions}>
                <View style={styles.controlPanelOption}>
                  <Text style={styles.controlPanelOptionText}>Time interval</Text>
                  <Picker
                    selectedValue={this.state.timeInterval}
                    onValueChange={(time) => this.setState({timeInterval : time})}
                    style={styles.timeIntervalPicker}
                  >
                    <PickerItem value="0.5" label="0.5"/>
                    <PickerItem value="1" label="1"/>
                    <PickerItem value="2" label="2"/>
                  </Picker>
                </View>
              </View>
              <View style={styles.controlPanelButtons}>
                <TouchableHighlight style={styles.controlButton}
                  onPress={this._createNewDesign.bind(this)}
                >
                  <Text style={styles.controlButtonText}>New design</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>Save & Load</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.allDesignsList}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>All designs</Text>
          </View>
          <View style={styles.designsContainer}>
            { this._getAllDesignsList(this.state.allDesignsList) }
          </View>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.allDesignsModalVisible}
          onRequestClose={() => this._setModalVisibility(false)}
        >
         <View style={modalStyles.container}>
          <View style={modalStyles.contentContainer}>
            <Text style={modalStyles.title}>Choose the action</Text>
            <View style={modalStyles.actionsList}>
              <TouchableHighlight style={modalStyles.actionContainer}
                onPress={this._addDesignToSelectedDesigns.bind(this)}
              >
                <Text style={modalStyles.actionText}>Add to selected designs</Text>
              </TouchableHighlight>
              <TouchableHighlight style={modalStyles.actionContainer}
                onPress={this._editCurrentDesign.bind(this)}
              >
                <Text style={modalStyles.actionText}>Edit design</Text>
              </TouchableHighlight>
              <TouchableHighlight style={modalStyles.actionContainer}
                onPress={this._removeDesignFromAllDesings.bind(this)}
              >
                <Text style={modalStyles.actionText}>Remove design</Text>
              </TouchableHighlight>
            </View>
            <View style={modalStyles.controlButtons}>
              <TouchableHighlight
                style={modalStyles.closeButton}
                onPress={() => this._setModalVisibility(false)}>
                <Text style={modalStyles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}
