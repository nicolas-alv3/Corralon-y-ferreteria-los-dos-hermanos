import React, { useEffect } from 'react';
import {
  Button, Container, Header, Pagination,
} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductsTable from './ProductsTable';
import AddProductModal from './ProductModal';
import WithFeedback from './Feedback';
import API from '../service/api';

function Products(props) {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  useEffect(() => {
    API.get(`/product/all/${page}`)
      .then((res) => {
        setProducts(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((e) => console.log(e));
  }, [products, totalPages, page]);

  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ width: '60%', display: 'inline-block' }}>
          Productos
        </Header>
        <AddProductModal
          successFeedback={props.successFeedback}
          errorFeedback={props.errorFeedback}
          add
          button={<Button circular icon="add" size="big" color="blue" style={{ float: 'right' }} />}
        />
        <hr />
        <ProductsTable
          products={products}
          successFeedback={props.successFeedback}
          errorFeedback={props.errorFeedback}
        />
        <div className="pagination-container">
          <Pagination
            defaultActivePage={page}
            firstItem={null}
            onPageChange={(e, pages) => setPage(pages.activePage)}
            lastItem={null}
            pointing
            secondary
            totalPages={totalPages}
          />
        </div>
      </Container>
      {props.renderError}
      {props.renderSuccess}
    </div>
  );
}

export default WithFeedback(Products);
