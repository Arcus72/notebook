import React, { useContext } from 'react';
import './index.scss';
import { valueContext } from 'src/App';
import Palette from 'src/components/Palette/Palette';
import NoteEditor from 'src/components/NoteEditor/NoteEditor';

function Note({ data }) {
   const { notesModifier } = useContext(valueContext);
   const [isOverflow, setIsOverflow] = React.useState(false);
   const [isEditing, setIsEditing] = React.useState(false);
   const textContainerRef = React.useRef();

   React.useEffect(() => {
      // cheking is textContext is overflow and change isOverflow value
      let i = textContainerRef.current.scrollHeight - textContainerRef.current.getBoundingClientRect().height;
      i = Math.round(i);
      if (i > 10) setIsOverflow(true);
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

   //TODO: anime on enter / leave oraz anime move
   return (
      <>
         <div style={{ background: data.color, visibility: isEditing ? 'hidden' : 'visible' }} className='Note'>
            <div ref={textContainerRef} className='Note__textContainer'>
               <header className='Note__title'>
                  <div className='Note__titleValue'>
                     <div
                        onClick={() =>
                           notesModifier({
                              type: 'changePinStatus',
                              value: data.id,
                           })
                        }
                        className={`Note__pinIcon ${data.isPined ? 'Note__pinIcon--pined' : ''}`}
                     >
                        <i className='fas fa-map-pin'></i>
                     </div>
                     <span onClick={() => setIsEditing(true)}> {data.title}</span>
                  </div>
               </header>

               <div
                  onClick={() => setIsEditing(true)}
                  className='Note__context'
                  dangerouslySetInnerHTML={{ __html: data.context ? data.context : '<br />' }}
               ></div>
            </div>
            {isOverflow && <div className='Note__continuationDots'>...</div>}
            <div className='Note__options'>
               <i title='usuń' onClick={() => notesModifier({ type: 'delete', value: data.id })} className='fas fa-trash'></i>
               <i title='kopiuj' onClick={() => notesModifier({ type: 'copy', value: data.id })} className='fas fa-copy'></i>
               <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
            </div>
         </div>
         {isEditing && <NoteEditor data={data} setIsEditing={setIsEditing} />}
      </>
   );
}

export default Note;
