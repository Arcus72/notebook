import React, { useContext, useState, useRef, useEffect } from 'react';
import './index.scss';
import { valueContext, note, Action } from 'src/App';
import Palette from 'src/components/Palette/Palette';
import NoteEditor from 'src/components/NoteEditor/NoteEditor';
//FIXME: kropki
type Props = { data: note };
function Note({ data }: Props) {
   console.log('Note');

   const { notesModifier } = useContext(valueContext);
   const [isOverflow, setIsOverflow] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const textContainerRef = useRef<HTMLDivElement>(null);
   const singleNote = useRef<HTMLDivElement>(null);

   const checkSetOverflowState = () => {
      let i = textContainerRef?.current?.scrollHeight || 0 - (textContainerRef?.current?.clientHeight || 0);
      i > 5 ? setIsOverflow(true) : setIsOverflow(false);
   };

   const firstRender = useRef(false);
   useEffect(() => {
      if (firstRender.current && !isEditing) {
         checkSetOverflowState();
         notesModifier({ type: 'formatNote', id: data.id });
      }
      firstRender.current = true;
   }, [isEditing, notesModifier, data.id]);

   useEffect(() => {
      setIsEditing(false);
      setTimeout(checkSetOverflowState, 500);
      notesModifier({ type: 'formatNote', id: data.id });
      //fadeIn
      singleNote?.current?.classList.add('noteFadeIn');
   }, [notesModifier, data.id]);

   const changeNoteColor = (color: string) => {
      if (color !== data.color) {
         data.color = color;
         notesModifier({
            type: 'changeNoteProperties',
            id: data.id,
            value: { propertyName: 'color', newValue: color },
         });
      }
   };

   const fadeOut = (fn: (arg0: Action) => void) => {
      singleNote?.current?.classList.remove('noteFadeIn');
      singleNote?.current?.classList.add('noteFadeOut');
      setTimeout(fn, 500);
   };

   const changePinStatus = () => {
      fadeOut(() =>
         notesModifier({
            type: 'changePinStatus',
            id: data.id,
         })
      );
   };

   const deleteNote = () => {
      fadeOut(() => notesModifier({ type: 'delete', id: data.id }));
   };

   return (
      <>
         <div style={{ background: data.color, visibility: isEditing ? 'hidden' : 'visible' }} ref={singleNote} className='Note'>
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
               <i title='kopiuj' onClick={() => notesModifier({ type: 'copy', id: data.id })} className='fas fa-copy'></i>
               <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
            </div>
         </div>
         {isEditing && <NoteEditor data={data} setIsEditing={setIsEditing} />}
      </>
   );
}

export default Note;
