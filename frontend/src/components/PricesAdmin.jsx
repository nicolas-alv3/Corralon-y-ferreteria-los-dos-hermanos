import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import NavBar from './NavBar';
import PriceChanger from './PriceChanger';

export default function Products() {
  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ width: '60%', display: 'inline-block', marginBottom: '0' }}>
          Administración de precios
        </Header>
        <hr />
        <PriceChanger />
      </Container>
    </div>
  );
}
