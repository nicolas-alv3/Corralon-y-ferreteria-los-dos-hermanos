import React from 'react';
import {
  Icon, Table, Segment, Header, Button,
} from 'semantic-ui-react';
import Dialog from './Dialog';
import API from '../service/api';
import ProductModal from './ProductModal';
import { parsePesos } from '../utils/utils.js';
import Category from '../objects/Category.js';
import '../style/Pagination.css';
import WithFeedback from './Feedback';

function ProductsTable(props) {
  const deleteProduct = (product) => {
    API.post(`/product/delete/${product.id}`)
      .then(() => props.successFeedback(`Se ha eliminado ${product.description} exitosamente`))
      .catch((e) => props.errorFeedback(e.response.data));
  };

  const maprows = () => props.products.map(
    (p) => (
      <Table.Row key={p.id.toString() + p.description + p.stock.toString() + p.price.toString() + p.category}>
        <Table.Cell collapsing>
          {p.barcode > 0 ? p.barcode : p.id}
        </Table.Cell>
        <Table.Cell>{p.description}</Table.Cell>
        <Table.Cell collapsing>
          {new Category(p.category).getIcon()}
          <span style={{ marginLeft: '20px' }}>{p.category}</span>
        </Table.Cell>
        <Table.Cell collapsing>{p.stock}u.</Table.Cell>
        <Table.Cell collapsing textAlign="right">
          {parsePesos(p.price.toString())}
        </Table.Cell>
        <Table.Cell collapsing>
          <ProductModal
            add={false}
            errorFeedback={props.errorFeedback}
            successFeedback={props.successFeedback}
            product={p}
            button={<Button icon="edit" color="blue" size="big" inverted />}
          />
          <Dialog
            title="¿Estas seguro?"
            message={`Borraremos ${p.description} de forma permanente...`}
            callback={() => deleteProduct(p)}
            button={<Button icon="delete" color="red" size="big" inverted />}
          />
        </Table.Cell>
      </Table.Row>
    ),
  );

  const renderTableOrFeedback = () => {
    if (props.products.length > 0) {
      return (
        <Table celled striped style={{ marginTop: '30px' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Código</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Categoría</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
              <Table.HeaderCell> </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {maprows()}
          </Table.Body>
        </Table>
      );
    }

    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="clipboard list" />
          {props.isEmptyMessage}
        </Header>
        <ProductModal
          successFeedback={props.successFeedback}
          errorFeedback={props.errorFeedback}
          add
          button={<Button icon="add" size="big" color="blue" style={{ padding: '10px 20px' }}>Agregar</Button>}
        />
      </Segment>
    );
  };
  return (
    (
      <div>
        {renderTableOrFeedback()}
      </div>
    )

  );
}
export default WithFeedback(ProductsTable);
