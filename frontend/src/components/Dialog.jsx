import React from 'react';
import {
  Button, Modal,
} from 'semantic-ui-react';

function Dialog(props) {
  const [open, setOpen] = React.useState(false);

  const close = () => {
    setOpen(false);
    props.callback();
  };

  return (
    <Modal
      open={open}
      trigger={props.button}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="small"
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>
        <p>{props.message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>
          Cancelar
        </Button>
        <Button onClick={close} positive>
          Confirmar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default Dialog;
