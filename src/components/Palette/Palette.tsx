import React, { useContext, memo } from 'react';
import { valueContext, Color } from 'src/components/NoteBook/NoteBook';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
type ChangeNoteColor = (color: string) => void;
function Palette({ changeNoteColor, currentColor = '#28292c' }: { changeNoteColor: ChangeNoteColor; currentColor: string }) {
   console.log('Palette');

   const { colorList } = useContext(valueContext);
   const colorPalette = colorList.map(({ name, value }: Color, index: number) => (
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
         <FontAwesomeIcon className='Palette' icon={faPalette} />

         <div className='Palette__colorContainer'>{colorPalette}</div>
      </span>
   );
}

export default memo(Palette);
