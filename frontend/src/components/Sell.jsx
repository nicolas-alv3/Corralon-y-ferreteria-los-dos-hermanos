/* eslint-disable radix */
import React, { useEffect, useRef } from 'react';
import '../style/Home.css';
import {
  Container, Form, Header, List, Label, Segment, Button, Grid, Icon, Popup,
} from 'semantic-ui-react';
import NavBar from './NavBar';
import SearchByName from './SearchByName';
import API from '../service/api';
import { unparsePesos, parsePesos } from '../utils/utils';
import WithFeedback from './Feedback';

function Sell(props) {
  const [products, setProducts] = React.useState([]);
  const [current, setCurrent] = React.useState({ title: 'Producto', price: '$0' });
  const [selected, setSelected] = React.useState([]);
  const [amount, setAmount] = React.useState(1);
  const amountInput = useRef(null);
  const searchInput = useRef(null);

  const postSale = () => {
    const body = selected.map((s) => ({ id: s.id, amount: s.amount }));
    API.post('/product/sale', body)
      .then(() => {
        props.successFeedback('Se ha vendido correctamente');
        setTimeout(() => {
          props.history.push('/products');
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  const handleShiftEnter = (e) => {
    if (e.code === 'NumpadEnter') {
      postSale();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShiftEnter);
    API.get('/product/all')
      .then((res) => {
        setProducts(res);
      })
      .catch((e) => console.log(e));
    return () => window.removeEventListener('keydown', handleShiftEnter);
  }, [products.length, handleShiftEnter]);

  const mapRows = () => selected.map((p) => (
    <List.Item>
      <List.Content>
        <Grid columns={5}>
          <Grid.Row>
            <Grid.Column>
              <List.Header>{p.description}</List.Header>
            </Grid.Column>
            <Grid.Column>
              {p.amount} {p.category === 'CERAMICA' ? 'm2' : 'Unidad/es'}
            </Grid.Column>
            <Grid.Column>
              {p.unitPrice} c/u.
            </Grid.Column>
            <Grid.Column>
              {parsePesos(p.subtotal.toString())}
            </Grid.Column>
            <Grid.Column>
              <Icon circular name="trash alternate outline" color="red" onClick={() => setSelected(selected.filter((s) => s.id !== p.id))} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Content>
    </List.Item>
  ));

  const addItem = () => {
    if ((!selected.some((e) => e.id === current.key) && current.title !== 'Producto' && amount)) {
      if (current.stock < amount) {
        props.errorFeedback('No tienes suficiente stock para vender');
      } else if (current.category !== 'CERAMICA' && amount - parseInt(amount) > 0) {
        props.errorFeedback('No puedes vender este producto con cantidad decimal');
      } else {
        setSelected(selected.concat([{
          id: current.key,
          description: current.title,
          amount,
          unitPrice: current.price,
          category : current.category,
          subtotal: Math.floor(unparsePesos(current.price) * amount),
        }]));
        setAmount(1);
        document.getElementById('sell-search-ref').focus();
      }
    }
  };

  const updateCurrent = (e) => {
    setCurrent(e.result);
    amountInput.current.select();
  };
  const renderForm = () => (
    <Segment size="large">
      <Form>
        <Form.Group inline>
          <Form.Input>
            <SearchByName ref={searchInput} products={products} onSelect={updateCurrent} />
          </Form.Input>
          <Form.Input
            type="number"
            width={5}
            labelPosition="right"
            placeholder="Cantidad a vender"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={amount <= 0 || amount > current.stock}
          ><input ref={amountInput} /><Label>{current.category === 'CERAMICA' ? 'm2' : 'unidades'}</Label>
          </Form.Input>
          <Form.Field width={10}>
            <Segment color="orange">
              <Label size="big" color="olive">
                {current.title}
                <Label.Detail>{current.stock} u.</Label.Detail>
              </Label>
              <Label tag color="teal">${Math.floor(unparsePesos(current.price) * amount)}</Label>
            </Segment>
          </Form.Field>
          <Form.Field
            control={Button}
            content="Agregar"
            color="green"
            basic
            onClick={() => addItem()}
          />
          <Form.Field width="1">
            <Popup
              trigger={<Icon color="blue" circular name="info" />}
              content="Puedes enviar los formularios presionando ENTER"
              basic
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ width: '60%', display: 'inline-block', marginBottom: '0' }}>
          Vender
        </Header>
        <hr />
        {renderForm()}
        <Segment color="blue" style={{ margin: '0 15%' }} textAlign="center">
          {!selected.length
            ? (
              <Header as="h3">
                Busca productos y agrégalos para venderlos
              </Header>
            ) : <div />}
          <List divided relaxed>
            {mapRows()}
          </List>
          {selected.length
            ? <Header as="h2" content={`Total:${parsePesos(selected.reduce((ac, s) => s.subtotal + ac, 0).toString())}`} />
            : <div />}
        </Segment>
        <div style={{ display: 'block', margin: '30px auto', width: '200px' }}>
          <Button disabled={!selected.length} color="green" size="huge" onClick={postSale}>Finalizar</Button>
        </div>
      </Container>
      {props.renderError}
      {props.renderSuccess}
    </div>
  );
}

export default WithFeedback(Sell);
