/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  Form, Label, Button, Menu, Segment, List, Icon,
} from 'semantic-ui-react';
import SearchByName from './SearchByName';
import API from '../service/api';
import { parsePesos, unparsePesos } from '../utils/utils.js';

const options = [
  { key: 'b', text: 'Bulonera', value: 'BULONERA' },
  { key: 's', text: 'Sanitarios', value: 'SANITARIOS' },
  { key: 'e', text: 'Electricidad', value: 'ELECTRICIDAD' },
  { key: 'f', text: 'Ferreteria', value: 'FERRETERIA' },
  { key: 'p', text: 'Pintureria', value: 'PINTURERIA' },
  { key: 'v', text: 'Varios', value: 'VARIOS' },
];

const colorFor = (b) => {
  if (b) return 'blue';
  return 'grey';
};

const calculateChangeOfPrice = (price, porcentage, aumentar) => {
  if (aumentar) return Math.floor(price + ((porcentage / 100) * price));
  return Math.floor(price - ((porcentage / 100) * price));
};

/// ///////////////////////// ChangeByProduct /////////////////////////////////////////

function ItemCard(props) {
  return (
    <div>
      <em style={{ fontSize: '1.3em', marginLeft: '20px' }}>{props.product.title}</em><Icon name="angle right" />
      <span style={{ color: 'gray' }}>{props.product.price}</span><Icon name="angle right" />
      <span style={{ color: 'green' }}>
        {parsePesos(
          calculateChangeOfPrice(
            parseFloat(
              unparsePesos(props.product.price),
            ), props.porcentage, props.aumentar,
          ).toString(),
        )}
      </span>
    </div>
  );
}

function ChangeByProduct(props) {
  const [aumentar, setAumentar] = React.useState(true);
  const [porcentage, setPorcentage] = React.useState(10);
  const [products, setProducts] = React.useState([]);

  const mapProducts = () => products.map((p) => (
    <List.Item key={p.key} inline>
      <ItemCard product={p} porcentage={porcentage} aumentar={aumentar} />
    </List.Item>
  ));

  const addProduct = (p) => {
    if (!products.some((e) => e.key === p.key)) setProducts(products.concat([p]));
  };
  if (props.visible) {
    return (
      <Segment>
        <Form>
          <Form.Group widths="equal" inline>
            <Form.Input>
              <SearchByName products={props.products} onSelect={(e) => addProduct(e.result)} />
            </Form.Input>
            <Form.Input type="number" labelPosition="right" placeholder="Porcentaje" value={porcentage} onChange={(e) => setPorcentage(e.target.value)}><input /><Label>%</Label></Form.Input>
            <Button.Group>
              <Button color={colorFor(aumentar)} onClick={() => setAumentar(true)}>Aumentar</Button>
              <Button.Or text="O">O</Button.Or>
              <Button
                color={colorFor(!aumentar)}
                onClick={() => setAumentar(false)}
              >Disminuir
              </Button>
            </Button.Group>
          </Form.Group>
        </Form>
        <List>
          {mapProducts()}
        </List>
      </Segment>
    );
  }
  return <div />;
}

/// ////////////////////////////////// ChangeByCategory /////////////////////////////////////////

function ChangeByCategory(props) {
  const [aumentar, setAumentar] = React.useState(true);
  if (props.visible) {
    return (
      <Segment>
        <Form>
          <Form.Group widths="equal" inline>
            <Form.Select
              label="Seleccione la categoría: "
              options={options}
              placeholder="Categoria"
            />
            <Form.Input type="number" labelPosition="right" placeholder="Porcentaje"><input /><Label>%</Label></Form.Input>
            <Button.Group>
              <Button color={colorFor(aumentar)} onClick={() => setAumentar(true)}>Aumentar</Button>
              <Button.Or text="O">O</Button.Or>
              <Button
                color={colorFor(!aumentar)}
                onClick={() => setAumentar(false)}
              >Disminuir
              </Button>
            </Button.Group>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
  return <div />;
}

/// //////////////////////////////////////// Price Changer /////////////////////////////////////////

export default function PriceChanger() {
  const [activeItem, setActive] = React.useState('product');
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    API.get('/product/all')
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));
  });

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
      <ChangeByCategory products={products} visible={activeItem === 'category'} />
      <ChangeByProduct products={products} visible={activeItem === 'product'} />
      <div style={{ display: 'block', margin: 'auto', width: '200px' }}>
        <Button size="big" color="green">Finalizar</Button>
      </div>
    </div>
  );
}
