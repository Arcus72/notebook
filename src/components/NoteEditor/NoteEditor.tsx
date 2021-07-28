import React, { useRef, useEffect, useState, useContext, RefObject, FocusEvent } from 'react';
import './index.scss';
import Palette from 'src/components/Palette/Palette';
import { valueContext, note } from 'src/App';

interface Props {
   data: note;
   setIsEditing: (a: boolean) => void;
}

function NoteEditor({ data, setIsEditing }: Props) {
   console.log('NoteEditor');
   const titleValueRef = useRef<HTMLDivElement>(null);
   const contentValueRef = useRef<HTMLDivElement>(null);

   const titleTextHolder = useRef<HTMLDivElement>(null);
   const contentTextHolder = useRef<HTMLDivElement>(null);

   const [titleValue] = useState(data.title);
   const [contentValue] = useState(data.content);
   const { notesModifier } = useContext(valueContext);

   const deleteNote = () => {
      notesModifier({ type: 'delete', id: data.id });
   };

   const copyNote = () => {
      notesModifier({ type: 'copy', id: data.id });
   };

   const showTextHolder = (textHolderRef: RefObject<HTMLDivElement>, e: FocusEvent<HTMLDivElement>) => {
      if (textHolderRef.current && (e === undefined || e.target?.innerHTML === ''))
         textHolderRef.current.style.cssText = 'visibility: visible';
   };

   const changeNoteColor = (color: string) => {
      if (color !== data.color) {
         notesModifier({ type: 'changeNoteProperties', id: data.id, value: { propertyName: 'color', newValue: color } });
      }
   };

   const hideTextHolder = (textHolderRef: RefObject<HTMLDivElement>) => {
      if (textHolderRef?.current) {
         textHolderRef.current.style.cssText = 'visibility: hidden';
      }
   };
   const closeEditor = (e: any) => {
      if (e.target.className === 'curtain') setIsEditing(false);
   };

   useEffect(() => {
      if (titleValueRef?.current && titleTextHolder?.current && contentValueRef?.current && contentTextHolder?.current) {
         if (titleValueRef.current.innerHTML !== '') {
            titleTextHolder.current.style.cssText = 'visibility: hidden';
         }

         if (contentValueRef.current.innerHTML !== '') {
            contentTextHolder.current.style.cssText = 'visibility: hidden';
         }
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
                           id: data.id,
                           value: { propertyName: 'title', newValue: e.currentTarget.innerHTML },
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
                              id: data.id,
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
                           id: data.id,
                           value: { propertyName: 'content', newValue: e.currentTarget.innerHTML },
                        })
                     }
                     className='NoteEditor__contentValue'
                     dangerouslySetInnerHTML={{ __html: contentValue }}
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
