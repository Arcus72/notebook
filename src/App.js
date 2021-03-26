import './App.scss';
import React, { useRef, useState, useReducer, createContext } from 'react';
import NoteBook from './components/NoteBook/NoteBook';
import FiltredNotes from './components/FiltredNotes/FiltredNotes';

let listOfNotesFormula = [
  {
    id: 1,
    title: 'Kosz',
    context: 'Lorem ipsum',
    color: '',
    isPined: false,
  },
  {
    id: 2,
    title: 'Praca domowa',
    context: '',
    color: '',
    isPined: true,
  },
  {
    id: 3,
    title: '',
    context: 'Lorem ipsum',
    color: '',
    isPined: false,
  },
];

const reduce = (state, action) => {
  switch (action) {
    case 'setNewNote':
      return 1;
    case 'editNote':
      return 1;
    case 'deleteNote':
      return 1;
    case 'copyNote':
      return 1;

    default:
      return state;
  }
};

function App() {
  const inputHolder = useRef();
  const input = useRef();
  const [isSearching, setIsSearching] = useState(false);
  const [listOfNotes, NotesModifier] = useReducer(reduce, listOfNotesFormula);
  const ValueContext = createContext();

  const changeInputHolderColor = (action) => {
    //! zmień nazwe funkcji
    if (action.type === 'focus') {
      console.log('Focus');
      inputHolder.current.classList.add('App__inputHolder--focus');
      setIsSearching(true);
      return;
    }
    inputHolder.current.classList.remove('App__inputHolder--focus');
  };

  return (
    <div className='App'>
      <div className='App__banner'>
        <header className='App__title'>NOTATNIK</header>
        <div ref={inputHolder} className='App__inputHolder'>
          <i className='App__searchIcon fas fa-search'></i>
          <input
            ref={input}
            placeholder='Szukaj'
            onFocus={() =>
              changeInputHolderColor({ type: 'focus', value: null })
            }
            onBlur={(e) => changeInputHolderColor({ type: 'blur', value: e })}
            className='App__input'
            type='text'
          />
          {isSearching && (
            <i
              className='App__crossIcon fas fa-times'
              onClick={() => {
                setIsSearching(false);
                input.current.value = '';
              }}
            ></i>
          )}
        </div>
      </div>
      <div className='App__line'></div>

      <ValueContext.Provider value={NotesModifier}>
        {isSearching ? (
          <FiltredNotes list={listOfNotes} />
        ) : (
          <NoteBook list={listOfNotes} />
        )}
      </ValueContext.Provider>
    </div>
  );
}

export default App;
