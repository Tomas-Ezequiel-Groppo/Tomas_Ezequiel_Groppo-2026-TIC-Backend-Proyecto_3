//ARCHIVO DE FUNCIONES PARA LAS APIS

import fs from 'fs'
import express from 'express'

import type { Express, Request, Response } from 'express';

import type {Profile, WholeProfile, Config} from './tipos.js'
import type {Objeto, Elemento, Nivel} from './tipos.js'
import type { SaveFile } from './tipos.js';

import type {RequestSaveProfile, RequestLogProfile, RequestLoadProfile, RequestLoadConfig, RequestSaveConfig} from './request&responseTypes.js'
import type { RequestLoadLevels , RequestLoadLevelsUsers, RequestSaveLevel, RequestLoadLevel } from './request&responseTypes.js';

import type { RequestLoadSaveFile } from './request&responseTypes.js';
import type { ResponseLoadSaveFile } from './request&responseTypes.js';

import type { ResponseSaveProfile , ResponseLogProfile, ResponseSaveConfig, ResponseLoadProfile, ResponseLoadConfig} from './request&responseTypes.js';
import type { ResponseSaveLevel, ResponseLoadLevels, ResponseLoadLevelUsers, ResponseLoadLevel} from './request&responseTypes.js';

import type { RequestLoadOgLevels, RequestCompleteLevel, RequestLoadOgLevel } from './request&responseTypes.js';
import type { ResponseLoadOgLevels, ResponseCompleteLevel, ResponseLoadOgLevel} from './request&responseTypes.js';

const app:Express= express();

const mainarchivojson = 'data/main.json';
const mainNivelesjson = 'data/niveles.json'

const mainjsontxtcompleto : string = fs.readFileSync(mainarchivojson, "utf-8");
const mainjsonjsoncompleto : Profile[] = JSON.parse(mainjsontxtcompleto);

const nivelesjsontxtcompleto:string=fs.readFileSync(mainNivelesjson, "utf-8");
const nivelesjsonjsoncompleto: Nivel[]= JSON.parse(nivelesjsontxtcompleto);

export function saveProfile(request: RequestSaveProfile, response:ResponseSaveProfile){
    let n:number=0;
    let yaExiste:boolean=false;

    let configstxt:string=fs.readFileSync("./data/configs.json" , "utf-8");
    let configsjson:Config[]=JSON.parse(configstxt);
    let configPred:Config={
        theme:"Dark",
        volume:75,
        resolution:"1920x1080",
        user:request.body.username
    }

    let saveFiletxt:string=fs.readFileSync("./data/saveFiles.json", "utf-8");
    let saveFilejson:SaveFile[]=JSON.parse(saveFiletxt);
    let saveFilePred:SaveFile={
        nivelesOG1:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesOG2:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesOG3:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesCreados:[],
        usernsame:request.body.username
    }

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
     response.status(409).json({estatus:"Perfil-ya-existe"})
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
    configsjson.push(configPred)
    let configsjsontxt:string=JSON.stringify(configsjson)
    fs.writeFileSync("./data/configs.json" , configsjsontxt);
    saveFilejson.push(saveFilePred);
    let saveFilejsontxt:string=JSON.stringify(saveFilejson);
    fs.writeFileSync("./data/saveFiles.json" , saveFilejsontxt);
    response.status(200).json({estatus:"Perfil-guardado"})
}
}
export function logProfile(request:RequestLogProfile, response:ResponseLogProfile){
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
         response.json({estatus:"Logueado-correctamente"})
         response.status(200);
     }
     else{
         response.json({estatus:"Contraseña-incorrecta"})
         response.status(401);
     }
    }
    else{
        response.json({estatus:"Usuario-y/o-contraseña-incorrecta"});
        response.status(404);
    }
}
export function loadLevels (request:RequestLoadLevels , response:ResponseLoadLevels){
     let lista:string=fs.readFileSync("./data/niveles.json" , "utf-8");
     let listajson: Nivel[]=JSON.parse(lista);
     response.json(listajson)
}
export function loadLevelsUsers (request:RequestLoadLevelsUsers, response:ResponseLoadLevelUsers){
let listaOG :string = fs.readFileSync("./data/niveles.json", "utf-8");
let listajsonOG : Nivel[]=JSON.parse(listaOG);
let usuario=request.params.username;
let n: number = 0;
let listajson: Nivel[]=[];
let listavacia:Nivel[]=[];
let userExists:boolean=false
while (n<listajsonOG.length){
  if (listajsonOG[n].usuario===usuario){
     listajson.push(listajsonOG[n]);
     userExists=true;
     n++;
  }
  else{
    n++;
  }
}
if (userExists===true){
    if (listajson===listavacia){
        response.status(404).json({estatus:"No-se-han-encontrado-niveles-a-nombre-de-ese-usuario"});
       }
       response.json(listajson);
}
else{
    response.status(404).json({estatus:"No-se-ha-encontrado-el-usuario-marcado"});
}

}
export function saveLevel (request:RequestSaveLevel, response:ResponseSaveLevel){
  let lista:string=fs.readFileSync("./data/niveles.json", "utf-8");
     let listajson: Nivel[] = JSON.parse(lista);

    let newLevel: Nivel = {
        elementos:request.body.elementos,
        usuario:request.body.usuario,
        nombre:request.body.nombre,
        id:listajson.length+1
     }
     
     listajson.push(newLevel);
     let nuevalistatxt:string = JSON.stringify(listajson);
     fs.writeFileSync("./data/niveles.json", nuevalistatxt);
     response.status(200).json({estatus:"Nivel guardado"})
}
export function loadProfile (request:RequestLoadProfile, response:ResponseLoadProfile){
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
            response.status(404).json({estatus:"Perfil-no-encontrado"})
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
        }
}
export function loadLevel (request:RequestLoadLevel, response:ResponseLoadLevel){
    let listaNivelesOGtxt:string=fs.readFileSync("./data/niveles.json", "utf-8");
    let listaNivelesOGjson:Nivel[]=JSON.parse(listaNivelesOGtxt);

    let nivelVacio:Nivel={
         elementos:[],
    usuario:"",
    id:0,
    nombre:""
    }
    let n:number = 0;

    let nivelQueHayQueCargar:Nivel= nivelVacio

    while (n<listaNivelesOGjson.length){
        if (listaNivelesOGjson[n].nombre===request.params.nombre){
           nivelQueHayQueCargar=listaNivelesOGjson[n]
           n=listaNivelesOGjson.length;
        }
        else{
          n++;
        }
    }

    if (nivelQueHayQueCargar===nivelVacio){
        response.status(404).json({estatus:"No-se-ha-encontrado-un-nivel-con-dicho-nombre"});
    }
    else{
        response.json(nivelQueHayQueCargar);
    }
}
export function loadConfig (request:RequestLoadConfig, response:ResponseLoadConfig){
  let listaConfigOGtxt:string=fs.readFileSync("./data/configs.json", "utf-8");
  let listaConfigOGjson:Config[]=JSON.parse(listaConfigOGtxt);

  let configVacia :Config={
    theme:"",
    volume:0,
    resolution:"",
    user:""
  }
  let n :number = 0;
  let configCargada:Config={
    theme:"",
    volume:0,
    resolution:"",
    user:""
  }

  while (n<listaConfigOGjson.length){
   
    if (listaConfigOGjson[n].user===request.params.username){
       configCargada.user=listaConfigOGjson[n].user;
       configCargada.resolution=listaConfigOGjson[n].resolution;
       configCargada.theme=listaConfigOGjson[n].theme;
       configCargada.volume=listaConfigOGjson[n].volume;
       n++;
    }
    else{
        n++;
    }

  }
    if (configCargada.user===configVacia.user){
        response.status(404).json({estatus:"Usuario-no-encontrado"});
    }
    else{
        response.json(configCargada)
    }
}
export function saveConfig (request:RequestSaveConfig, response:ResponseSaveConfig){

    let listaConfigsOGtxt:string=fs.readFileSync("./data/configs.json", "utf-8");
    let listaConfigsOGjson:Config[]=JSON.parse(listaConfigsOGtxt);

    let configNueva:Config={
        theme:request.body.theme,
        volume:request.body.volume,
        resolution:request.body.resolution,
        user:request.params.username
    }

    let n:number=0;
    let lamisma:number=0;
    
     while (n<listaConfigsOGjson.length){
        if (listaConfigsOGjson[n].user===configNueva.user&&listaConfigsOGjson[n].resolution===configNueva.resolution&&listaConfigsOGjson[n].theme===configNueva.theme&&listaConfigsOGjson[n].volume===configNueva.volume){
            lamisma=1;
            n=listaConfigsOGjson.length;
        }
        else{
            lamisma=0;
            n++;
        }
     }

     if (lamisma===0){

      let listaDeConfigsPreliminar: Config[]=[];
    
      while (listaConfigsOGjson.length>0){
        if (listaConfigsOGjson[n-1].user===configNueva.user){
            listaConfigsOGjson.pop();
            n--;
           
        }
        else{
            listaDeConfigsPreliminar.push(listaConfigsOGjson[n-1]);
            listaConfigsOGjson.pop();
            n--;
        }
      }
n=0;
      while (n<listaDeConfigsPreliminar.length){
        listaConfigsOGjson.push(listaDeConfigsPreliminar[n]);
        n++;
      }
      while (listaDeConfigsPreliminar.length>0){
        listaDeConfigsPreliminar.pop()
      }
     
      listaConfigsOGjson.push(configNueva);
      let listaConfigOGjsontxt:string=JSON.stringify(listaConfigsOGjson)
      fs.writeFileSync("./data/configs.json", listaConfigOGjsontxt)
      response.status(200).json({estatus:"Nueva-configuracion-guardada"})
        }
        else{
            response.json({estatus:"Misma-configuracion"})
        }

    
}
export function loadLevelsOG (request:RequestLoadOgLevels , response:ResponseLoadOgLevels){
     let lista:string=fs.readFileSync("./data/nivelesOriginales.json" , "utf-8");
     let listajson: Nivel[]=JSON.parse(lista);
     response.json(listajson)
}
export function loadSaveFile (request:RequestLoadSaveFile , response:ResponseLoadSaveFile){
   let usuario:string=request.params.username
   let n:number=0;

   let saveFilestxt:string=fs.readFileSync("./data/saveFiles.json", "utf-8");
   let saveFilesjson: SaveFile[] = JSON.parse(saveFilestxt);
   let requestedSaveFile: SaveFile = {
       nivelesOG1:[],
       nivelesOG2:[],
       nivelesOG3:[],
       nivelesCreados:[],
       usernsame:""
   }

   while (n<saveFilesjson.length){
    if (saveFilesjson[n].usernsame===usuario){
          requestedSaveFile.nivelesOG1=saveFilesjson[n].nivelesOG1;
          requestedSaveFile.nivelesOG2=saveFilesjson[n].nivelesOG2;
          requestedSaveFile.nivelesOG3=saveFilesjson[n].nivelesOG3;
          requestedSaveFile.nivelesCreados=saveFilesjson[n].nivelesCreados;
          requestedSaveFile.usernsame=request.params.username;
          n=saveFilesjson.length;
    }
    else{
        n++;
    }
   }
   if (requestedSaveFile.usernsame===""){
      response.status(404).json({estatus:"Archivo-de-guardado-no-encontrado"});
   }
   else{
    response.json(requestedSaveFile);
   }
   
}
export function completeLevel (request:RequestCompleteLevel, response:ResponseCompleteLevel){
  let numNivel:number=Number(request.params.numNivel)-1;
  let usuario=request.body.username;
  let saveFile=Number(request.body.saveFile);
  
    let listaSaveFilestxt:string=fs.readFileSync("./data/saveFiles.json" , "utf-8");
    let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

    let n:number = 0;
    let m:number=0;
    

    while (n<listaSaveFilesjson.length){
        if (listaSaveFilesjson[n].usernsame===usuario){
            m=n
            n=listaSaveFilesjson.length
        }
        else{
            n++;
        }
    }
    if (numNivel<1 || numNivel>15){
       response.status(404).json({estatus:"No-hay-tal-nivel"});
    }
    else{
    
    if (saveFile===1){
       listaSaveFilesjson[m].nivelesOG1[numNivel]=true;
       let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson);
       fs.writeFileSync("./data/saveFiles.json", listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else if (saveFile===2){
        listaSaveFilesjson[m].nivelesOG2[numNivel]=true;
         let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson);
       fs.writeFileSync("./data/saveFiles.json", listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else if (saveFile===3){
        listaSaveFilesjson[m].nivelesOG3[numNivel]=true;
         let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson);
       fs.writeFileSync("./data/saveFiles.json", listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else{
        response.status(404).json({estatus:"No-hay-tal-archivo-de-guardado"});
    }
    }
}
export function loadLevelOG(request:RequestLoadOgLevel, response:ResponseLoadOgLevel){
  let listaNivelesOGtxt:string=fs.readFileSync("./data/nivelesOriginales.json", "utf-8");
  let listaNivelesOGjson:Nivel[]=JSON.parse(listaNivelesOGtxt);
  let numNivel=Number(request.params.numNivel);

  let nivelBuscado:Nivel={
    elementos:[],
    usuario:"",
    id:0,
    nombre:""
  }

  let n:number=0;

  while (n<listaNivelesOGjson.length){
    if (listaNivelesOGjson[n].id===numNivel){
      nivelBuscado.elementos=listaNivelesOGjson[n].elementos;
      nivelBuscado.id=listaNivelesOGjson[n].id;
      nivelBuscado.nombre=listaNivelesOGjson[n].nombre
      n=listaNivelesOGjson.length
    }
    else{
      n++;
    }
  }
   if (nivelBuscado.id===0){
response.status(404).json({estatus:"Nivel-no-encontrado"})
   }
   else{
response.json(nivelBuscado);
   }
   
}