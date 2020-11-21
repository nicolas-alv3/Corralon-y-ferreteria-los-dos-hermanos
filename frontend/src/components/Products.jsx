import React, { useEffect, useState } from 'react';
import {
  Button, Container, Header, Pagination,
} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductsTable from './ProductsTable';
import StockModal from './StockModal';
import AddProductModal from './ProductModal';
import WithFeedback from './Feedback';
import API from '../service/api';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    API.get(`/product/all/${page}`)
      .then((res) => {
        setProducts(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((e) => console.log(e));
  }, [page, products.length, refresh]);

  const successFeedback = (message) => {
    setRefresh(!refresh);
    props.successFeedback(message);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ display: 'inline-block', marginBottom: '0' }}>
          Productos
        </Header>
        <AddProductModal
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
          add
          button={<Button circular icon="add" size="huge" color="blue" style={{ float: 'right',marginLeft:"20px" }} />}
        />
        <StockModal
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
        />
        <hr />
        <ProductsTable
          products={products}
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
          isEmptyMessage="Aún no tienes productos. ¿Comenzamos?"
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
