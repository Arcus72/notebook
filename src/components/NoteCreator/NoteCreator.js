import React, { useState, useRef, useContext } from 'react';
import './index.scss';
import { NotesModifierContext } from 'src/App';

function NoteCreator() {
   const [isOpen, setIsOpen] = useState(false);
   const titleTextHolder = useRef();
   const contextTextHolder = useRef();

   //Value to create Note
   const titleValue = useRef();
   const contextValue = useRef();

   const { notesModifier } = useContext(NotesModifierContext);

   const setNewNote = () => {
      let newNote = {
         id: null,
         title: titleValue.current.textContent,
         context: contextValue.current.textContent,
         color: '#28292c',
         isPined: false,
      };

      notesModifier({ type: 'setNewNote', value: newNote });
   };

   const showTextHolder = ({ target }, textHolderRef) => {
      if (target.innerHTML === '') textHolderRef.current.style.cssText = 'visibility:	visible';
   };

   const hideTextHolder = ({ target }, textHolderRef) => {
      console.log(target);

      //TODO: czy taget jest potrzebne
      textHolderRef.current.style.cssText = 'visibility: hidden';
   };

   return (
      <div onClick={() => (!isOpen ? setIsOpen(true) : '')} className='NoteCreator'>
         {isOpen && (
            <div className='NoteCreator__titleContainer'>
               <div
                  onFocus={(e) => hideTextHolder(e, titleTextHolder)}
                  onBlur={(e) => showTextHolder(e, titleTextHolder)}
                  ref={titleValue}
                  contentEditable='true'
                  className='NoteCreator__titleValue'
               ></div>
               <div ref={titleTextHolder} className='NoteCreator__textHolder'>
                  Tytuł
               </div>
            </div>
         )}
         <div className='NoteCreator__contextContainer'>
            <div
               onFocus={(e) => hideTextHolder(e, contextTextHolder)}
               onBlur={(e) => showTextHolder(e, contextTextHolder)}
               ref={contextValue}
               contentEditable='true'
               className='NoteCreator__contextValue'
            ></div>
            <div ref={contextTextHolder} className='NoteCreator__textHolder'>
               Utwórz notatkę...
            </div>
         </div>
         {isOpen && (
            <div className='NoteCreator__options'>
               <div>
                  <span className='NoteCreator__palette'>
                     <i className='fas fa-palette'></i>
                  </span>
               </div>
               <div className='NoteCreator__rigthOptions'>
                  <span onClick={setNewNote} className='NoteCreator__addBtn'>
                     Dodaj
                  </span>
                  <span onClick={() => setIsOpen(false)} className='NoteCreator__closeBtn'>
                     Zamknij
                  </span>
               </div>
            </div>
         )}
      </div>
   );
}

export default NoteCreator;
