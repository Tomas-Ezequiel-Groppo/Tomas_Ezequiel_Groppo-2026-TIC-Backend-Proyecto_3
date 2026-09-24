//ARCHIVO DE FUNCIONES PARA LAS APIS

import fs from 'fs'
import express from 'express'

import type { Express, Request, Response } from 'express';
import type {Profile} from './tipos.js'
import type {Objeto, Elemento, Nivel} from './tipos.js'

import type {RequestSaveProfile, RequestLoadProfile} from './request&responseTypes.js'

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
export function loadProfile(request:RequestLoadProfile, response:Response){
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
export function loadLevels (request:Request , response:Response){

}