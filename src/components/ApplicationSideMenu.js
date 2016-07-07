import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import styles from '../style/ApplicationSideMenuStyle';

class Menu extends Component {
  onPress(){
    this.props.navigator.push({
      id: 'DesignPage',
      name: 'constructor'
    });
  }
  render(){
    return (
      <View style={styles.menuContainer} >
        <Text style={styles.menuItem}>Home</Text>
        <Text style={styles.menuItem} onPress={this.onPress.bind(this)}>New Design</Text>
        <Text style={styles.menuItem}>2-12 Designs</Text>
        <Text style={styles.menuItem}>Settings</Text>
      </View>
    );
  }
}

export default class ApplciationSideMenu extends Component {
  render(){
    const menu = <Menu navigator={this.props.navigator}/>;
    return (
      <SideMenu menu={menu} >
        {this.props.children}
      </SideMenu>
    );
  }
}
