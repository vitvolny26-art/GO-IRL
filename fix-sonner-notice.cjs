const fs = require('fs');
const file = 'artifacts/go-irl/src/App.tsx';
let c = fs.readFileSync(file, 'utf8');

if (!c.includes("from 'sonner'") && !c.includes('from "sonner"')) {
  c = c.replace(/import .* from ["']react["'];?\n/, m => m + "import { Toaster, toast } from 'sonner';\n");
}

c = c.replace(/  const \[notice, setNotice\] = useState\(""\);\n  const showNotice = \(msg: string\) => \{\n    if \(toastTimer\.current\) window\.clearTimeout\(toastTimer\.current\);\n    setNotice\(msg\);\n    toastTimer\.current = window\.setTimeout\(\(\) => setNotice\(""\), 2200\);\n  \};\n/, "  const showNotice = (msg: string) => toast.success(msg);\n");

c = c.replace(/    setNotice\(message\);\n    if \(toastTimer\.current\) window\.clearTimeout\(toastTimer\.current\);\n    toastTimer\.current = window\.setTimeout\(\(\) => setNotice\(""\), 2200\);\n/g, "    toast.success(message);\n");

c = c.replace(/\s*\{notice && <div className="toast">\{notice\}<\/div>\}/, "\n      <Toaster position=\"bottom-center\" richColors />");

fs.writeFileSync(file, c);
console.log('sonner notice patch applied');
