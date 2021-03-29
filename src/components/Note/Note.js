import React, { useContext } from 'react';
import './index.scss';
import { NotesModifierContext } from 'src/App';

function Note({ data }) {
   const { notesModifier, colorList } = useContext(NotesModifierContext);
   const [isOverflow, setIsOverflow] = React.useState(false);
   const pinIconClass = `Note__pinIcon ${data.isPined ? 'Note__pinIcon--pined' : ''}`;
   const contextValueRef = React.useRef();

   React.useEffect(() => {
      //TODO: to samo dla title
      let i = contextValueRef.current.scrollHeight - contextValueRef.current.getBoundingClientRect().height;
      i = Math.round(i);
      console.log(i);
      if (i !== 0) setIsOverflow(true);
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

   const colorPalette = colorList.map((item, index) => (
      <span
         title={item.name}
         key={index}
         className={`Note__color ${item.value === data.color ? 'Note__color--current' : ''}`}
         onClick={() => changeNoteColor(item.value)}
         style={{ background: item.value }}
      ></span>
   ));
   //TODO: anime on enter / leave oraz anime move

   //NOTE: Może title i context w jednym div i wtedy ...
   return (
      <div style={{ background: data.color }} className='Note'>
         <header className='Note__title'>
            {/* TODO: if(title === "") 2*icon i przełączanie  */}
            <div className='Note__titleValue'>
               <div onClick={changeIsPinedValue} className={pinIconClass}>
                  <i className='fas fa-map-pin'></i>
               </div>
               {data.title}
            </div>
         </header>

         <div
            className='Note__context'
            ref={contextValueRef}
            dangerouslySetInnerHTML={{ __html: data.context ? data.context : '<br />' }}
         ></div>
         {isOverflow && <div className='Note__continuationDots'>...</div>}
         <div className='Note__options'>
            <i title='usuń' onClick={() => notesModifier({ type: 'delete', value: data.id })} className='fas fa-trash'></i>
            <i title='kopiuj' onClick={() => notesModifier({ type: 'copy', value: data.id })} className='fas fa-copy'></i>
            <span className='Note__palette'>
               <i className='fas fa-palette'></i>
               <div className='Note__colorContainer'>{colorPalette}</div>
            </span>
         </div>
      </div>
   );
}

export default Note;
