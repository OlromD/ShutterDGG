import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  BackAndroid
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
      <ScrollView>
        <View style={styles.menuContainer} >
          <View style={styles.menuCaption}>
            <Image source={require('./side_menu_icon.png')} style={styles.menuIcon}/>
            <Text style={styles.menuLable}>MENU</Text>
          </View>
          <TouchableHighlight style={styles.menuItem} onPress={() =>this._goToPage('MainPage')}>
            <View style={styles.menuItemContent}>
              <Image source={require('./home_icon.png')} style={styles.menuItemIcon}/>
              <Text style={styles.menuItemLable}>Home</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.menuItem} onPress={() =>this._goToPage('NewDesignPage')}>
            <View style={styles.menuItemContent}>
              <Image source={require('./new_design_icon.png')} style={styles.menuItemIcon}/>
              <Text style={styles.menuItemLable}>New design</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.menuItem} onPress={() =>this._goToPage('AllDesignsPage')}>
            <View style={styles.menuItemContent}>
              <Image source={require('./all_designs.png')} style={styles.menuItemIcon}/>
              <Text style={styles.menuItemLable}>All designs</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.menuItem} onPress={() =>this._goToPage('SettingsPage')}>
            <View style={styles.menuItemContent}>
              <Image source={require('./settings_icon.png')} style={styles.menuItemIcon}/>
              <Text style={styles.menuItemLable}>Settings</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.menuItem} onPress={this._exitApp}>
            <View style={styles.menuItemContent}>
              <Image source={require('./exit.png')} style={styles.menuItemIcon}/>
              <Text style={styles.menuItemLable}>Exit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
  _goToPage(pageID){
    this.props.navigator.push({
      id: pageID
    });
  }
  _exitApp(){
    BackAndroid.exitApp(0);
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
