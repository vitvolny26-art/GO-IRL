const fs = require('fs');

const file = 'artifacts/go-irl/src/verticals/SportVertical.tsx';
let c = fs.readFileSync(file,'utf-8');

// добавим state и click handler
if (!c.includes('showWeather')) {
  c = c.replace(
    /function SportVertical/,
    `import { useState } from 'react'\n\nfunction SportVertical`
  );

  c = c.replace(
    /return \(/,
    `const [showWeather, setShowWeather] = useState(false)\n\nreturn (`
  );
}

// делаем weather clickable
c = c.replace(
  /(weather.*?<.*?>)/i,
  `<div onClick={() => setShowWeather(true)} style={{cursor:'pointer'}}>
  $1
  </div>`
);

// добавим простой sheet
if (!c.includes('Weather details')) {
  c += `

{showWeather && (
  <div style={{
    position:'fixed',
    bottom:0,
    left:0,
    right:0,
    background:'#111',
    padding:16,
    borderTop:'1px solid #333'
  }}>
    <div>🌤 Weather details</div>
    <div>Temp: ~{activity.temperature}°C</div>
    <div>Min / Max: {activity.tempMin} / {activity.tempMax}</div>
    <div>Rain: {activity.rain}%</div>
    <div>Wind: {activity.wind} km/h</div>
    <div style={{marginTop:8}}>
      Good for outdoor ✅
    </div>
    <button onClick={() => setShowWeather(false)}>Close</button>
  </div>
)}
`;
}

fs.writeFileSync(file,c);
console.log('weather sheet added');
