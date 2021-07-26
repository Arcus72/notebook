import React from 'react';
import NoteCreator from 'src/components/NoteCreator/NoteCreator';
import Note from 'src/components/Note/Note';
import './index.scss';

function NoteBook({ list }) {
   const pined = list.filter((note) => {
      return note.isPined === true;
   });

   const notPined = list.filter((note) => {
      return note.isPined === false;
   });

   return (
      <div className='NoteBook'>
         <NoteCreator />
         <div className='NoteBook__main'>
            {pined.length !== 0 && <span className='NoteBook__category'>Przypięte</span>}
            <div className='NoteBook__noteDisplay'>
               {pined.map((item) => (
                  <Note key={item.id} data={item} />
               ))}
            </div>
            {notPined.length !== 0 && <span className='NoteBook__category'>Inne</span>}
            <div className='NoteBook__noteDisplay'>
               {notPined.map((item) => (
                  <Note key={item.id} data={item} />
               ))}
            </div>
         </div>
      </div>
   );
}

export default NoteBook;
