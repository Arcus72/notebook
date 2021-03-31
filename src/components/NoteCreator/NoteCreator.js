import React, { useState, useRef, useContext } from 'react';
import './index.scss';
import { NotesModifierContext } from 'src/App';
import Palette from '../Palette/Palette';

//TODO: pin - logika
//TODO: style
//TODO: przeanalizuj kod

function NoteCreator() {
   const [isOpen, setIsOpen] = useState(false);
   const titleTextHolder = useRef();
   const contextTextHolder = useRef();
   const [noteColor, setNoteColor] = useState('#28292c');

   //Value to create Note
   const titleValue = useRef();
   const contextValue = useRef();

   const { notesModifier } = useContext(NotesModifierContext);

   const setNewNote = () => {
      if (titleValue.current.textContent.trim() === '' && contextValue.current.textContent.trim() === '') return 1;
      let newNote = {
         id: null,
         title: titleValue.current.textContent,
         context: contextValue.current.textContent,
         color: noteColor,
         isPined: false,
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
               <div>
                  <i className='NoteCreator__pin fas fa-map-pin'></i>
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
            <div ref={contextTextHolder} className='NoteCreator__textHolder NoteCreator__textHolder--context'>
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
