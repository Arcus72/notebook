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
      id: 3,
      title: '',
      context: 'Lorem ipsum',
      color: '#28292c',
      isPined: false,
   },
   {
      id: 2,
      title: 'Praca domowa',
      context: 'sdf sdf<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/><br/>',
      color: '#28292c',
      isPined: true,
   },
   {
      id: 10,
      title: 'Dokończ strone',
      context: '',
      color: '#5C2B29',
      isPined: false,
   },
   {
      id: 4,
      title: 'React',
      context: '<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/><br/>',
      color: '#5C2B29',
      isPined: false,
   },
   {
      id: 5,
      title: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      context: '',
      color: '#5C2B29',
      isPined: false,
   },
   {
      id: 6,
      title: '',
      context: 'ddddddddddddddddddddddddddddddddddddddddddddddddd',
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
   const idList = list.map((item) => item.id);
   for (let i = 1; true; i++) {
      if (idList.indexOf(i) === -1) return i;
   }
};

const reduce = (state, action) => {
   const listCopy = [...state];
   let noteIndex;
   let noteCopy;
   switch (action.type) {
      case 'setNewNote':
         let newNote = action.value;
         newNote.id = getFirstFreeId(state);

         return [...state, newNote];
      case 'edit':
         noteIndex = listCopy.findIndex((item) => item.id === action.value.id);
         listCopy[noteIndex] = action.value.newVersion;
         return listCopy;

      case 'changePinStatus':
         noteIndex = listCopy.findIndex((item) => item.id === action.value.id);

         listCopy.splice(noteIndex, 1);

         return [action.value.newVersion, ...listCopy];

      case 'delete':
         noteIndex = listCopy.findIndex((item) => item.id === action.value);
         listCopy.splice(noteIndex, 1);
         return listCopy;

      case 'copy':
         noteIndex = listCopy.findIndex((item) => item.id === action.value);
         noteCopy = { ...state[noteIndex] };
         noteCopy.id = getFirstFreeId(state);
         return [...state, noteCopy];

      default:
         return state;
   }
};

export const NotesModifierContext = createContext();
//TODO: przeanalizuj kod
function App() {
   const inputHolder = useRef();
   const input = useRef();
   const [isSearching, setIsSearching] = useState(false);
   const [listOfNotes, notesModifier] = useReducer(reduce, listOfNotesFormula);

   const changeInputHolderColor = (action) => {
      if (action.type === 'focus') {
         inputHolder.current.classList.add('App__inputHolder--focus');
         setIsSearching(true);
         return 1;
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
                     onFocus={() => changeInputHolderColor({ type: 'focus', value: null })}
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

            {isSearching ? <FiltredNotes list={listOfNotes} /> : <NoteBook notesModifier={notesModifier} list={listOfNotes} />}
         </NotesModifierContext.Provider>
      </div>
   );
}

export default App;
