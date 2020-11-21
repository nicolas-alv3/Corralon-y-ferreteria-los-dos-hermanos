import React from 'react';
import {
  Button, Modal, Icon, Form, Label,
} from 'semantic-ui-react';
import API from '../service/api';
import SearchByName from './SearchByName';

export default function (props) {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState({ title: 'Elija un producto', stock: 0 });
  const [products, setProducts] = React.useState([]);
  const [amount, setAmount] = React.useState([]);
  const [add, setAdd] = React.useState(true);

  const postStock = () => {
    const body = {
      id: current.key,
      amount,
      add,
    };
    API.post('/product/stock', body)
      .then(() => { setOpen(false); props.successFeedback('Se ha modificado correctamente el stock'); })
      .catch((e) => { setOpen(false); props.errorFeedback(e.response.data); });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true); API.get('/product/all')
          .then((res) => {
            setProducts(res);
          })
          .catch((e) => console.log(e));
      }}
      open={open}
      size="small"
      dimmer="blurring"
      trigger={(
        <Button icon basic color="violet" labelPosition="left" style={{ float: 'right', right: '40px' }}>
          <Icon name="exchange" />
          Stock
        </Button>
)}
    >
      <Modal.Header>Modificar stock</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Field width={9}>
              <SearchByName products={products} onSelect={(e) => setCurrent(e.result)} />
            </Form.Field>
            <Form.Field width={7}>
              <Label size="big" color="olive">{current.title}</Label>
              <Label color="orange">{current.stock}u.</Label>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={8}
              size="small"
              type="number"
              labelPosition="right"
              placeholder="Cantidad"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={(amount > current.stock) && !add}
            ><input /><Label>u.</Label>
            </Form.Input>
            <Button.Group>
              <Button
                toggle
                active={add}
                onClick={() => setAdd(true)}
              >
                Aumentar
              </Button>
              <Button.Or text="O">O</Button.Or>
              <Button
                toggle
                active={!add}
                onClick={() => setAdd(false)}
              >Disminuir
              </Button>
            </Button.Group>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Modificar"
          labelPosition="right"
          icon="checkmark"
          disabled={amount <= 0 || current.title === 'Elija un producto'}
          onClick={postStock}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
