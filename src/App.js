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

const getFirstFreeId = (list) => {
  //! nie działa
  list.forEach((item, index, arr) => {
    if (arr[index + 1] === undefined) {
      console.log(item.id + 1);
      const result = item.id + 1;
      return result;
    }

    if (item.id + 1 !== arr[index + 1].id) {
      console.log(item.id + 1);

      return item.id + 1;
    }
  });
};

const reduce = (state, action) => {
  const listCopy = [...state];
  let noteIndex;
  switch (action.type) {
    case 'setNewNote':
      console.log('setNewNote');

      return state;
    case 'edit':
      noteIndex = listCopy.findIndex((item) => {
        return item.id === action.value.id;
      });
      listCopy[noteIndex] = action.value.newVersion;

      return listCopy;

    case 'delete':
      console.log('delete');

      noteIndex = listCopy.findIndex((item) => {
        return item.id === action.value;
      });
      listCopy.splice(noteIndex, 1);
      return listCopy;

    case 'copy':
      const index = getFirstFreeId(state);
      console.log(index);

      return state;

    default:
      return state;
  }
};

function App() {
  const inputHolder = useRef();
  const input = useRef();
  const [isSearching, setIsSearching] = useState(false);
  const [listOfNotes, NotesModifier] = useReducer(reduce, listOfNotesFormula);

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

      {isSearching ? (
        <FiltredNotes list={listOfNotes} />
      ) : (
        <NoteBook notesModifier={NotesModifier} list={listOfNotes} />
      )}
    </div>
  );
}

export default App;
