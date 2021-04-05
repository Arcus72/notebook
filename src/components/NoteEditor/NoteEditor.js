/* eslint-disable eqeqeq */
import React, { useRef, useEffect, useState, useContext } from 'react';
import './index.scss';
import Palette from '../Palette/Palette';
import { valueContext } from 'src/App';

// noteCopy.color = action.value;

function NoteEditor({ data, setIsEditing }) {
   const titleValueRef = useRef();
   const contextValueRef = useRef();

   const titleTextHolder = useRef();
   const contextTextHolder = useRef();

   const [titleValue] = useState(data.title);
   const [contextValue] = useState(data.context);
   const { notesModifier } = useContext(valueContext);

   const deleteNote = () => {
      notesModifier({ type: 'delete', value: data.id });
   };

   const copyNote = () => {
      notesModifier({ type: 'copy', value: data.id });
   };

   const showTextHolder = (textHolderRef, e) => {
      if (e === undefined || e.target?.innerHTML === '') textHolderRef.current.style.cssText = 'visibility: visible';
   };

   const changeNoteColor = (color) => {
      if (color !== data.color) {
         notesModifier({ type: 'changeNoteProperties', value: { id: data.id, propertyName: 'color', newValue: color } });
      }
   };

   const hideTextHolder = (textHolderRef) => {
      textHolderRef.current.style.cssText = 'visibility: hidden';
   };

   useEffect(() => {
      if (titleValueRef.current.innerHTML != '') {
         titleTextHolder.current.style.cssText = 'visibility: hidden';
      }
      if (contextValueRef.current.innerHTML != '') {
         contextTextHolder.current.style.cssText = 'visibility: hidden';
      }
   }, []);

   return (
      <div
         /*FIXME: wyłacz edytowanie po kliknięciu curtain */
         className='curtain'
      >
         <div className='NoteEditor' style={{ background: data.color }}>
            <div className='NoteEditor__titleContainer'>
               <div
                  onFocus={() => hideTextHolder(titleTextHolder)}
                  onBlur={(e) => showTextHolder(titleTextHolder, e)}
                  ref={titleValueRef}
                  contentEditable='true'
                  className='NoteEditor__titleValue'
                  onKeyDown={(e) =>
                     notesModifier({
                        type: 'changeNoteProperties',
                        value: { id: data.id, propertyName: 'title', newValue: e.target.innerHTML },
                     })
                  }
                  dangerouslySetInnerHTML={{ __html: titleValue && titleValue }}
               ></div>
               <div ref={titleTextHolder} className='NoteEditor__textHolder NoteEditor__textHolder--title'>
                  Tytuł
               </div>
               <div className={`NoteEditor__pin `}>
                  <i
                     onClick={() =>
                        notesModifier({
                           type: 'changePinStatus',
                           value: data.id,
                        })
                     }
                     className=' fas fa-map-pin'
                  ></i>
               </div>
            </div>

            <div className='NoteEditor__contextContainer'>
               <div
                  onFocus={() => hideTextHolder(contextTextHolder)}
                  onBlur={(e) => showTextHolder(contextTextHolder, e)}
                  ref={contextValueRef}
                  contentEditable='true'
                  onKeyUp={(e) =>
                     notesModifier({
                        type: 'changeNoteProperties',
                        value: { id: data.id, propertyName: 'context', newValue: e.target.innerHTML },
                     })
                  }
                  className='NoteEditor__contextValue'
                  dangerouslySetInnerHTML={{ __html: contextValue ? contextValue : '<br />' }}
               ></div>
               <div ref={contextTextHolder} className='NoteEditor__textHolder NoteEditor__textHolder--context'>
                  Utwórz notatkę...
               </div>
            </div>

            <div className='NoteEditor__options'>
               <div>
                  <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
                  <i title='usuń' onClick={deleteNote} className='fas fa-trash'></i>
                  <i title='kopiuj' onClick={copyNote} className='fas fa-copy'></i>
               </div>
               <div className='NoteEditor__rigthOptions'>
                  <span onClick={() => setIsEditing(false)} className='NoteEditor__closeBtn'>
                     Zamknij
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default NoteEditor;
