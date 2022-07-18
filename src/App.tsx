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
