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
  const formDisabled = porcentage <= 0 || porcentage >= 100;
  const addProduct = (p) => {
    if (!products.some((e) => e.key === p.key)) setProducts(products.concat([p]));
  };

  const done = (res) => {
    props.successFeedback(`Se han cambiado ${res.length} precios`);
    setTimeout(() => {
      props.history.push('/products');
    }, 2000);
  };

  const postChange = () => {
    const increaseOrDecrease = aumentar ? 'increase' : 'decrease';
    const idList = products.map((p) => p.key);
    const body = {
      ids: idList,
      porcentage,
      category: 'FERRETERIA',
    };
    API.post(`/priceChanger/${increaseOrDecrease}/all`, body)
      .then((res) => done(res))
      .catch((e) => console.log(e.response.data));
  };

  if (props.visible) {
    return (
      <div>
        <Segment>
          <Form>
            <Form.Group widths="equal" inline>
              <Form.Input>
                <label>Agrege productos</label>
                <SearchByName products={props.products} onSelect={(e) => addProduct(e.result)} />
              </Form.Input>
              <Form.Input error={formDisabled} label="Porcentaje:" type="number" labelPosition="right" placeholder="Porcentaje" value={porcentage} onChange={(e) => setPorcentage(e.target.value)}><input /><Label>%</Label></Form.Input>
              <Form.Field>
                <label>Elija una de las dos</label>
                <Button.Group>
                  <Button
                    color={colorFor(aumentar)}
                    onClick={() => setAumentar(true)}
                    style={{ boxShadow: `${aumentar ? '-3px 3px 1px lightgray' : ''}` }}
                  >Aumentar
                  </Button>
                  <Button.Or text="O">O</Button.Or>
                  <Button
                    color={colorFor(!aumentar)}
                    onClick={() => setAumentar(false)}
                    style={{ boxShadow: `${!aumentar ? '3px 3px 1px lightgray' : ''}` }}
                  >Disminuir
                  </Button>
                </Button.Group>
              </Form.Field>
            </Form.Group>
          </Form>
          <List>
            {mapProducts()}
          </List>
        </Segment>
        <div style={{ display: 'block', margin: 'auto', width: '200px' }}>
          <Button size="big" color="green" onClick={postChange} disabled={formDisabled}>Finalizar</Button>
        </div>
      </div>
    );
  }
  return <div />;
}
export default withRouter(ChangeByProduct);
