import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';
import Header from 'layout/Header';
import Sidebar from 'layout/sidebar/Sidebar';
import Breadcrumb from 'layout/Breadcrumb';
import Footer from 'layout/Footer';

export default class Page extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              {this.props.children}
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.instanceOf(Object),
};

Page.defaultProps = {
  children: null,
};
