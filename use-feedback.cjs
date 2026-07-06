const fs = require('fs');

const file = 'artifacts/go-irl/src/components/EventSheet.tsx';
let c = fs.readFileSync(file,'utf-8');

// вставляем компонент в рендер
if (!c.includes('<FeedbackBox')) {
  c = c.replace(
    /<\/div>\s*}\s*$/,
    `<FeedbackBox />\n</div>\n}`
  );
}

fs.writeFileSync(file,c);
console.log('feedback connected to UI');
