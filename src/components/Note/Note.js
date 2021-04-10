import React, { useContext, useState, useRef, useEffect } from 'react';
import './index.scss';
import { valueContext } from 'src/App';
import Palette from 'src/components/Palette/Palette';
import NoteEditor from 'src/components/NoteEditor/NoteEditor';

function Note({ data }) {
   const { notesModifier } = useContext(valueContext);
   const [isOverflow, setIsOverflow] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const textContainerRef = useRef();
   const phisicalNote = useRef();

   const checkSetOverflowState = () => {
      let i = textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight;
      i > 5 ? setIsOverflow(true) : setIsOverflow(false);
   };

   const firstRender = useRef(false);
   useEffect(() => {
      // chack note overflow and format note
      if (firstRender.current && !isEditing) {
         checkSetOverflowState();
         notesModifier({ type: 'formatNote', value: { id: data.id } });
      }
      firstRender.current = true;
   }, [isEditing, notesModifier, data.id]);

   useEffect(() => {
      setIsEditing(false);
      setTimeout(checkSetOverflowState, 500);
      notesModifier({ type: 'formatNote', value: { id: data.id } });
      //fadeIn
      phisicalNote.current.classList.add('noteFadeIn');
   }, [notesModifier, data.id]);

   const changeNoteColor = (color) => {
      if (color !== data.color) {
         data.color = color;
         notesModifier({
            type: 'edit',
            value: { id: data.id, newVersion: data },
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
                     <div
                        dangerouslySetInnerHTML={{ __html: data.title ? data.title : '<br />' }}
                        onClick={() => setIsEditing(true)}
                     ></div>
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
