import React, { useReducer, createContext, useEffect, useRef, useState } from 'react';
import NoteCreator from 'src/components/NoteCreator/NoteCreator';
import Note from 'src/components/Note/Note';
import './index.scss';

//FIXME: Czy w NoteBook nie ma żadnych

export interface note {
   id: number;
   title: string;
   content: string;
   color: string;
   isPined: boolean;
}

export interface Color {
   name: string;
   value: string;
}

interface ActionById {
   type: 'formatNote' | 'delete' | 'changePinStatus' | 'copy';
   id: number;
}

interface SetNewNote {
   type: 'setNewNote';
   value: note;
}

interface ChangeNoteProperties {
   type: 'changeNoteProperties';
   id: number;
   value: { propertyName: 'title' | 'content' | 'color'; newValue: string };
}

export type Action = ActionById | SetNewNote | ChangeNoteProperties;

interface ValueContext {
   colorList: Color[];
   notesModifier: (arg0: Action) => void;
}

const colorList: Color[] = [
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
//FIXME: noteFormat, changeNoteProperties changePinStatus, copy, delete psuje wszystko
export const reduce = (state: note[], action: Action) => {
   const listCopy = [...state];
   //value.id => id
   let noteIndex: number;
   let noteCopy;

   switch (action.type) {
      case 'setNewNote':
         let newNote = action.value;
         newNote.id = getFreeId(state);
         return [...state, newNote];

      case 'formatNote':
         noteIndex = getIndex(action.id, state);
         listCopy[noteIndex].title = formatText(listCopy[noteIndex].title);
         listCopy[noteIndex].content = formatText(listCopy[noteIndex].content);
         return listCopy;

      case 'changeNoteProperties':
         noteIndex = getIndex(action.id, state);
         listCopy[noteIndex][action.value.propertyName] = action.value.newValue;

         return listCopy;

      case 'changePinStatus':
         noteIndex = getIndex(action.id, state);
         noteCopy = { ...listCopy[noteIndex] };
         noteCopy.isPined = !noteCopy.isPined;
         listCopy.splice(noteIndex, 1);
         return [noteCopy, ...listCopy];

      case 'delete':
         noteIndex = getIndex(action.id, state);
         listCopy.splice(noteIndex, 1);
         return listCopy;

      case 'copy':
         noteIndex = getIndex(action.id, state);
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
const defaultValueContext = {
   colorList: colorList,
   notesModifier: (arg0: Action) => {
      console.log(arg0);
   },
};
export const valueContext = createContext<ValueContext>(defaultValueContext);

function NoteBook() {
   console.log('NoteBook');
   const [pined, setPined] = useState<note[] | []>([]);
   const [notPined, setNotPined] = useState<note[] | []>([]);

   const [listOfNotes, notesModifier] = useReducer(reduce, getArrayOfNotes());

   let firstRender = useRef(true);
   useEffect(() => {
      if (firstRender.current === false) {
         saveNotesInLocalStorage(listOfNotes);
      }
      firstRender.current = false;
   }, [listOfNotes]);

   React.useEffect(() => {
      setPined(
         listOfNotes.filter((note: note) => {
            return note.isPined === true;
         })
      );

      setNotPined(
         listOfNotes.filter((note: note) => {
            return note.isPined === false;
         })
      );
   }, [listOfNotes]);

   return (
      <div className='NoteBook'>
         <valueContext.Provider
            value={{
               colorList: colorList,
               notesModifier: notesModifier,
            }}
         >
            <NoteCreator />

            <div className='NoteBook__main'>
               {pined.length !== 0 && <span className='NoteBook__category'>Przypięte</span>}
               <div className='NoteBook__noteDisplay'>
                  {pined.map((item: note) => (
                     <Note key={item.id} data={item} />
                  ))}
               </div>
               {notPined.length !== 0 && <span className='NoteBook__category'>Inne</span>}
               <div className='NoteBook__noteDisplay'>
                  {notPined.map((item: note) => (
                     <Note key={item.id} data={item} />
                  ))}
               </div>
            </div>
         </valueContext.Provider>
      </div>
   );
}

export default NoteBook;
