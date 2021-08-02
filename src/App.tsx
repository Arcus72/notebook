///
//TODO: Code optimization
//TODO: use memo, UseMemo, useCallback
//TODO: optimization animation
//TODO: check useEffect
//TODO: logic from App to NoteBook
//FIXME: fix formatText
//FIXME: plik testujący
///

import './App.scss';
import NoteBook from 'src/components/NoteBook/NoteBook';

function App() {
   console.log('App');

   return (
      <div className='App'>
         <div className='App__banner'>
            <header className='App__title'>NOTATNIK</header>
         </div>
         <div className='App__line'></div>

         <NoteBook />
      </div>
   );
}

export default App;
