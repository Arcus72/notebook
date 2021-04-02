/* eslint-disable eqeqeq */
import React, { useRef, useEffect } from 'react';
import './index.scss';
import Palette from '../Palette/Palette';
function NoteEditor({ data, setIsEditing }) {
   const titleValue = useRef();
   const contextValue = useRef();

   const titleTextHolder = useRef();
   const contextTextHolder = useRef();

   const showTextHolder = (textHolderRef, e) => {
      if (e === undefined || e.target?.innerHTML === '') textHolderRef.current.style.cssText = 'visibility: visible';
   };

   const hideTextHolder = (textHolderRef) => {
      textHolderRef.current.style.cssText = 'visibility: hidden';
   };

   useEffect(() => {
      if (titleValue.current.innerHTML != '') {
         titleTextHolder.current.style.cssText = 'visibility: hidden';
      }
      if (contextValue.current.innerHTML != '') {
         contextTextHolder.current.style.cssText = 'visibility: hidden';
      }
   }, []);

   return (
      <div className='curtain'>
         <div className='NoteEditor' style={{ background: data.color }}>
            <div className='NoteEditor__titleContainer'>
               <div
                  onFocus={() => hideTextHolder(titleTextHolder)}
                  onBlur={(e) => showTextHolder(titleTextHolder, e)}
                  ref={titleValue}
                  contentEditable='true'
                  className='NoteEditor__titleValue'
                  dangerouslySetInnerHTML={{ __html: data.title && data.title }}
               ></div>
               <div ref={titleTextHolder} className='NoteEditor__textHolder NoteEditor__textHolder--title'>
                  Tytuł
               </div>
               <div className={`NoteEditor__pin `}>
                  <i className=' fas fa-map-pin'></i>
               </div>
            </div>

            <div className='NoteEditor__contextContainer'>
               <div
                  onFocus={() => hideTextHolder(contextTextHolder)}
                  onBlur={(e) => showTextHolder(contextTextHolder, e)}
                  ref={contextValue}
                  contentEditable='true'
                  className='NoteEditor__contextValue'
                  dangerouslySetInnerHTML={{ __html: data.context ? data.context : '<br />' }}
               ></div>
               <div ref={contextTextHolder} className='NoteEditor__textHolder NoteEditor__textHolder--context'>
                  Utwórz notatkę...
               </div>
            </div>

            <div className='NoteEditor__options'>
               <div>
                  <Palette />
                  <i title='usuń' className='fas fa-trash'></i>
                  <i title='kopiuj' className='fas fa-copy'></i>
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
