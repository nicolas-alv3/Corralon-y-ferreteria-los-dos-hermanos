import React from 'react';
import '../style/Home.css';
import { Button } from 'semantic-ui-react';

export default function Home(props) {
  return (
    <div className="home-background">
      <div className="home-title-container">
        <h1 className="home-title">
          Los Hermanos
        </h1>
      </div>
      <h3 className="home-subtitle">
        Ferretería y corralón
      </h3>
      <div className="home-layer" />
      <div className="home-button-container">
        <Button primary size="massive" className="home-start-button" onClick={() => props.history.push('/products')}>Comenzar</Button>
      </div>
    </div>
  );
}
