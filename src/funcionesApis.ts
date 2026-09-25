//ARCHIVO DE FUNCIONES PARA LAS APIS

import fs from 'fs'
import express from 'express'

import type { Express, Request, Response } from 'express';

import type {Profile, WholeProfile} from './tipos.js'
import type {Objeto, Elemento, Nivel} from './tipos.js'

import type {RequestSaveProfile, RequestLogProfile, RequestLoadProfile} from './request&responseTypes.js'
import type { RequestLoadLevels , RequestLoadLevelsUsers, RequestSaveLevel } from './request&responseTypes.js';

const app:Express= express();

const mainarchivojson = 'data/main.json';
const mainNivelesjson = 'data/niveles.json'

const mainjsontxtcompleto : string = fs.readFileSync(mainarchivojson, "utf-8");
const mainjsonjsoncompleto : Profile[] = JSON.parse(mainjsontxtcompleto);

const nivelesjsontxtcompleto:string=fs.readFileSync(mainNivelesjson, "utf-8");
const nivelesjsonjsoncompleto: Nivel[]= JSON.parse(nivelesjsontxtcompleto);

export function saveProfile(request: RequestSaveProfile, response:Response){
    let n:number=0;
    let yaExiste:boolean=false;

    while (n<mainjsonjsoncompleto.length){
        if (request.body.username===mainjsonjsoncompleto[n]!.username){
            yaExiste=true
            n=mainjsonjsoncompleto.length;
        }
        else{
            n++;
        }
    }
    if (yaExiste===true){
     response.status(409).json({error:"Perfil_Preexistente"})
    }
    else{
    const newProfile:Profile={
        username:request.body.username,
        password:request.body.password,
        profileID:mainjsonjsoncompleto.length+1,
    }
    let jsonnuevofun : string ="";

    mainjsonjsoncompleto.push(newProfile);
    jsonnuevofun=JSON.stringify(mainjsonjsoncompleto, null, 1);
    fs.writeFileSync(mainarchivojson,jsonnuevofun);
    response.status(200).json({estado:"Perfil-guardado"})
}
}
export function logProfile(request:RequestLogProfile, response:Response){
    let logProfile:Profile={
        username:request.body.username,
        password:request.body.password,
        profileID:1,
    }
  let n:number=0;
  let existeElUsername:boolean=false;
  let correctProfile: Profile | undefined;
  
  while (n<mainjsonjsoncompleto.length){
    if (logProfile.username===mainjsonjsoncompleto[n]!.username){
        existeElUsername=true;
        correctProfile=mainjsonjsoncompleto[n]
        n=mainjsonjsoncompleto.length;
    }
    else{
        existeElUsername===false;
        n++;
    }
  }
    if (existeElUsername===true){
     if (logProfile.password===correctProfile?.password){
         response.json({entrada:"Todo"})
         response.status(200)
     }
     else{
         response.json({entrada:"ContraIncorrecta"})
         response.status(401)
     }
    }
    else{
        response.json({entrada:"TodoMal"})
        response.status(404)
    }
}
export function loadLevels (request:RequestLoadLevels , response:Response){
     let lista:string=fs.readFileSync("./data/niveles.json" , "utf-8");
     let listajson: Nivel[]=JSON.parse(lista);
     response.json(listajson)
}
export function loadLevelsUsers (request:RequestLoadLevelsUsers, response:Response){
let listaOG :string = fs.readFileSync("./data/niveles.json", "utf-8");
let listajsonOG : Nivel[]=JSON.parse(listaOG);
let usuario=request.params.username;
let n: number = 0;
let listajson: Nivel[]=[];
let listavacia:Nivel[]=[];
while (n<listajsonOG.length){
  if (listajsonOG[n].usuario===usuario){
     listajson.push(listajsonOG[n]);
     n++;
  }
  else{
    n++;
  }
}
if (listajson===listavacia){
 response.status(404).json({"estatus":"No-se-han-encontrado-niveles-a-nombre-de-ese-usuario"});
}
response.json(listajson);
response.status(200).json({"estatus":"Niveles-cargados"});
}
export function saveLevel (request:RequestSaveLevel, response:Response){
  let lista:string=fs.readFileSync("./data/niveles.json", "utf-8");
     let listajson: Nivel[] = JSON.parse(lista);

    let newLevel: Nivel = {
        elementos:request.body.elementos,
        usuario:request.body.usuario,
        id:listajson.length+1
     }
     
     listajson.push(newLevel);
     let nuevalistatxt:string = JSON.stringify(listajson);
     fs.writeFileSync("./data/niveles.json", nuevalistatxt);
     response.status(200).json({"estado":"Nivel guardado"})
}
export function loadProfile (request:RequestLoadProfile, response:Response){
      let listaUsersOGtxt:string=fs.readFileSync(mainarchivojson, "utf-8");
      let listaUsersOGjson: Profile[]=JSON.parse(listaUsersOGtxt);
      
      let listaLevelsOGtxt:string=fs.readFileSync(mainNivelesjson, "utf-8");
      let listaLevelsOGjson:Nivel[]=JSON.parse(listaLevelsOGtxt);

      let profileNew:Profile={
        username:"",
        password:"",
        profileID:0
      }
      let profileLoaded:Profile=profileNew;

      let profileLevels:Nivel[]=[];

      let n:number=0;
      while (n<listaUsersOGjson.length){
        if (listaUsersOGjson[n].username===request.params.username){
            profileLoaded=listaUsersOGjson[n];
            n=listaUsersOGjson.length
        }
        else{
            n++;
        }
      }
n=0;
let userUsername:string=profileLoaded.username

      if (profileLoaded===profileNew){
            response.status(404).json({"estatus":"Perfil-no-encontrado"})
        }
        else{
            while (n<listaLevelsOGjson.length){
                if (listaLevelsOGjson[n].usuario===userUsername){
                 profileLevels.push(listaLevelsOGjson[n])
                 n++;
                }
                else{
                    n++;
                }
            }
        let perfilEncontrado:WholeProfile={
            profileData:profileLoaded,
            createdLevels:profileLevels
        }
            response.json(perfilEncontrado)
            response.status(200).json({"estatus":"Perfil-encontrado-y-cargado"})
        }
}