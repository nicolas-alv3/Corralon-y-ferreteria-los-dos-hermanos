import React, { useEffect } from 'react';
import '../style/Home.css';
import { Container, Header, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import API from '../service/api';

export default function Search(props) {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    API.get(`/search/${props.location.state.searchValue}/${page}`)
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));
  }, [products, page]);

  const mapResults = () => (
    <List>
      <List.Item>asdasd</List.Item>
    </List>
  );
  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1">Resultado de busqueda</Header>
        <hr />
        {mapResults()}
      </Container>
    </div>
  );
}
