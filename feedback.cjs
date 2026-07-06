const fs = require('fs');

const file = 'artifacts/go-irl/src/components/EventSheet.tsx';
let c = fs.readFileSync(file,'utf-8');

// убираем старую кнопку/alert
c = c.replace(/alert\(.*?\);?/g, "console.log('feedback open')");

// добавим простой textarea + button если нет
if (!c.includes('textarea')) {
  c += `

/* --- feedback MVP --- */
import { useState } from 'react';

export function FeedbackBox() {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return <div>Спасибо ❤️</div>;

  return (
    <div style={{padding:12}}>
      <h3>Сообщить о проблеме</h3>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Что случилось?"
      />
      <button onClick={() => {
        console.log('BUG REPORT:', text);
        setSent(true);
      }}>
        Отправить
      </button>
    </div>
  );
}
`;
}

fs.writeFileSync(file,c);
console.log('feedback MVP added');
