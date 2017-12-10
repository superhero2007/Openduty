import React, { Component } from 'react';
import {
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

class Header extends Component {
  static sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  static sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  static mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  static asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={Header.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none mr-auto" onClick={Header.sidebarToggle}>&#9776;</NavbarToggler>
      </header>
    );
  }
}

export default Header;
