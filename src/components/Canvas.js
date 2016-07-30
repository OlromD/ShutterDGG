import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';

export default class Canvas extends Component{
  render() {
    const contextString = JSON.stringify(this.props.context),
          renderString = this.props.render.toString(),
          contentInset = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          htmlString = "<style>*{margin:0;padding:0;}canvas{position:absolute;transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>";
    return (
      <View>
        <WebView
          automaticallyAdjustContentInsets = { false }
          contentInset = { contentInset }
          source = { { html: htmlString } }
          opaque = { false }
          javaScriptEnabled = { true }
          underlayColor = { 'transparent' }
          style = { this.props.style }
        />
      </View>
    );
  }
};
