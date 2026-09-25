//ARCHIVO PRINCIPAL

import express, { response } from 'express';
import type { Express, Request, Response } from 'express';
import fs from 'fs'
import { saveProfile , logProfile , loadProfile} from './funcionesApis.js';
import { loadLevels , loadLevelsUsers, saveLevel} from './funcionesApis.js';
import type {Profile , Objeto , Elemento} from './tipos.js'

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 5173);


const archivojson = 'data/main.json';
const mainjsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");
const mainjsonjsoncompleto : Profile[] = JSON.parse(mainjsontxtcompleto);

app.use(express.json());
app.use(express.static('FrontTesteo'));


/** Ruta de control: responde 200 con el texto OK. */
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).type('text/plain').send('OK');
});


// [TODO] Registrar acá todas sus rutas de la API

app.post("/saveProfile" , saveProfile);

app.post("/logProfile", logProfile);

app.get("/loadLevels" , loadLevels);

app.get("/loadLevels/:username", loadLevelsUsers);

app.post("/saveLevel", saveLevel);

app.get("/:username" , loadProfile)

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
