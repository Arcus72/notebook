import React, { useRef, useEffect, useState, useContext } from 'react';
import './index.scss';
import Palette from '../Palette/Palette';
import { valueContext } from 'src/App';

function NoteEditor({ data, setIsEditing }) {
   const titleValueRef = useRef();
   const contentValueRef = useRef();

   const titleTextHolder = useRef();
   const contentTextHolder = useRef();

   const [titleValue] = useState(data.title);
   const [contentValue] = useState(data.content);
   const { notesModifier } = useContext(valueContext);

   const deleteNote = () => {
      notesModifier({ type: 'delete', value: { id: data.id } });
   };

   const copyNote = () => {
      notesModifier({ type: 'copy', value: { id: data.id } });
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

   const closeEditor = (e) => {
      if (e.target.className === 'curtain') setIsEditing(false);
   };

   useEffect(() => {
      if (titleValueRef.current.innerHTML !== '') {
         titleTextHolder.current.style.cssText = 'visibility: hidden';
      }

      if (contentValueRef.current.innerHTML !== '') {
         contentTextHolder.current.style.cssText = 'visibility: hidden';
      }
   }, []);

   return (
      <div className='curtain' onClick={(e) => closeEditor(e)}>
         <div className='NoteEditor' style={{ background: data.color }}>
            <div className='NoteEditor__textContainer'>
               <div className='NoteEditor__titleContainer'>
                  <div
                     onFocus={() => hideTextHolder(titleTextHolder)}
                     onBlur={(e) => showTextHolder(titleTextHolder, e)}
                     ref={titleValueRef}
                     contentEditable='true'
                     className='NoteEditor__titleValue'
                     onKeyUp={(e) =>
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
                  <div className={`NoteEditor__pin ${data.isPined && 'NoteEditor__pin--pined'}`}>
                     <i
                        onClick={() =>
                           notesModifier({
                              type: 'changePinStatus',
                              value: { id: data.id },
                           })
                        }
                        className=' fas fa-map-pin'
                     ></i>
                  </div>
               </div>

               <div className='NoteEditor__contentContainer'>
                  <div
                     onFocus={() => hideTextHolder(contentTextHolder)}
                     onBlur={(e) => showTextHolder(contentTextHolder, e)}
                     ref={contentValueRef}
                     contentEditable='true'
                     onKeyUp={(e) =>
                        notesModifier({
                           type: 'changeNoteProperties',
                           value: { id: data.id, propertyName: 'content', newValue: e.target.innerHTML },
                        })
                     }
                     className='NoteEditor__contentValue'
                     dangerouslySetInnerHTML={{ __html: contentValue }} //  ? contentValue : '<br />'
                  ></div>
                  <div ref={contentTextHolder} className='NoteEditor__textHolder NoteEditor__textHolder--content'>
                     Utwórz notatkę...
                  </div>
               </div>
            </div>

            <div className='NoteEditor__options'>
               <div>
                  <i title='usuń' onClick={deleteNote} className='NoteEditor__option fas fa-trash'></i>
                  <i title='kopiuj' onClick={copyNote} className='NoteEditor__option fas fa-copy'></i>
                  <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
               </div>
               <div className='NoteEditor__rightOptions'>
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
