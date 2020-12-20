import React from 'react';
import { Button, Container, Header, Label } from 'semantic-ui-react';
import API from '../service/api';

export default function Admin() {
  const [success, setSuccess] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const makeBackup = () => {
    if (password === 'root') {
      API.post('/backup')
        .then(() => setSuccess(true))
        .catch(() => setSuccess(false));
    }
  };

  const restoreFromBackup = () => {
    if (password === 'root') {
      API.post('/restore')
        .then(() => setSuccess(true))
        .catch(() => setSuccess(false));
    }
  };
  return (
    <div>
      <Container>
        <Header as="h1" size="huge">Administración</Header>
        <hr />
        <input placeholder="Contraseña" type="password" style={{ display: 'block', margin: '20px' }} onChange={handlePasswordChange} />
        {success ? <Label visible={false} color="green">Operacion exitosa</Label> : <div />}
        <Button primary onClick={makeBackup}>Hacer backup</Button>
        <Button primary onClick={restoreFromBackup}>Recuperar desde backup</Button>
      </Container>
    </div>
  );
}
