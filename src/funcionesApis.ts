import fs from 'fs'
import express from 'express'
import type { Express, Request, Response } from 'express';

const app:Express= express();

type RequestSaveProfile = Request<unknown, unknown , {username:string;password:string}>
type RequestLoadProfile = Request<unknown,unknown , {username:string;password:string}>

type Profile = {username:string ; password:string ; profileID:number};
type Objeto = {orientacion:string|null;propiedadEspecial:string|null};
type Elemento ={tipo:Objeto; posicionX:number; posicionY:number}|null;

const archivojson = 'data/main.json';
const jsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");
const jsonjsoncompleto : Profile[] = JSON.parse(jsontxtcompleto);


export function saveProfile(request: RequestSaveProfile, response:Response){
    let n:number=0;
    let yaExiste:boolean=false;

    while (n<jsonjsoncompleto.length){
        if (request.body.username===jsonjsoncompleto[n]!.username){
            yaExiste=true
            n=jsonjsoncompleto.length;
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
        profileID:jsonjsoncompleto.length+1,
    }
    let jsonnuevofun : string ="";

    jsonjsoncompleto.push(newProfile);
    jsonnuevofun=JSON.stringify(jsonjsoncompleto, null, 1);
    fs.writeFileSync(archivojson,jsonnuevofun);
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
  
  while (n<jsonjsoncompleto.length){
    if (logProfile.username===jsonjsoncompleto[n]!.username){
        existeElUsername=true;
        correctProfile=jsonjsoncompleto[n]
        n=jsonjsoncompleto.length;
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