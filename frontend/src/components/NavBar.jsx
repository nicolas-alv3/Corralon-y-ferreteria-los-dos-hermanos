import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import '../style/NavBar.css';
import { withRouter } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter(event);
    }
  }

  handleSearchValue(e) {
    this.setState({ searchValue: e.target.value });
  }

  handleEnter() {
    if (document.activeElement.id === 'navbar-search') {
      this.props.history.push({ pathname: '/search', state: { searchValue: this.state.searchValue } });
    }
  }

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
          <Input id="navbar-search" inverted value={this.searchValue} onChange={(e) => this.handleSearchValue(e)} icon="search" placeholder="Search..." className="navbar-search" />
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
