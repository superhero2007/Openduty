import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import isExternal from 'is-url-external';
import classNames from 'classnames';
import SidebarFooter from 'layout/sidebar/SidebarFooter';
import SidebarForm from 'layout/sidebar/SidebarForm';
import SidebarHeader from 'layout/sidebar/SidebarHeader';
import SidebarMinimizer from 'layout/sidebar/SidebarMinimizer';

const nav = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Incidents',
      url: '/incidents',
      icon: 'icon-speedometer',
    },
    {
      name: 'Services',
      url: '/services',
      icon: 'icon-speedometer',
    },
    {
      name: 'Escalation policies',
      url: '/policies',
      icon: 'icon-speedometer',
    },
    {
      name: 'On-Call Schedules',
      url: '/schedules',
      icon: 'icon-speedometer',
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-speedometer',
    },
  ],
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;

    // badge addon to NavItem
    const badge = (badgeItem) => {
      if (badgeItem) {
        const classes = classNames(badgeItem.class);
        return (<Badge className={classes} color={badgeItem.variant}>{ badgeItem.text }</Badge>);
      }
      return null;
    };

    // simple wrapper for nav-title item
    const wrapper = (item) => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name); };

    // nav list section title
    const title = (titleItem, key) => {
      const classes = classNames('nav-title', titleItem.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (dividerItem, key) => { return (<li key={key} className="divider" />); };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames(item.class);
      const variant = classNames('nav-link', item.variant ? `nav-link-${item.variant}` : '');
      return (
        <NavItem key={key} className={classes}>
          { isExternal(item.url) ?
            <RsNavLink href={item.url} className={variant} activeClassName="active">
              <i className={item.icon} />{item.name}{badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={item.url} className={variant} activeClassName="active">
              <i className={item.icon} />{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      );
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a role={'navigation'} className="nav-link nav-dropdown-toggle" onClick={this.handleClick}>
            <i className={item.icon} />
            {item.name}
          </a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>);
    };

    // nav link
    const navLink = (item, idx) => {
      const f1 = item.title ? title(item, idx) : item.divider;
      const f2 = f1 ? divider(item, idx) : item.children;
      return f2 ? navDropdown(item, idx) : navItem(item, idx);
    };

    // nav list
    const navList = (items) => {
      return items.map((item, index) => { return navLink(item, index); });
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    );
  }
}

export default Sidebar;
