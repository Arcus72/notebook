import React, { useEffect } from 'react';
import './index.scss';

function Note({ data, notesModifier }) {
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

  return (
    <div className='Note'>
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
          onClick={() => notesModifier({ type: 'copy', value: '' })}
          className='fas fa-copy'
        ></i>
        <span>
          <i
            // onClick={}
            className='fas fa-palette'
          ></i>
          <div> {/*! dokończ palette*/}</div>
        </span>
      </div>
    </div>
  );
}

export default Note;
