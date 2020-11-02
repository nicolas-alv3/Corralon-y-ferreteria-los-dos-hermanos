import React from 'react';
import {
  Icon, Table, Pagination, Segment, Header, Button,
} from 'semantic-ui-react';
import Dialog from './Dialog';
import FerreteriaIcon from '../icons/ferreteria.png';
import PintureriaIcon from '../icons/pintureria.png';
import ElectricidadIcon from '../icons/electricidad.png';
import SanitariosIcon from '../icons/sanitarios.png';
import OthersIcon from '../icons/question.png';
import BuloneraIcon from '../icons/bulonera.png';
import API from '../service/api';
import EditProductModal from './ProductModal';
import { parsePesos } from '../utils/utils.js';
import '../style/Pagination.css';
import WithFeedback from './Feedback';

class ProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    API.get(`/product/all/${this.state.currentPage}`)
      .then((res) => this.setState({ products: res.content, totalPages: res.totalPages }))
      .catch((e) => console.log(e));
  }

  componentDidUpdate(_, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      API.get(`/product/all/${this.state.currentPage}`)
        .then((res) => this.setState({ products: res.content, totalPages: res.totalPages }))
        .catch((e) => console.log(e));
    }
  }

  getIconFor(product) {
    switch (product.category) {
      case 'FERRETERIA':
        return <img src={FerreteriaIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
      case 'PINTURERIA':
        return <img src={PintureriaIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
      case 'ELECTRICIDAD':
        return <img src={ElectricidadIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
      case 'BULONERA':
        return <img src={BuloneraIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
      case 'VARIOS':
        return <img src={OthersIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
      case 'SANITARIOS':
        return <img src={SanitariosIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
      default: return <div />;
    }
  }

  handlePaginationChange(e, page) {
    this.setState({ currentPage: page.activePage });
  }

  delete(product) {
    API.post(`/product/delete/${product.id}`)
      .then(() => this.props.successFeedback(`Se ha eliminado ${product.description} exitosamente`))
      .catch((e) => this.props.errorFeedback(e.response.data));
    this.componentDidMount();
  }

  maprows() {
    return this.state.products.map(
      (p) => (
        <Table.Row>
          <Table.Cell collapsing>
            {p.barcode}
          </Table.Cell>
          <Table.Cell>{p.description}</Table.Cell>
          <Table.Cell collapsing>
            {this.getIconFor(p)}
            <span style={{ marginLeft: '20px' }}>{p.category}</span>
          </Table.Cell>
          <Table.Cell collapsing>{p.stock}u.</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {parsePesos(p.price.toString())}
          </Table.Cell>
          <Table.Cell collapsing>
            <EditProductModal
              add={false}
              errorFeedback={this.props.errorFeedback}
              successFeedback={this.props.successFeedback}
              product={p}
              button={<Button><Icon name="edit" color="blue" size="large" style={{ margin: '0 5px' }} /></Button>}
            />
            <Dialog
              title="¿Estas seguro?"
              message={`Borraremos ${p.description} de forma permanente...`}
              callback={() => this.delete(p)}
              product={p}
              button={<Button><Icon name="delete" color="red" size="large" style={{ margin: '0 5px' }} /></Button>}
            />
          </Table.Cell>
        </Table.Row>
      ),
    );
  }

  renderTableOrFeedback() {
    if (this.state.products.length > 0) {
      return (
        <Table celled striped>
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
            {this.maprows()}
          </Table.Body>
        </Table>
      );
    }

    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="clipboard list" />
          Aún no tienes productos. ¿Comenzamos?
        </Header>
      </Segment>
    );
  }

  render() {
    return (
      (
        <div>
          {this.renderTableOrFeedback()}
          <div className="pagination-container">
            <Pagination
              defaultActivePage={this.state.currentPage}
              firstItem={null}
              onPageChange={(e, page) => this.handlePaginationChange(e, page)}
              lastItem={null}
              pointing
              secondary
              totalPages={this.state.totalPages}
            />
          </div>
        </div>
      )

    );
  }
}
export default WithFeedback(ProductsTable);
