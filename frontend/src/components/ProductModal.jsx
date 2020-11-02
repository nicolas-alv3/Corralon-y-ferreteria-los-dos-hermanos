import React, { useEffect } from 'react';
import {
  Button, Form, Modal, Label,
} from 'semantic-ui-react';
import API from '../service/api';

const options = [
  { key: 'b', text: 'Bulonera', value: 'BULONERA' },
  { key: 's', text: 'Sanitarios', value: 'SANITARIOS' },
  { key: 'e', text: 'Electricidad', value: 'ELECTRICIDAD' },
  { key: 'f', text: 'Ferreteria', value: 'FERRETERIA' },
  { key: 'p', text: 'Pintureria', value: 'PINTURERIA' },
  { key: 'v', text: 'Varios', value: 'VARIOS' },
];

export default function ProductModal(props) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [barcode, setBarcode] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [category, setCategory] = React.useState();

  useEffect(() => {
    if (!props.add) {
      setDescription(props.product.description);
      setBarcode(props.product.barcode);
      setPrice(props.product.price);
      setStock(props.product.stock);
      setCategory(props.product.category);
    }
  }, [props]);

  const done = () => {
    setOpen(false);
    setBarcode(0);
    setPrice(0);
    setStock(0);
    setDescription('');
    setCategory('');
    if (props.add) {
      props.successFeedback('Se ha agregado el producto correctamente');
    } else {
      props.successFeedback('Se ha actualizado el producto correctamente');
    }
  };

  const error = (e) => {
    setOpen(false);
    props.errorFeedback(e.response.data);
  };

  const postProduct = () => {
    if (props.add) {
      const body = {
        description,
        barcode,
        category,
        price,
        stock,
      };
      API.post('/product', body)
        .then((res) => done(res))
        .catch((e) => error(e));
    } else {
      const body = {
        id: props.product.id,
        description,
        barcode,
        category,
        price,
        stock,
      };
      API.put('/product', body)
        .then((res) => done(res))
        .catch((e) => error(e));
    }
  };

  const formEnabled = category !== '' && barcode > 0 && stock >= 0 && category && price > 0 && description;
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      dimmer="blurring"
      trigger={props.button}
    >
      <Modal.Header>{ props.add ? 'Agregar producto' : 'Editar producto'}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group inline widths="equal">
              <Form.Input fluid label="Descripción" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type="number" label="Codigo de barras" placeholder="Codigo de barras" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
              <Form.Input
                label="Precio"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                labelPosition="left"
                type="number"
              >
                <Label>$</Label>
                <input />
              </Form.Input>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Stock"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                labelPosition="right"
              >
                <input />
                <Label>unidades.</Label>
              </Form.Input>
              <Form.Select
                label="Categoria"
                options={options}
                placeholder="Categoria"
                value={category}
                onChange={(e, selected) => setCategory(selected.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content={props.add ? 'Agregar' : 'Actualizar'}
          labelPosition="right"
          icon="checkmark"
          disabled={!formEnabled}
          onClick={postProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
