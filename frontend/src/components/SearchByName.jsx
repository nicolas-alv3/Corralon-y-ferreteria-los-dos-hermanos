import React from 'react';
import { Search } from 'semantic-ui-react';
import { parsePesos } from '../utils/utils.js';

const adapt = (ls) => ls.map((e) => ({
  key: e.id,
  title: e.description,
  price: parsePesos(e.price.toString()),
  stock: e.stock,
  category: e.category,
}));

export default class SearchByName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: adapt(props.products),
      value: '',
      loading: false,
    };
  }

  handleSearchChange(e) {
    if (e) {
      this.setState({
        value: e.target.value,
        products: adapt(
          this.props.products.filter(
            (el) => el.description.toLowerCase().includes(e.target.value)
            || el.id.toString().includes(e.target.value)
            || el.barcode.toString().includes(e.target.value)
            || e.target.value.includes(el.barcode.toString()),
          ),
        ),
      });
    }
  }

  selectAndUpdate(data) {
    this.props.onSelect(data);
    this.setState({ value: '' });
  }

  render() {
    return (
      <Search
        id="sell-search-ref"
        placeholder="Busque un producto"
        selectFirstResult
        autoFocus
        loading={this.state.loading}
        onResultSelect={(e, data) => this.selectAndUpdate(data)}
        noResultsMessage="Hmm... pueba con otra busqueda:)"
        onSearchChange={(e) => this.handleSearchChange(e)}
        results={this.state.products}
        value={this.state.value}
      />
    );
  }
}
