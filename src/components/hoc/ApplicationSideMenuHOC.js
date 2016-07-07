import React, { Component } from 'react';
import ApplicationSideMenu from '../ApplicationSideMenu';

export default InnerComponent => class extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ApplicationSideMenu {...this.props}>
        <InnerComponent {...this.props}/>
      </ApplicationSideMenu>
    );
  }
}
