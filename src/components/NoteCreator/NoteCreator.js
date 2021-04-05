import React, { useState, useRef, useContext } from 'react';
import './index.scss';
import { valueContext } from 'src/App';
import Palette from '../Palette/Palette';

//FIXME: curtyna się nie zasuwa

function NoteCreator() {
   const [isOpen, setIsOpen] = useState(false);
   const titleTextHolder = useRef();
   const contextTextHolder = useRef();
   const [noteColor, setNoteColor] = useState('#28292c');
   const [isPined, changePinStatus] = useState(false);

   //Value to create Note
   const titleValue = useRef();
   const contextValue = useRef();

   const { notesModifier } = useContext(valueContext);

   const setNewNote = () => {
      if (titleValue.current.textContent.trim() === '' && contextValue.current.textContent.trim() === '') return 1;
      let newNote = {
         id: null,
         title: titleValue.current.innerHTML,
         context: contextValue.current.innerHTML,
         color: noteColor,
         isPined: isPined,
      };
      restartNoteCreator();
      notesModifier({ type: 'setNewNote', value: newNote });
   };

   const showTextHolder = (textHolderRef, e) => {
      if (e === undefined || e.target?.innerHTML === '') textHolderRef.current.style.cssText = 'visibility: visible';
   };

   const hideTextHolder = (textHolderRef) => {
      textHolderRef.current.style.cssText = 'visibility: hidden';
   };

   const changeNoteColor = (color) => {
      setNoteColor(color);
   };

   const restartNoteCreator = () => {
      setIsOpen(false);
      setNoteColor('#28292c');
      titleValue.current.textContent = '';
      contextValue.current.textContent = '';
      showTextHolder(contextTextHolder);
      showTextHolder(titleTextHolder);
   };

   return (
      <div style={{ background: noteColor }} onClick={() => (!isOpen ? setIsOpen(true) : '')} className='NoteCreator'>
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
         <div className='NoteCreator__contextContainer'>
            <div
               onFocus={() => hideTextHolder(contextTextHolder)}
               onBlur={(e) => showTextHolder(contextTextHolder, e)}
               ref={contextValue}
               contentEditable='true'
               className='NoteCreator__contextValue'
            ></div>
            <div ref={contextTextHolder} className='NoteCreator__textHolder NoteCreator__textHolder'>
               Utwórz notatkę...
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
