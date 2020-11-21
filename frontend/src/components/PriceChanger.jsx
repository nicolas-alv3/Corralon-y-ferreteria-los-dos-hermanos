/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  Menu,
} from 'semantic-ui-react';
import ChangeByProduct from './ChangePriceByProduct';
import ChangeByCategory from './ChangePriceByCategory';
import API from '../service/api';
import WithFeedback from './Feedback';

function PriceChanger(props) {
  const [activeItem, setActive] = React.useState('product');
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    API.get('/product/all')
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="Por producto"
          active={activeItem === 'product'}
          onClick={() => setActive('product')}
        />
        <Menu.Item
          name="Por categoría"
          active={activeItem === 'category'}
          onClick={() => setActive('category')}
        />
      </Menu>
      <ChangeByCategory successFeedback={props.successFeedback} errorFeedback={props.errorFeedback} products={products} visible={activeItem === 'category'} />
      <ChangeByProduct successFeedback={props.successFeedback} errorFeedback={props.errorFeedback} products={products} visible={activeItem === 'product'} />
      {props.renderError}
      {props.renderSuccess}
    </div>
  );
}

export default WithFeedback(PriceChanger);
