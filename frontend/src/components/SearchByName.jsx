import React from 'react';
import { Search } from 'semantic-ui-react';
import { parsePesos } from '../utils/utils.js';

const adapt = (ls) => ls.map((e) => ({
  key: e.id,
  title: e.description,
  price: parsePesos(e.price.toString()),
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
          (el) => el.description.toLowerCase().includes(e.target.value),
        ),
      ));
    }
  };

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => props.onSelect(data)}
      noResultsMessage="Hmm... pueba con otra busqueda:)"
      onSearchChange={handleSearchChange}
      results={products}
      value={value}
    />
  );
}
