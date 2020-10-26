import React from 'react';
import {
  Button, Container, Header, Message,
} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductsTable from './ProductsTable';
import AddProductModal from './AddProductModal';

export default function Products() {
  const [feedback, setFeedback] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [content, setContent] = React.useState('Todo salio bien');
  const [refresh, setRefresh] = React.useState(false);
  const successFeedback = (message) => {
    setContent(message);
    setRefresh(!refresh);
    setError(error);
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
  };
  const errorFeedback = (message) => {
    setContent(message);
    setFeedback(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Header as="h1" style={{ width: '60%', display: 'inline-block' }}>
          Productos
        </Header>
        <AddProductModal errorFeedback={errorFeedback} successFeedback={successFeedback} button={<Button circular icon="add" size="big" color="blue" style={{ float: 'right' }} />} />
        <hr />
        <ProductsTable
          key={refresh}
          errorFeedback={errorFeedback}
          successFeedback={successFeedback}
        />

        <Message
          icon="check"
          header="¡Perfecto!"
          content={content}
          size="big"
          style={{
            position: 'absolute', left: '50px', bottom: '50px', width: '40%',
          }}
          hidden={!feedback}
          positive
        />
        <Message
          icon="ban"
          header="Hmm... Algo salió mal."
          content={content}
          size="big"
          style={{
            position: 'absolute', left: '50px', bottom: '50px', width: '40%',
          }}
          hidden={!error}
          negative
        />
      </Container>
    </div>
  );
}
