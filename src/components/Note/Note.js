import React, { useContext } from 'react';
import './index.scss';
import { NotesModifierContext } from 'src/App';

function Note({ data }) {
  const { notesModifier, colorList } = useContext(NotesModifierContext);

  const pinIconClass = `Note__pinIcon ${
    data.isPined ? 'Note__pinIcon--pined' : ''
  }`;

  const changeIsPinedValue = () => {
    const dataCopy = data;
    data.isPined = !dataCopy.isPined;
    notesModifier({
      type: 'edit',
      value: { id: data.id, newVersion: dataCopy },
    });
  };

  const changeNoteColor = (color) => {
    console.log(color);
    if (color !== data.color) {
      let dataCopy = data;
      dataCopy.color = color;
      notesModifier({
        type: 'edit',
        value: { id: data.id, newVersion: dataCopy },
      });
    }
  };

  //! po najechaniu pojawia się nazwa
  const colorPalette = colorList.map((item, index) => (
    <span
      key={index}
      className={`Note__color ${
        item.value === data.color ? 'Note__color--current' : ''
      }`}
      onClick={() => changeNoteColor(item.value)}
      style={{ background: item.value }}
    ></span>
  ));

  return (
    <div style={{ background: data.color }} className='Note'>
      <header className='Note__title'>
        <div className='Note__titleValue'>{data.title}</div>
        {/* ! jeśli jest puste to znika  */}
        <div onClick={changeIsPinedValue} className={pinIconClass}>
          <i className='fas fa-map-pin'></i>
        </div>
      </header>
      <div className='Note__context'>
        {data.context ? data.context : <br />}
      </div>
      <div className='Note__options'>
        <i
          onClick={() => notesModifier({ type: 'delete', value: data.id })}
          className='fas fa-trash'
        ></i>
        <i
          onClick={() => notesModifier({ type: 'copy', value: data.id })}
          className='fas fa-copy'
        ></i>
        <span className='Note__palette'>
          <i
            // onClick={}
            className='fas fa-palette'
          ></i>
          <div className='Note__colorContainer'> {colorPalette}</div>
        </span>
      </div>
    </div>
  );
}

export default Note;
