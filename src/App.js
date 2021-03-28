import './App.scss';
import React, { useRef, useState, useReducer, createContext } from 'react';
import NoteBook from './components/NoteBook/NoteBook';
import FiltredNotes from './components/FiltredNotes/FiltredNotes';

let listOfNotesFormula = [
  {
    id: 1,
    title: 'Kosz',
    context: 'Lorem ipsum',
    color: '#28292c',
    isPined: false,
  },
  {
    id: 2,
    title: 'Praca domowa',
    context: '',
    color: '#28292c',
    isPined: true,
  },
  {
    id: 3,
    title: '',
    context: 'Lorem ipsum',
    color: '#5C2B29',
    isPined: false,
  },
];

const colorList = [
  {
    name: 'Czarny',
    value: '#28292c',
  },
  {
    name: 'Czerwony',
    value: '#5C2B29',
  },
  {
    name: 'Pomarańcz',
    value: '#614A19',
  },
  {
    name: 'Żółty',
    value: '#635D19',
  },
  {
    name: 'Zielony',
    value: '#345920',
  },
  {
    name: 'Morski',
    value: '#16504B',
  },
  {
    name: 'Niebieski',
    value: '#2D555E',
  },
  {
    name: 'Ciemny Niebieski',
    value: '#1E3A5F',
  },
  {
    name: 'Fiolet',
    value: '#42275E',
  },
  {
    name: 'Róż',
    value: '#5B2245',
  },
  {
    name: 'Brąz',
    value: '#442F19',
  },
  {
    name: 'Szary',
    value: '#3C3F43',
  },
];

const getFirstFreeId = (list) => {
  //! Czy tyle kodu jest potrzebne
  const idList = list.map((item) => item.id);
  idList.sort((a, b) => {
    return a - b;
  });

  if (idList[0] !== 1 && idList.length === 0) return 1;
  let result;
  let isIdFind = false;

  idList.forEach((id, index, arr) => {
    if (isIdFind) return 1;

    if (arr[index + 1] === undefined) {
      result = id + 1;
      return 1;
    }

    if (arr[index + 1] - id !== 1) {
      isIdFind = true;
      result = id + 1;
      return 1;
    }
  });
  return result;
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
      noteIndex = listCopy.findIndex((item) => {
        return item.id === action.value;
      });
      const noteCopy = { ...state[noteIndex] };
      noteCopy.id = index;

      return [...state, noteCopy];

    default:
      return state;
  }
};

export const NotesModifierContext = createContext();
function App() {
  const inputHolder = useRef();
  const input = useRef();
  const [isSearching, setIsSearching] = useState(false);
  const [listOfNotes, notesModifier] = useReducer(reduce, listOfNotesFormula);

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
      <NotesModifierContext.Provider
        value={{
          colorList: colorList,
          notesModifier: notesModifier,
        }}
      >
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
          <NoteBook notesModifier={notesModifier} list={listOfNotes} />
        )}
      </NotesModifierContext.Provider>
    </div>
  );
}

export default App;
