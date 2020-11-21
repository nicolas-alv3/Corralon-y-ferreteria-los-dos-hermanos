import React from 'react';
import { Search } from 'semantic-ui-react';
import { parsePesos } from '../utils/utils.js';

const adapt = (ls) => ls.map((e) => ({
  key: e.id,
  title: e.description,
  price: parsePesos(e.price.toString()),
  stock: e.stock,
}));

export default function SearchByName(props) {
  const [loading] = React.useState(false);
  const [products, setProducts] = React.useState(adapt(props.products));
  const [value, setValue] = React.useState('');

  const handleSearchChange = (e) => {
    if (e) {
      setValue(e.target.value);
      setProducts(adapt(
        props.products.filter(
          (el) => el.description.toLowerCase().includes(e.target.value)
          || el.id.toString().includes(e.target.value)
          || el.barcode.toString().includes(e.target.value),
        ),
      ));
    }
  };

  return (
    <Search
      placeholder="Busque un producto"
      loading={loading}
      onResultSelect={(e, data) => props.onSelect(data)}
      noResultsMessage="Hmm... pueba con otra busqueda:)"
      onSearchChange={handleSearchChange}
      results={products}
      value={value}
    />
  );
}
