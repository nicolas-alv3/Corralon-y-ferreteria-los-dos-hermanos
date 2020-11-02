import React from 'react';
import { withRouter } from 'react-router';
import {
  Button, Label, List, Form, Segment, Icon,
} from 'semantic-ui-react';
import SearchByName from './SearchByName';
import { parsePesos, unparsePesos } from '../utils/utils.js';
import API from '../service/api';

const calculateChangeOfPrice = (price, porcentage, aumentar) => {
  if (aumentar) return Math.floor(price + ((porcentage / 100) * price));
  return Math.floor(price - ((porcentage / 100) * price));
};

const colorFor = (b) => {
  if (b) return 'blue';
  return 'grey';
};

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
  const postChange = () => {
    const increaseOrDecrease = aumentar ? 'increase' : 'decrease';
    const idList = products.map((p) => p.key);
    const body = {
      ids: idList,
      porcentage,
      category: 'FERRETERIA',
    };
    console.log(body);
    API.post(`/priceChanger/${increaseOrDecrease}/all`, body)
      .then((res) => props.successFeedback(`Se han cambiado ${res.length} precios`))
      .catch((e) => console.log(e.response.data));
    setTimeout(() => {
      props.history.push('/products');
    }, 2000);
  };

  if (props.visible) {
    return (
      <div>
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
        <div style={{ display: 'block', margin: 'auto', width: '200px' }}>
          <Button size="big" color="green" onClick={postChange}>Finalizar</Button>
        </div>
      </div>
    );
  }
  return <div />;
}
export default withRouter(ChangeByProduct);
