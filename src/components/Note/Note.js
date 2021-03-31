import React, { useContext } from 'react';
import './index.scss';
import { NotesModifierContext } from 'src/App';
import Palette from 'src/components/Palette/Palette';

//TODO: przeanalizuj kod

function Note({ data }) {
   const { notesModifier } = useContext(NotesModifierContext);
   const [isOverflow, setIsOverflow] = React.useState(false);
   const pinIconClass = `Note__pinIcon ${data.isPined ? 'Note__pinIcon--pined' : ''}`;
   const textContainerRef = React.useRef();

   React.useEffect(() => {
      // cheking is textContext is overflow and change isOverflow value
      let i = textContainerRef.current.scrollHeight - textContainerRef.current.getBoundingClientRect().height;
      i = Math.round(i);
      if (i > 5) setIsOverflow(true);
   }, []);

   const changeIsPinedValue = () => {
      const dataCopy = data;
      data.isPined = !dataCopy.isPined;
      notesModifier({
         type: 'changePinStatus',
         value: { id: data.id, newVersion: dataCopy },
      });
   };

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
   //TODO: pzretwórz NoteCreator na notemanage -> edytuj note po kliknięciu
   return (
      <div style={{ background: data.color }} className='Note'>
         <div ref={textContainerRef} className='Note__textContainer'>
            <header className='Note__title'>
               <div className='Note__titleValue'>
                  <div onClick={changeIsPinedValue} className={pinIconClass}>
                     <i className='fas fa-map-pin'></i>
                  </div>
                  {data.title}
               </div>
            </header>

            <div className='Note__context' dangerouslySetInnerHTML={{ __html: data.context ? data.context : '<br />' }}></div>
         </div>
         {isOverflow && <div className='Note__continuationDots'>...</div>}
         <div className='Note__options'>
            <i title='usuń' onClick={() => notesModifier({ type: 'delete', value: data.id })} className='fas fa-trash'></i>
            <i title='kopiuj' onClick={() => notesModifier({ type: 'copy', value: data.id })} className='fas fa-copy'></i>
            <Palette changeNoteColor={changeNoteColor} currentColor={data.color} />
         </div>
      </div>
   );
}

export default Note;
