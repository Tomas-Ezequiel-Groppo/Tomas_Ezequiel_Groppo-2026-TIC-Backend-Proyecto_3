//ARCHIVO PRINCIPAL

import express from 'express';
import type { Express, Request, Response } from 'express';
import fs from 'fs'
import { saveProfile , logProfile , loadProfile, loadConfig, saveConfig} from './funcionesApis.js';
import { loadLevels , loadLevelsUsers, saveLevel, loadLevel, publishLevel, updateLevel} from './funcionesApis.js';
import { loadLevelsOG, completeLevel, loadLevelOG, completeOnlineLevel} from './funcionesApis.js'; 
import { loadSaveFile, saveLevelUser} from './funcionesApis.js';
import type {Profile , Objeto , Elemento} from './tipos.js'

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 3000);


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

//NIVELES

//online

app.get("/loadLevels" , loadLevels);

app.get("/loadLevels/:username", loadLevelsUsers);

app.get("/loadLevels/level/:nombre", loadLevel);

app.post("/publishLevel/:username", publishLevel);

app.post("/level/:nombre", completeOnlineLevel)

app.put("/level/:nombre", updateLevel);

//offline

app.get("/loadLevels/original/all", loadLevelsOG);
app.post("/level/original/:numNivel", completeLevel);
app.get("/level/original/:numNivel", loadLevelOG)
app.post("/saveLevel", saveLevel);

//PERFILES
app.post("/saveProfile" , saveProfile);

app.post("/logProfile", logProfile);

app.get("/:username" , loadProfile);

app.get("/:username/configs" , loadConfig);

app.post("/:username/saveConfigs" , saveConfig);

//SAVEFILES

app.get("/saveFile/:username", loadSaveFile);
app.post("/saveLevelUser/:nombre", saveLevelUser);

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
