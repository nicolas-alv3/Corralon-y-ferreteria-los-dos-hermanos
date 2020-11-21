import React from 'react';
import { withRouter } from 'react-router';
import {
  Button, Label, Form, Segment, Icon, List,
} from 'semantic-ui-react';
import API from '../service/api.js';
import Category from '../objects/Category.js';
import { parsePesos } from '../utils/utils.js';

const colorFor = (b) => {
  if (b) return 'blue';
  return 'grey';
};

const calculateChangeOfPrice = (price, porcentage, aumentar) => {
  if (aumentar) return Math.floor(price + ((porcentage / 100) * price));
  return Math.floor(price - ((porcentage / 100) * price));
};

function ItemCard(props) {
  return (
    <div>
      <em style={{ fontSize: '1.3em', marginLeft: '20px' }}>{props.product.description}</em><Icon name="angle right" />
      <span style={{ color: 'gray' }}>{props.product.price}</span><Icon name="angle right" />
      <span style={{ color: 'green' }}>
        {parsePesos(
          calculateChangeOfPrice(props.product.price,
            props.porcentage, props.aumentar)
            .toString(),
        )}
      </span>
    </div>
  );
}

function ChangeByCategory(props) {
  const [aumentar, setAumentar] = React.useState(true);
  const [porcentage, setPorcentage] = React.useState(10);
  const [category, setCategory] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const mapProducts = () => products.map((p) => (
    <List.Item key={p.barcode} inline>
      <ItemCard product={p} porcentage={porcentage} aumentar={aumentar} />
    </List.Item>
  ));
  const formDisabled = porcentage <= 0 || porcentage >= 100;
  const handleChangeCategory = (cat) => {
    setCategory(cat);
    API.get(`/product/byCategory/${cat}`)
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));
  };

  const done = () => {
    props.successFeedback(`Perfecto, se han cambiado ${products.length} precios`);
    setTimeout(() => {
      props.history.push('/products');
    }, 2000);
  };
  const changePrice = () => {
    const body = {
      ids: [],
      category,
      porcentage,
    };
    API.post('/priceChanger/increase/category', body)
      .then(() => done())
      .catch((e) => props.errorFeedback(e.response.data));
  };
  if (props.visible) {
    return (
      <div>
        <Segment>
          <Form>
            <Form.Group widths="equal" inline>
              <Form.Select
                label="Seleccione la categoría: "
                options={new Category().getAllForSelector()}
                placeholder="Categoria"
                onChange={(e, selected) => handleChangeCategory(selected.value)}
              />
              <Form.Input
                type="number"
                label="Porcentaje:"
                labelPosition="right"
                placeholder="Porcentaje"
                error={formDisabled}
                onChange={(e) => setPorcentage(e.target.value)}
              ><input /><Label>%</Label>
              </Form.Input>
              <Form.Field>
                <label>Elija una de las dos</label>
                <Button.Group>
                  <Button
                    color={colorFor(aumentar)}
                    onClick={() => setAumentar(true)}
                    style={{ boxShadow: `${aumentar ? '-3px 3px 1px lightgray' : ''}` }}
                  >
                    Aumentar
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
          <p> {products.length ? '' : `No hay productos de la categoria ${category}`}</p>
        </Segment>
        <div style={{ display: 'block', margin: 'auto', width: '200px' }}>
          <Button size="big" color="green" onClick={() => changePrice()} disabled={formDisabled}>Finalizar</Button>
        </div>
      </div>
    );
  }
  return <div />;
}
export default withRouter(ChangeByCategory);
