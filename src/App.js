import './App.scss';
import React, { useReducer, createContext, useEffect, useRef } from 'react';
import NoteBook from './components/NoteBook/NoteBook';

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
      case 'changeNoteProperties':
         noteIndex = listCopy.findIndex((item) => item.id === action.value.id);
         listCopy[noteIndex][action.value.propertyName] = action.value.newValue;
         return listCopy;

      case 'setNewNote':
         let newNote = action.value;
         newNote.id = getFirstFreeId(state);
         return [...state, newNote];

      case 'edit':
         noteIndex = listCopy.findIndex((item) => item.id === action.value.id);
         listCopy[noteIndex] = action.value.newVersion;
         return listCopy;

      case 'changePinStatus':
         noteIndex = listCopy.findIndex((item) => item.id === action.value);
         noteCopy = { ...listCopy[noteIndex] };
         noteCopy.isPined = !noteCopy.isPined;
         listCopy.splice(noteIndex, 1);
         return [noteCopy, ...listCopy];

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

const saveNotesInLocalStorage = (notesList) => {
   window.localStorage.setItem('notes', JSON.stringify(notesList));
};

const getArrayOfNotes = () => {
   return JSON.parse(window.localStorage.getItem('notes'));
};
export const valueContext = createContext();

function App() {
   const [listOfNotes, notesModifier] = useReducer(reduce, getArrayOfNotes());

   let firstRender = useRef(true);
   useEffect(() => {
      if (firstRender.current === false) {
         saveNotesInLocalStorage(listOfNotes);
      }
      firstRender.current = false;
   }, [listOfNotes]);

   return (
      <div className='App'>
         <valueContext.Provider
            value={{
               colorList: colorList,
               notesModifier: notesModifier,
            }}
         >
            <div className='App__banner'>
               <header className='App__title'>NOTATNIK</header>
            </div>
            <div className='App__line'></div>

            <NoteBook notesModifier={notesModifier} list={listOfNotes} />
         </valueContext.Provider>
      </div>
   );
}

export default App;
