import React from 'react';
import {
  Button, Container, Header,
} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductsTable from './ProductsTable';
import AddProductModal from './ProductModal';
import WithFeedback from './Feedback';

function Products(props) {
  const [refresh, setRefresh] = React.useState(false);

  const successFeedback = (message) => {
    setRefresh(!refresh);
    props.successFeedback(message);
  };
  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ width: '60%', display: 'inline-block' }}>
          Productos
        </Header>
        <AddProductModal
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
          add
          button={<Button circular icon="add" size="big" color="blue" style={{ float: 'right' }} />}
        />
        <hr />
        <ProductsTable
          key={refresh}
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
        />
      </Container>
      {props.renderError}
      {props.renderSuccess}
    </div>
  );
}

export default WithFeedback(Products);
