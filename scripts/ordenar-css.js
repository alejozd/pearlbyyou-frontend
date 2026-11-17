/**
 * Mueve las hojas de estilo al principio del <head> del build.
 *
 * Por que: Vite coloca el <script type="module"> del bundle antes de los
 * <link rel="stylesheet">. Con ese orden, React alcanza a pintar el primer
 * frame sin el CSS de PrimeReact (menu apilado, tarjeta sin colocar) y, en
 * cuanto llega el CSS, la pagina pega un salto. Medido en escritorio:
 * CLS 0.82 -> 0.00 con las hojas delante.
 *
 * Se ejecuta solo, como "postbuild" de package.json:
 *   npm run build   ->   vite build && node scripts/ordenar-css.js dist
 */
import fs from "node:fs";
import path from "node:path";

const dist = process.argv[2] || "dist";
const fichero = path.join(dist, "index.html");

if (!fs.existsSync(fichero)) {
  console.warn(`[ordenar-css] no existe ${fichero}; no se hace nada`);
  process.exit(0);
}

let html = fs.readFileSync(fichero, "utf8");
const hojas = [...html.matchAll(/<link rel="stylesheet"[^>]*>/g)].map((m) => m[0].trim());

if (hojas.length === 0) {
  console.warn("[ordenar-css] no hay hojas de estilo en el HTML");
  process.exit(0);
}

const primeraHoja = html.indexOf(hojas[0]);
const primerScript = html.indexOf("<script");
if (primerScript === -1 || primeraHoja < primerScript) {
  console.log("[ordenar-css] las hojas ya van antes que los scripts");
  process.exit(0);
}

for (const etiqueta of hojas) html = html.replace(etiqueta, "");
html = html.replace(/<head>(\s*)/, `<head>$1${hojas.join("\n    ")}\n    `);
fs.writeFileSync(fichero, html);

console.log(`[ordenar-css] ${hojas.length} hojas movidas al principio del <head>`);
