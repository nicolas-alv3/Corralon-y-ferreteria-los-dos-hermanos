/* eslint-disable radix */
import React from 'react';
import {
  Button, Form, Modal, Label,
} from 'semantic-ui-react';
import Category from '../objects/Category';
import API from '../service/api';

export default function ProductModal(props) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState(props.add ? '' : props.product.description);
  const [barcode, setBarcode] = React.useState(props.add ? '' : props.product.barcode);
  const [price, setPrice] = React.useState(props.add ? '' : props.product.price);
  const [stock, setStock] = React.useState(props.add ? 0 : props.product.stock);
  const [category, setCategory] = React.useState(props.add ? '' : props.product.category);

  const done = () => {
    setOpen(false);
    setBarcode('');
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
        barcode: barcode? barcode : -1,
        category,
        price: parseFloat(price.toString().replace(',', '.')),
        stock,
      };
      API.post('/product', body)
        .then((res) => done(res))
        .catch((e) => error(e));
    } else {
      const body = {
        id: props.product.id,
        description,
        barcode: barcode? barcode : -1,
        category,
        price,
        stock,
      };
      API.put('/product', body)
        .then((res) => done(res))
        .catch((e) => error(e));
    }
  };

  const formEnabled = category !== '' && stock >= 0 && category && price > 0 && description.length > 4;
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
              <Form.Input
                fluid
                label="Descripción"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={description.length <= 4 && description !== ''}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                disabled={!props.add}
                type="number"
                label="Codigo de barras"
                placeholder="Codigo de barras"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                error={!(barcode === '' || barcode.length === 13)}
              />
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
                type="number"
                onChange={(e) => setStock(e.target.value)}
                labelPosition="right"
              >
                <input />
                <Label>unidades.</Label>
              </Form.Input>
              <Form.Select
                label="Categoria"
                options={new Category().getAllForSelector()}
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
