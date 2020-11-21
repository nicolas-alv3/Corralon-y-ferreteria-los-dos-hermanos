/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import '../style/Home.css';
import { Message } from 'semantic-ui-react';

export default function WithFeedback(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        feedback: false,
        error: false,
        content: 'Todo salio bien',
      };
    }

    render() {
      const successFeedback = (message) => {
        this.setState({
          content: message,
          feedback: true,
          error: false,
        });
        setTimeout(() => {
          this.setState({ feedback: false });
        }, 2000);
      };
      const errorFeedback = (message) => {
        this.setState({
          content: message,
          feedback: false,
          error: true,
        });
        setTimeout(() => {
          this.setState({ error: false });
        }, 2000);
      };
      return (
        <WrappedComponent
          renderSuccess={(
            <Message
              icon="check"
              header="¡Perfecto!"
              content={this.state.content}
              size="big"
              style={{
                position: 'absolute', left: '50px', bottom: '50px', width: '40%',
              }}
              hidden={!this.state.feedback}
              positive
            />
)}
          renderError={(
            <Message
              icon="ban"
              header="Hmm... Algo salió mal."
              content={this.state.content}
              size="big"
              style={{
                position: 'absolute', left: '50px', bottom: '50px', width: '40%',
              }}
              hidden={!this.state.error}
              negative
            />
)}
          successFeedback={successFeedback}
          errorFeedback={errorFeedback}
          {...this.props}
        />
      );
    }
  };
}
