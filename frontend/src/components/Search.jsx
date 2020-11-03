import React, { useEffect } from 'react';
import '../style/Home.css';
import { Container, Header, Pagination } from 'semantic-ui-react';
import NavBar from './NavBar';
import API from '../service/api';
import ProductsTable from './ProductsTable';
import WithFeedback from './Feedback';

function Search(props) {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  useEffect(() => {
    API.get(`/search/${props.location.state.searchValue}/${page}`)
      .then((res) => {
        setProducts(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((e) => console.log(e));
  }, [page, props.location.state.searchValue, products.length]);

  const successFeedback = (message) => {
    setProducts([]);
    props.successFeedback(message);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1">Resultado de la búsqueda {`"${props.location.state.searchValue}"`}</Header>
        <hr />
        <ProductsTable
          products={products}
          successFeedback={successFeedback}
          errorFeedback={props.errorFeedback}
          isEmptyMessage="No se ha encontrado resultado para su busqueda. ¿Quieres agregar alguno?"
        />
      </Container>
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
      {props.renderError}
      {props.renderSuccess}
    </div>
  );
}

export default WithFeedback(Search);
