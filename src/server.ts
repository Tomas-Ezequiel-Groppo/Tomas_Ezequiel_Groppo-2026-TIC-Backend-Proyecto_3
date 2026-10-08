//ARCHIVO PRINCIPAL

import express from 'express';
import type { Express, Request, Response } from 'express';
import fs from 'fs'
import cors from 'cors'
import { saveProfile , logProfile , loadProfile, loadConfig, saveConfig} from './funcionesApis.js';
import { loadLevels , loadLevelsUsers, saveLevel, loadLevel, publishLevel, updateLevel, hideLevel, showLevel, updateLevelNameOnline} from './funcionesApis.js';
import { loadLevelsOG, completeLevel, loadLevelOG, completeOnlineLevel, updateLevelNameOffline, deleteLevel} from './funcionesApis.js'; 
import { loadSaveFile, saveLevelUser, deleteSavedLevel} from './funcionesApis.js';
import type {Profile , Objeto , Elemento} from './tipos.js'

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 3000);

const archivojson = 'data/main.json';
const mainjsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));
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

app.put("/level/hide/:nombre", hideLevel);

app.put("/level/show/:nombre", showLevel);

app.patch("/level/name/online/:id", updateLevelNameOnline);

app.patch("/level/name/offline/:id", updateLevelNameOffline);

app.delete("/level/delete/:id", deleteLevel);


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

app.delete("/deleteLevelUser/:nombre", deleteSavedLevel);

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
