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

const formatText = (text) => text.replace(/^(<div> *<br><\/div>)*|(<div> *<br><\/div>)*$/gm, '');

const getIndex = (id, arr) => arr.findIndex((item) => item.id === id);

const reduce = (state, action) => {
   const listCopy = [...state];
   let noteIndex = action.type !== 'setNewNote' && getIndex(action.value.id, state);
   let noteCopy;

   switch (action.type) {
      case 'formatNote':
         listCopy[noteIndex].title = formatText(listCopy[noteIndex].title);
         listCopy[noteIndex].content = formatText(listCopy[noteIndex].content);

         return listCopy;
      case 'changeNoteProperties':
         listCopy[noteIndex][action.value.propertyName] = action.value.newValue;
         return listCopy;

      case 'setNewNote':
         let newNote = action.value;
         newNote.id = getFirstFreeId(state);
         return [...state, newNote];

      case 'edit':
         listCopy[noteIndex] = action.value.newVersion;
         return listCopy;

      case 'changePinStatus':
         noteCopy = { ...listCopy[noteIndex] };
         noteCopy.isPined = !noteCopy.isPined;
         listCopy.splice(noteIndex, 1);
         return [noteCopy, ...listCopy];

      case 'delete':
         listCopy.splice(noteIndex, 1);
         return listCopy;

      case 'copy':
         noteCopy = { ...state[noteIndex] };
         noteCopy.id = getFirstFreeId(state);
         listCopy.splice(noteIndex + 1, 0, noteCopy);
         return listCopy;

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

//TODO:  dodanie responsywności
function App() {
   const [listOfNotes, notesModifier] = useReducer(reduce, getArrayOfNotes() || []);

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

            <NoteBook list={listOfNotes} />
         </valueContext.Provider>
      </div>
   );
}

export default App;
