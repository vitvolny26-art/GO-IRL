const fs = require('fs');

const file = 'artifacts/go-irl/src/components/EventSheet.tsx';
let c = fs.readFileSync(file,'utf-8');

// удаляем iframe / map embed
c = c.replace(/<iframe[\s\S]*?<\/iframe>/g, '');

// добавляем кнопку Google Maps если нет
if (!c.includes('maps.google.com')) {
  c = c.replace(
    /(address.*\n)/i,
    `$1<a href={\`https://www.google.com/maps/search/?api=1&query=\${event.address}\`} target>\n`
  );
}

fs.writeFileSync(file,c);
console.log('map removed + link added');
