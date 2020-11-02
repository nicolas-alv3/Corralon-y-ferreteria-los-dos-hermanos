/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  Menu, Message,
} from 'semantic-ui-react';
import ChangeByProduct from './ChangePriceByProduct';
import ChangeByCategory from './ChangePriceByCategory';
import API from '../service/api';

/// ////////////////////////////////// ChangeByCategory /////////////////////////////////////////

/// //////////////////////////////////////// Price Changer /////////////////////////////////////////

export default function PriceChanger() {
  const [activeItem, setActive] = React.useState('product');
  const [products, setProducts] = React.useState([]);
  const [feedback, setFeedback] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [content, setContent] = React.useState('Todo salio bien');
  const [refresh, setRefresh] = React.useState(false);
  const successFeedback = (message) => {
    setContent(message);
    setRefresh(!refresh);
    setError(error);
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
  };
  const errorFeedback = (message) => {
    setContent(message);
    setFeedback(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

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
      <ChangeByCategory successFeedback={successFeedback} errorFeedback={errorFeedback} products={products} visible={activeItem === 'category'} />
      <ChangeByProduct successFeedback={successFeedback} errorFeedback={errorFeedback} products={products} visible={activeItem === 'product'} />
      <Message
        icon="check"
        header="¡Perfecto!"
        content={content}
        size="big"
        style={{
          position: 'absolute', left: '50px', bottom: '50px', width: '40%',
        }}
        hidden={!feedback}
        positive
      />
      <Message
        icon="ban"
        header="Hmm... Algo salió mal."
        content={content}
        size="big"
        style={{
          position: 'absolute', left: '50px', bottom: '50px', width: '40%',
        }}
        hidden={!error}
        negative
      />
    </div>
  );
}
