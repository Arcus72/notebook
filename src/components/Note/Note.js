import React, { useContext, useState, useRef, useEffect } from 'react';
import './index.scss';
import { valueContext } from 'src/App';
import Palette from 'src/components/Palette/Palette';
import NoteEditor from 'src/components/NoteEditor/NoteEditor';

//TODO: analiza
//FIXME: isOverflow nie działa - spawdzi czy to DHTML
//NOTE: działa ale nie za piewszym razem
function Note({ data }) {
   const { notesModifier } = useContext(valueContext);
   const [isOverflow, setIsOverflow] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const textContainerRef = useRef();
   const phisicalNote = useRef();

   const checkSetOverflowState = () => {
      let i = textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight;
      console.log(i);

      if (i > 5) setIsOverflow(true);
   };

   useEffect(checkSetOverflowState, [data.title, data.content]);

   useEffect(() => {
      setIsEditing(false);

      //fadeInl
      phisicalNote.current.classList.add('noteFadeIn');
   }, []);

   const changeNoteColor = (color) => {
      if (color !== data.color) {
         let dataCopy = data;
         dataCopy.color = color;
         notesModifier({
            type: 'edit',
            value: { id: data.id, newVersion: dataCopy },
         });
      }
   };

   const fadeOut = (fn) => {
      phisicalNote.current.classList.remove('noteFadeIn');
      phisicalNote.current.classList.add('noteFadeOut');
      setTimeout(fn, 500);
   };

   const changePinStatus = () => {
      fadeOut(() =>
         notesModifier({
            type: 'changePinStatus',
            value: { id: data.id },
         })
      );
   };

   const deleteNote = () => {
      fadeOut(() => notesModifier({ type: 'delete', value: { id: data.id } }));
   };

   return (
      <>
         <div
            style={{ background: data.color, visibility: isEditing ? 'hidden' : 'visible' }}
            ref={phisicalNote}
            className='Note'
         >
            <div ref={textContainerRef} className='Note__textContainer'>
               <header className='Note__title'>
                  <div className='Note__titleValue'>
                     <div onClick={changePinStatus} className={`Note__pinIcon ${data.isPined ? 'Note__pinIcon--pined' : ''}`}>
                        <i className='fas fa-map-pin'></i>
                     </div>
                     <span
                        dangerouslySetInnerHTML={{ __html: data.title ? data.title : '<br />' }}
                        onClick={() => setIsEditing(true)}
                     ></span>
                  </div>
               </header>

               <div
                  onClick={() => setIsEditing(true)}
                  className='Note__content'
                  dangerouslySetInnerHTML={{ __html: data.content ? data.content : '<br />' }}
               ></div>
            </div>
            {isOverflow && <div className='Note__continuationDots'>...</div>}
            <div className='Note__options'>
               <i title='usuń' onClick={deleteNote} className='fas fa-trash'></i>
               <i
                  title='kopiuj'
                  onClick={() => notesModifier({ type: 'copy', value: { id: data.id } })}
                  className='fas fa-copy'
               ></i>
               <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
            </div>
         </div>
         {isEditing && <NoteEditor data={data} setIsEditing={setIsEditing} />}
      </>
   );
}

export default Note;
