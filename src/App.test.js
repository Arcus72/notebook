import { formatText } from 'src/App.js';
import { getFreeId } from 'src/App';

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
   { id: 1627289212318, title: 'asf', content: 'sadf', color: '#16504B', isPined: false },
   { id: 1627289212319, title: 'asf', content: 'sadf', color: '#16504B', isPined: false },
   { id: 1627289219221, title: 'sdsdfffssfsf', content: '', color: '#28292c', isPined: false },
   { id: 1627289232359, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289477412, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289477183, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289476887, title: '<br>', content: 'jsjdkkfks', color: '#28292c', isPined: false },
   { id: 1627289469678, title: '', content: 'asdff', color: '#28292c', isPined: false },
];

test('Testing id getter', () => {
   expect(getFreeId(arr, 16272894771)).toBe(16272894771);
   expect(getFreeId(arr, 1627289469678)).toBe(1627289469679);
   expect(getFreeId(arr, 11)).toBe(11);
   expect(getFreeId(arr, 1627289212318)).toBe(1627289212320);
});
