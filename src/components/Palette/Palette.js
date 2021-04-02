import React, { useContext } from 'react';
import { valueContext } from 'src/App';
import './index.scss';

function Palette({ changeNoteColor, currentColor = '#28292c' }) {
   const { colorList } = useContext(valueContext);

   const colorPalette = colorList.map((item, index) => (
      <span
         title={item.name}
         key={index}
         className={`Palette__color ${item.value === currentColor ? 'Palette__color--current' : ''}`}
         onClick={() => changeNoteColor(item.value)}
         style={{ background: item.value }}
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
