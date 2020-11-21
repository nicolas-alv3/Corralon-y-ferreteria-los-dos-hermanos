import React from 'react';
import FerreteriaIcon from '../icons/ferreteria.png';
import PintureriaIcon from '../icons/pintureria.png';
import ElectricidadIcon from '../icons/electricidad.png';
import SanitariosIcon from '../icons/sanitarios.png';
import OthersIcon from '../icons/question.png';
import BuloneraIcon from '../icons/bulonera.png';
import CorralonIcon from '../icons/corralon.png';
import CeramicaIcon from '../icons/ceramica.png';

export default class Category {
    constructor(cat){
        this.category = cat;
    }
    getIcon() {
        switch (this.category) {
          case 'FERRETERIA':
            return <img src={FerreteriaIcon} alt="a" style={{ height: '25px', margin: '0 10px', position: 'relative' }} />;
          case 'PINTURERIA':
            return <img src={PintureriaIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'ELECTRICIDAD':
            return <img src={ElectricidadIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'BULONERA':
            return <img src={BuloneraIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'VARIOS':
            return <img src={OthersIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'SANITARIOS':
            return <img src={SanitariosIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'CORRALON':
            return <img src={CorralonIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          case 'CERAMICA':
            return <img src={CeramicaIcon} alt="a" style={{ height: '30px', position: 'relative' }} />;
          default: return <div />;
        }
      };

      getAllForSelector() {
        const options = [
            { key: 'b', text: 'Bulonera', value: 'BULONERA' },
            { key: 's', text: 'Sanitarios', value: 'SANITARIOS' },
            { key: 'e', text: 'Electricidad', value: 'ELECTRICIDAD' },
            { key: 'f', text: 'Ferreteria', value: 'FERRETERIA' },
            { key: 'p', text: 'Pintureria', value: 'PINTURERIA' },
            { key: 'v', text: 'Varios', value: 'VARIOS' },
            { key: 'c', text: 'Corralon', value: 'CORRALON' },
            { key: 'ce', text: 'Ceramica', value: 'CERAMICA' },
        ];
          return options
      }
}