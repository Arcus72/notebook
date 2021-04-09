import React, { useContext } from 'react';
import { valueContext } from 'src/App';
import './index.scss';
//TODO:  dodanie responsywności
function Palette({ changeNoteColor, currentColor = '#28292c' }) {
   const { colorList } = useContext(valueContext);

   const colorPalette = colorList.map(({ name, value }, index) => (
      <span
         title={name}
         key={index}
         className={`Palette__color ${value === currentColor ? 'Palette__color--current' : ''}`}
         onClick={() => changeNoteColor(value)}
         style={{ background: value }}
      ></span>
   ));
   return (
      <span className='Palette'>
         <i className='fas fa-palette'></i>
         <div className='Palette__colorContainer'>{colorPalette}</div>
      </span>
   );
}

export default Palette;
