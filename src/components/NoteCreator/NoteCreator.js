import React, { useState } from 'react';
import './index.scss';

function NoteCreator() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(true)} className='NoteCreator'>
      {isOpen && (
        <div className='NoteCreator__context'>
          <div
            className='NoteCreator__contextValue'
            contentEditable='true'
          ></div>
          <div className='NoteCreator__contextPlaceholder'>Tytuł</div>
        </div>
      )}
      <div className='NoteCreator__context'>
        <div className='NoteCreator__contextValue' contentEditable='true'></div>
        <div className='NoteCreator__contextPlaceholder'>Utwórz notatkę...</div>
      </div>
    </div>
  );
}

export default NoteCreator;
