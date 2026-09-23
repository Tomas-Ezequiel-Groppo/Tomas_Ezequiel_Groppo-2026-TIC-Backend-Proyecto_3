import express, { response } from 'express';
import type { Express, Request, Response } from 'express';
import fs from 'fs'
import { saveProfile , loadProfile} from './funcionesApis.js';

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 5173);


const archivojson = 'data/main.json';
const jsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");
const jsonjsoncompleto : Profile[] = JSON.parse(jsontxtcompleto);

type RequestSaveProfile = Request<unknown, unknown , {username:string;password:string}>
type Profile = {username:string ; password:string ; profileID:number};
type Objeto = {orientacion:string|null;propiedadEspecial:string|null};
type Elemento ={tipo:Objeto; posicionX:number; posicionY:number}|null;

app.use(express.json());
app.use(express.static('FrontTesteo'));


/** Ruta de control: responde 200 con el texto OK. */
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).type('text/plain').send('OK');
});


// [TODO] Registrar acá todas sus rutas de la API

app.post("/saveProfile" , saveProfile)

app.post("/logProfile", loadProfile);

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
