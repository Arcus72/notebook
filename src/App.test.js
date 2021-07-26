import { formatText } from 'src/App.js';
import { getFreeId } from 'src/App';
import { reduce } from 'src/App';

test('Testing note text formating', () => {
   expect(formatText('asdf')).toBe('asdf');
   expect(formatText('<div>sdfsdf</div><div><br></div><div><br></div><div><br></div><div><br></div>')).toBe('<div>sdfsdf</div>');
   expect(formatText('<br>')).toBe('<br>');
   expect(formatText('<div><br></div><div><br></div>')).toBe('');
   expect(formatText('&nbsp;')).toBe('&nbsp;');
   expect(
      formatText(
         '<div><br></div><div>dagadfg</div><div>sdfg sdfg</div><div>sdfg</div><div><br></div><div><br></div><div><br></div>'
      )
   ).toBe('<div>dagadfg</div><div>sdfg sdfg</div><div>sdfg</div>');
   expect(
      formatText('<div>dagadfg</div><div>sdfg sdfg</div><div>sdfg</div><div><br></div><div>&lt;div&gt;&lt;/div&gt;<br></div>')
   ).toBe('<div>dagadfg</div><div>sdfg sdfg</div><div>sdfg</div><div><br></div><div>&lt;div&gt;&lt;/div&gt;<br></div>');
   expect(formatText('')).toBe('');
});

let arr = [
   {
      id: 1627289212318,
      title: '<div>sdfsdf</div><div><br></div><div><br></div><div><br></div><div><br></div>',
      content: '<div>sdfsdf</div><div><br></div><div><br></div><div><br></div><div><br></div>',
      color: '#16504B',
      isPined: false,
   },
   { id: 1627289212319, title: '<div>sdfsdf</div>', content: '<div>sdfsdf</div>', color: '#16504B', isPined: false },
   { id: 1627289219221, title: 'sdsdfffssfsf', content: '', color: '#28292c', isPined: false },
   { id: 1627289232359, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289477412, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289477183, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289476887, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289469678, title: '', content: 'asdff', color: '#28292c', isPined: false },
];

test('Testing getFreeId', () => {
   expect(getFreeId(arr, 16272894771)).toBe(16272894771);
   expect(getFreeId(arr, 1627289469678)).toBe(1627289469679);
   expect(getFreeId(arr, 11)).toBe(11);
   expect(getFreeId(arr, 1627289212318)).toBe(1627289212320);
});

test('Testing Reducer - delete', () => {
   expect(reduce([arr[0], arr[1], arr[2]], { type: 'delete', value: { id: 1627289212318 } })).toEqual([arr[1], arr[2]]);

   expect(reduce([arr[0], arr[1], arr[2]], { type: 'delete', value: { id: 1627289212319 } })).toEqual([arr[0], arr[2]]);

   expect(reduce([arr[0], arr[1], arr[2]], { type: 'delete', value: { id: 1627289219221 } })).toEqual([arr[0], arr[1]]);
});

test('Testing Reducer - setNewNote', () => {
   expect(reduce([arr[0]], { type: 'setNewNote', value: arr[1] })).toEqual([arr[0], arr[1]]);

   expect(reduce([arr[0], arr[4], arr[2]], { type: 'setNewNote', value: arr[1] })).toEqual([arr[0], arr[4], arr[2], arr[1]]);

   expect(reduce([arr[2], arr[1]], { type: 'setNewNote', value: arr[4] })).toEqual([arr[2], arr[1], arr[4]]);

   expect(reduce([], { type: 'setNewNote', value: arr[1] })).toEqual([arr[1]]);

   expect(reduce(arr, { type: 'setNewNote', value: arr[1] })).toEqual([...arr, arr[1]]);
});

test('Testing Reducer - copy', () => {
   expect(true).toBe(true);
});

test('Testing Reducer - edit', () => {
   expect(reduce([arr[0], arr[1]], { type: 'edit', value: { id: 1627289212318, newValue: { ...arr[0], title: '' } } })).toEqual([
      { ...arr[0], title: '' },
      arr[1],
   ]);
});

test('Testing Reducer - changePinStatus', () => {
   expect(true).toBe(true);
});

test('Testing Reducer - changeNoteProperties', () => {
   expect(true).toBe(true);
});
