import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import NavBar from './NavBar';
import PriceChanger from './PriceChanger';

export default function Products() {
  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1">
          Administración de precios
        </Header>
        <hr />
        <PriceChanger />
      </Container>
    </div>
  );
}
