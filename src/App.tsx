//
//TODO: zmiana na TypeScript
//TODO: callback/memo
//
import React, { useReducer, createContext, useEffect, useRef } from 'react';
import './App.scss';
import NoteBook from 'src/components/NoteBook/NoteBook';

export interface note {
   id: number;
   title: string;
   content: string;
   color: string;
   isPined: boolean;
}

export interface color {
   name: string;
   value: string;
}

interface NotesModifier {
   type: 'setNewNote' | 'formatNote' | 'changeNoteProperties' | 'changePinStatus' | 'delete' | 'copy';
   id: number;
   value?: any;
}

const colorList: color[] = [
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

export const getIndex = (id: number, list: note[]): number => list.findIndex((item) => item.id === id);

export const getFreeId = (list: note[], id = new Date().getTime()): number => {
   while (true) {
      let index = getIndex(id, list);
      if (index === -1) return id;
      else id++;
   }
};

export const formatText = (text: string) => text.replace(/^(<div> *<br><\/div>)*|(<div> *<br><\/div>)*$/gm, '') || '';
//TODO: value{id} -> value i id
export const reduce = (state: note[], action: NotesModifier) => {
   const listCopy = [...state];
   //value.id => id
   let noteIndex = getIndex(action.id, state);
   let noteCopy;

   switch (action.type) {
      case 'setNewNote':
         let newNote = action.value;
         newNote.id = getFreeId(state);
         return [...state, newNote];

      case 'formatNote':
         listCopy[noteIndex].title = formatText(listCopy[noteIndex].title);
         listCopy[noteIndex].content = formatText(listCopy[noteIndex].content);
         return listCopy;

      case 'changeNoteProperties':
         listCopy[noteIndex][action.value.propertyName] = action.value.newValue;
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
         noteCopy.id = getFreeId(state);
         listCopy.splice(noteIndex + 1, 0, noteCopy);
         return listCopy;

      default:
         return state;
   }
};

export const saveNotesInLocalStorage = (notesList: note[]) => window.localStorage.setItem('notes', JSON.stringify(notesList));

export const getArrayOfNotes = () => {
   let result;
   try {
      result = JSON.parse(window.localStorage.getItem('notes') || '[]');
   } catch (e) {
      alert('Nie prawidłowy zapis danych.\n Zalecamy odświeżyć stronę');
      return [];
   }
   return result;
};
//FIXME: does this context work?
export let valueContext: any;

function App() {
   console.log('App');

   const [listOfNotes, notesModifier] = useReducer(reduce, getArrayOfNotes());

   valueContext = createContext({
      colorList: colorList,
      notesModifier: notesModifier,
   });

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
