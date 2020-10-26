import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import '../style/NavBar.css';
import { withRouter } from 'react-router';

class NavBar extends Component {
  render() {
    return (
      <Menu inverted pointing secondary size="huge" style={{ background: '#2185d0 ' }}>
        <Menu.Item>
          <h3>Los Hermanos</h3>
        </Menu.Item>
        <Menu.Item
          name="Home"
          active={this.props.location.pathname === '/home'}
          onClick={() => this.props.history.push('/home')}
        />
        <Menu.Item
          name="Productos"
          active={this.props.location.pathname === '/products'}
          onClick={() => this.props.history.push('/products')}
        />
        <Menu.Item
          name="Precios"
          active={this.props.location.pathname === '/prices'}
          onClick={() => this.props.history.push('/prices')}
        />
        <Menu.Item className="navbar-search-container" position="right">
          <Input inverted icon="search" placeholder="Search..." className="navbar-search" />
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
