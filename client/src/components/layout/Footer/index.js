import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href="http://openduty.com">Openduty</a> &copy; 2017 openduty.
        <span className="float-right">Powered by <a href="http://coreui.io">CoreUI</a></span>
      </footer>
    );
  }
}
