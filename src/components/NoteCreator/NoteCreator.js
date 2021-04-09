import React, { useState, useRef, useContext } from 'react';
import './index.scss';
import { valueContext } from 'src/App';
import Palette from '../Palette/Palette';
//TODO:  dodanie responsywności

const showTextHolder = (textHolderRef, e) => {
   if (e === undefined || e.target?.innerHTML === '') textHolderRef.current.style.cssText = 'visibility: visible';
};

const hideTextHolder = (textHolderRef) => {
   textHolderRef.current.style.cssText = 'visibility: hidden';
};

function NoteCreator() {
   const [isOpen, setIsOpen] = useState(false);
   const titleTextHolder = useRef();
   const contentTextHolder = useRef();

   //Value to create Note
   const titleValue = useRef();
   const contentValue = useRef();
   const [noteColor, setNoteColor] = useState('#28292c');
   const [isPined, changePinStatus] = useState(false);

   const { notesModifier } = useContext(valueContext);

   const setNewNote = () => {
      if (titleValue.current.textContent.trim() === '' && contentValue.current.textContent.trim() === '') return 1;
      let newNote = {
         id: null,
         title: titleValue.current.innerHTML,
         content: contentValue.current.innerHTML,
         color: noteColor,
         isPined: isPined,
      };
      restartNoteCreator();
      notesModifier({ type: 'setNewNote', value: newNote });
   };

   const changeNoteColor = (color) => {
      setNoteColor(color);
   };

   const restartNoteCreator = () => {
      setIsOpen(false);
      setNoteColor('#28292c');
      titleValue.current.textContent = '';
      contentValue.current.textContent = '';
      showTextHolder(contentTextHolder);
      showTextHolder(titleTextHolder);
   };

   return (
      <div style={{ background: noteColor }} onClick={() => (!isOpen ? setIsOpen(true) : '')} className='NoteCreator'>
         <div className='NoteCreator__textConteiner'>
            {isOpen && (
               <div className='NoteCreator__titleContainer'>
                  <div
                     onFocus={() => hideTextHolder(titleTextHolder)}
                     onBlur={(e) => showTextHolder(titleTextHolder, e)}
                     ref={titleValue}
                     contentEditable='true'
                     className='NoteCreator__titleValue'
                  ></div>
                  <div ref={titleTextHolder} className='NoteCreator__textHolder NoteCreator__textHolder--title'>
                     Tytuł
                  </div>
                  <div
                     onClick={() => changePinStatus(isPined ? false : true)}
                     className={`NoteCreator__pin ${isPined ? 'NoteCreator__pin--pined' : ''}`}
                  >
                     <i className=' fas fa-map-pin'></i>
                  </div>
               </div>
            )}
            <div className='NoteCreator__contentContainer'>
               <div
                  onFocus={() => hideTextHolder(contentTextHolder)}
                  onBlur={(e) => showTextHolder(contentTextHolder, e)}
                  ref={contentValue}
                  contentEditable='true'
                  className='NoteCreator__contentValue'
               ></div>
               <div ref={contentTextHolder} className='NoteCreator__textHolder NoteCreator__textHolder'>
                  Utwórz notatkę...
               </div>
            </div>
         </div>
         {isOpen && (
            <div className='NoteCreator__options'>
               <div>
                  <Palette changeNoteColor={changeNoteColor} currentColor={noteColor} />
               </div>
               <div className='NoteCreator__rigthOptions'>
                  <span onClick={setNewNote} className='NoteCreator__addBtn'>
                     Dodaj
                  </span>
                  <span onClick={restartNoteCreator} className='NoteCreator__closeBtn'>
                     Zamknij
                  </span>
               </div>
            </div>
         )}
      </div>
   );
}

export default NoteCreator;
