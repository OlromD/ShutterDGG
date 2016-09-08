import React, { Component } from 'react';
import {
	TouchableHighlight,
	Text
} from 'react-native';

export default class Button extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { visible = true } = this.props;
		if (!visible)
			return false;
		const { onPress, children, buttonStyle, textStyle } = this.props;
		return (
			<TouchableHighlight
				onPress = { onPress }
				style = { buttonStyle }
			>
				<Text style = { textStyle } >{ children }</Text>
			</TouchableHighlight>
		);
	}
}