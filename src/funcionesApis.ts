//ARCHIVO DE FUNCIONES PARA LAS APIS

import fs from 'fs'

import type {Profile, WholeProfile, Config} from './tipos.js'
import type {Nivel} from './tipos.js'
import type { SaveFile } from './tipos.js';

import type {RequestSaveProfile, RequestLogProfile, RequestLoadProfile, RequestLoadConfig, RequestSaveConfig, RequestSaveLevelUser, ResponseSaveLevelUser} from './request&responseTypes.js'
import type { RequestLoadLevels , RequestLoadLevelsUsers, RequestSaveLevel, RequestLoadLevel, RequestPublishLevel } from './request&responseTypes.js';

import type { RequestLoadSaveFile, RequestDeleteSavedLevel, RequestShowUserProgress} from './request&responseTypes.js';
import type { ResponseLoadSaveFile, ResponseDeleteSavedLevel, ResponseShowUserProgress} from './request&responseTypes.js';

import type { ResponseSaveProfile , ResponseLogProfile, ResponseSaveConfig, ResponseLoadProfile, ResponseLoadConfig} from './request&responseTypes.js';
import type { ResponseSaveLevel, ResponseLoadLevels, ResponseLoadLevelUsers, ResponseLoadLevel, ResponsePublishLevel} from './request&responseTypes.js';

import type { RequestLoadOgLevels, RequestCompleteLevel, RequestLoadOgLevel, RequestCompleteOnlineLevel, RequestUpdateLevel, RequestHideLevel, RequestUpdateLevelNameOnline, RequestUpdateLevelNameOffline, RequestDeleteLevel} from './request&responseTypes.js';
import type { ResponseLoadOgLevels, ResponseCompleteLevel, ResponseLoadOgLevel, ResponseCompleteOnlineLevel, ResponseUpdateLevel, ResponseHideLevel, ResponseUpdateLevelNameOnline, ResponseUpdateLevelNameOffline, ResponseDeleteLevel} from './request&responseTypes.js';

const rutaMainjson:string = "./data/main.json";
const rutaNivelesjson:string = "./data/niveles.json";
const rutaNivelesOgjson:string = "./data/nivelesOriginales.json";
const rutaConfigsjson:string = "./data/configs.json";
const rutaSaveFilesjson:string= "./data/saveFiles.json";

const mainjsontxtcompleto : string = fs.readFileSync(rutaMainjson, "utf-8");
const mainjsonjsoncompleto : Profile[] = JSON.parse(mainjsontxtcompleto);

const nivelesjsontxtcompleto:string=fs.readFileSync(rutaNivelesjson, "utf-8");
const nivelesjsonjsoncompleto: Nivel[]= JSON.parse(nivelesjsontxtcompleto);

export function saveProfile(request: RequestSaveProfile, response:ResponseSaveProfile){
    let n:number=0;
    let yaExiste:boolean=false;

    let configstxt:string=fs.readFileSync(rutaConfigsjson , "utf-8");
    let configsjson:Config[]=JSON.parse(configstxt);
    let configPred:Config={
        theme:"Dark",
        volume:75,
        resolution:"1920x1080",
        user:request.body.username
    }

    let saveFiletxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
    let saveFilejson:SaveFile[]=JSON.parse(saveFiletxt);
    let saveFilePred:SaveFile={
        nivelesOG1:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesOG2:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesOG3:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        nivelesCreados:[],
        username:request.body.username,
        nivelesGuardados:[]
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
    fs.writeFileSync(rutaMainjson,jsonnuevofun);
    configsjson.push(configPred)
    let configsjsontxt:string=JSON.stringify(configsjson, null, 1)
    fs.writeFileSync(rutaConfigsjson , configsjsontxt);
    saveFilejson.push(saveFilePred);
    let saveFilejsontxt:string=JSON.stringify(saveFilejson, null, 1);
    fs.writeFileSync(rutaSaveFilesjson , saveFilejsontxt);
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
         response.status(401).json({estatus:"Contraseña-incorrecta"});
     }
    }
    else{
        response.status(404).json({estatus:"Usuario-y/o-contraseña-incorrecta"});
    }
}
export function loadLevels (request:RequestLoadLevels , response:ResponseLoadLevels){
     let lista:string=fs.readFileSync(rutaNivelesjson , "utf-8");
     let listajson: Nivel[]=JSON.parse(lista);

     let listaNivelesVisibles:Nivel[]=[]

     let n:number=0;
     while (n<listajson.length){
        if (listajson[n].publicado===true){
        listaNivelesVisibles.push(listajson[n]);
        n++;
        }
        else{
        n++;
        }
     }
     response.json(listaNivelesVisibles);
}
export function loadLevelsUsers (request:RequestLoadLevelsUsers, response:ResponseLoadLevelUsers){
let listaOG :string = fs.readFileSync(rutaNivelesjson, "utf-8");
let listajsonOG : Nivel[]=JSON.parse(listaOG);
let usuario=request.params.username;
let n: number = 0;
let listajson: Nivel[]=[];
let listavacia:Nivel[]=[];
let userExists:boolean=false;
while (n<listajsonOG.length){
  if (listajsonOG[n].usuario===usuario){

    if (listajsonOG[n].publicado===true){
        listajson.push(listajsonOG[n]);
    }
     userExists=true;
     n++;
  }
  else{
    n++;
  }
}
if (userExists===true){
    if (listajson.length===listavacia.length){
        response.status(404).json({estatus:"No-se-han-encontrado-niveles-a-nombre-de-ese-usuario"});
       }
       else{
        response.json(listajson);
       }
}
else{
    response.status(404).json({estatus:"No-se-ha-encontrado-el-usuario-marcado"});
}

}
export function saveLevel (request:RequestSaveLevel, response:ResponseSaveLevel){
  let listaSaveFiles:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
     let listasaveFilesjson: SaveFile[] = JSON.parse(listaSaveFiles);

     let usuario:string=request.body.usuario;

     let saveFileAModificar:SaveFile={
        nivelesOG1:[],
        nivelesOG2:[],
        nivelesOG3:[],
        nivelesCreados:[],
        username:"",
        nivelesGuardados:[]
     }
     let n:number = 0;
     let m:number= 0;

     while (n<listasaveFilesjson.length){
          if (listasaveFilesjson[n].username===usuario){
              saveFileAModificar.nivelesOG1=listasaveFilesjson[n].nivelesOG1;
              saveFileAModificar.nivelesOG2=listasaveFilesjson[n].nivelesOG2;
              saveFileAModificar.nivelesOG3=listasaveFilesjson[n].nivelesOG3;
              saveFileAModificar.nivelesCreados=listasaveFilesjson[n].nivelesCreados;
              saveFileAModificar.username=listasaveFilesjson[n].username;
              m=n;
              n=listasaveFilesjson.length;
          }
          else{
            n++;
          }
     }

     let i:number = 0;

     let mayorValor:number=0;

     while (i<saveFileAModificar.nivelesCreados.length){
        if (i===0){
            mayorValor=saveFileAModificar.nivelesCreados[i].id;
        }
        else if (i<mayorValor){
            mayorValor=mayorValor;
        }
        else{
            mayorValor=i;
        }
        i++;
     }
     mayorValor=mayorValor+1;

     if (saveFileAModificar.username===""){
response.status(404).json({estatus:"Perfil-no-encontrado"});
     }
     else{

    let newLevel: Nivel = {
        elementos:request.body.elementos,
        usuario:usuario,
        nombre:request.body.nombre,
        id:mayorValor,
        usuariosQueCompletaron:[],
        version:0,
        publicado:false,
        descargas:[],
        cantidadDescargas:0
     }
    let vacioLevel:Nivel={
        elementos:[],
        usuario:"",
        nombre:"",
        id:0,
        usuariosQueCompletaron:[],
        version:0,
        publicado:false,
        descargas:[],
        cantidadDescargas:0
    }
     if (newLevel.elementos===vacioLevel.elementos){
        response.status(400).json({estatus:"Nivel-vacio"});
     }
     else if (newLevel.nombre===vacioLevel.nombre){
        response.status(400).json({estatus:"No-se-le-ha-puesto-nombre-al-nivel"});
     }
     else if (newLevel.usuario===vacioLevel.usuario){
        response.status(400).json({estatus:"No-se-especifico-un-usuario"});
     }
     else{

    let o:number=0;
    let existe:boolean=false;

    while (o<saveFileAModificar.nivelesCreados.length){
        if (saveFileAModificar.nivelesCreados[o].nombre===newLevel.nombre){
           existe=true;
           o=saveFileAModificar.nivelesCreados.length
        }
        else{
            o++;
        }
    }

    if (existe===true){
     let listaMedia:Nivel[]=[];
     

let p:number=0;
     while (0<saveFileAModificar.nivelesCreados.length){
             p=saveFileAModificar.nivelesCreados.length-1
        if (saveFileAModificar.nivelesCreados[p].nombre===newLevel.nombre){
            newLevel.id=saveFileAModificar.nivelesCreados[p].id;
         saveFileAModificar.nivelesCreados.pop();
        }
        else{
            listaMedia.push(saveFileAModificar.nivelesCreados[p]);
            saveFileAModificar.nivelesCreados.pop();
        }
     }
     while (0<listaMedia.length){
        p=listaMedia.length-1;
        saveFileAModificar.nivelesCreados.push(listaMedia[p]);
        listaMedia.pop()
     }
 saveFileAModificar.nivelesCreados.push(newLevel);
        listasaveFilesjson[m]=saveFileAModificar;
        let nuevalistatxt:string = JSON.stringify(listasaveFilesjson,null,1);
        fs.writeFileSync("./data/saveFiles.json", nuevalistatxt);
        response.status(200).json({estatus:"Nivel-guardado"});
    }
    else{
  saveFileAModificar.nivelesCreados.push(newLevel);
        listasaveFilesjson[m]=saveFileAModificar
        let nuevalistatxt:string = JSON.stringify(listasaveFilesjson,null,1);
        fs.writeFileSync("./data/saveFiles.json", nuevalistatxt);
        response.status(200).json({estatus:"Nivel-guardado"})
    }
     }
     } 
}
export function loadProfile (request:RequestLoadProfile, response:ResponseLoadProfile){
      let listaUsersOGtxt:string=fs.readFileSync(rutaMainjson, "utf-8");
      let listaUsersOGjson: Profile[]=JSON.parse(listaUsersOGtxt);
      
      let listaLevelsOGtxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
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
    let listaNivelesOGtxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
    let listaNivelesOGjson:Nivel[]=JSON.parse(listaNivelesOGtxt);

    let nivelVacio:Nivel={
         elementos:[],
    usuario:"",
    id:0,
    nombre:"",
    usuariosQueCompletaron:[],
    version:0,
    publicado:false,
    descargas:[],
    cantidadDescargas:0
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

        if (nivelQueHayQueCargar.publicado===false){
            response.status(404).json({estatus:"Nivel-esta-en-oculto"});
        }
        else{
            response.json(nivelQueHayQueCargar);
        }
    }
}
export function loadConfig (request:RequestLoadConfig, response:ResponseLoadConfig){
  let listaConfigOGtxt:string=fs.readFileSync(rutaConfigsjson, "utf-8");
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

    let listaConfigsOGtxt:string=fs.readFileSync(rutaConfigsjson, "utf-8");
    let listaConfigsOGjson:Config[]=JSON.parse(listaConfigsOGtxt);

    let configNueva:Config={
        theme:request.body.theme,
        volume:request.body.volume,
        resolution:request.body.resolution,
        user:request.params.username
    }
    let configVacia:Config={
        theme:"",
        volume:0,
        resolution:"",
        user:""
    }


    let n:number=0;
    let lamisma:number=0;
    let existe:boolean=false
    while (n<listaConfigsOGjson.length){
        if (listaConfigsOGjson[n].user===request.params.username){
            existe=true;
            n=listaConfigsOGjson.length
        }
        else{
            n++;
        }
    }

    if (existe===true){
        n=0;
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
   
         if (configNueva===configVacia){
          response.status(404).json({estatus:"Configuracion-vacia"});
         }
         else{
   listaConfigsOGjson.push(configNueva);
         let listaConfigOGjsontxt:string=JSON.stringify(listaConfigsOGjson, null, 1);
         fs.writeFileSync("./data/configs.json", listaConfigOGjsontxt)
         response.status(200).json({estatus:"Nueva-configuracion-guardada"})
         }
        
         
           }
           else{
               response.status(200).json({estatus:"Misma-configuracion"})
           }
    }
    else{
        response.status(404).json({estatus:"Tal-perfil-no-existe"});
    }
    

    
}
export function loadLevelsOG (request:RequestLoadOgLevels , response:ResponseLoadOgLevels){
     let lista:string=fs.readFileSync(rutaNivelesOgjson , "utf-8");
     let listajson: Nivel[]=JSON.parse(lista);
     response.json(listajson)
}
export function loadSaveFile (request:RequestLoadSaveFile , response:ResponseLoadSaveFile){
   let usuario:string=request.params.username
   let n:number=0;

   let saveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
   let saveFilesjson: SaveFile[] = JSON.parse(saveFilestxt);
   let requestedSaveFile: SaveFile = {
       nivelesOG1:[],
       nivelesOG2:[],
       nivelesOG3:[],
       nivelesCreados:[],
       username:"",
       nivelesGuardados:[]
   }

   while (n<saveFilesjson.length){
    if (saveFilesjson[n].username===usuario){
          requestedSaveFile.nivelesOG1=saveFilesjson[n].nivelesOG1;
          requestedSaveFile.nivelesOG2=saveFilesjson[n].nivelesOG2;
          requestedSaveFile.nivelesOG3=saveFilesjson[n].nivelesOG3;
          requestedSaveFile.nivelesCreados=saveFilesjson[n].nivelesCreados;
          requestedSaveFile.nivelesGuardados=saveFilesjson[n].nivelesGuardados;
          requestedSaveFile.username=request.params.username;
          n=saveFilesjson.length;
    }
    else{
        n++;
    }
   }
   if (requestedSaveFile.username===""){
      response.status(404).json({estatus:"Archivo-de-guardado-no-encontrado"});
   }
   else{
    response.json(requestedSaveFile);
   }
   
}
export function completeLevel (request:RequestCompleteLevel, response:ResponseCompleteLevel){
  let numNivel:number=Number(request.params.numNivel)-1;
  let usuario:string=request.body.username;
  let saveFile=Number(request.body.saveFile);
  
    let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson , "utf-8");
    let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

    let n:number = 0;
    let m:number=0;
    let existe:boolean=false;
    

    while (n<listaSaveFilesjson.length){
        if (listaSaveFilesjson[n].username===usuario){
            m=n
            existe=true
            n=listaSaveFilesjson.length
        }
        else{
            n++;
        }
    }
    if (numNivel<1 || numNivel>15){
       response.status(404).json({estatus:"No-hay-tal-nivel"});
    }
    else if (existe===false){
        response.status(404).json({estatus:"No-se-ha-encontrado-el-usuario-correspondiente"});
    }
    
    else{

    if (saveFile===1){
       listaSaveFilesjson[m].nivelesOG1[numNivel]=true;
       let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson, null, 1);
       fs.writeFileSync(rutaSaveFilesjson, listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else if (saveFile===2){
        listaSaveFilesjson[m].nivelesOG2[numNivel]=true;
         let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson, null, 1);
       fs.writeFileSync(rutaSaveFilesjson, listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else if (saveFile===3){
        listaSaveFilesjson[m].nivelesOG3[numNivel]=true;
         let listaSaveFilesjsontxt:string=JSON.stringify(listaSaveFilesjson, null, 1);
       fs.writeFileSync(rutaSaveFilesjson, listaSaveFilesjsontxt);
       response.status(200).json({estatus:"Complecion-de-nivel-guardada"});
    }
    else{
        response.status(404).json({estatus:"No-hay-tal-archivo-de-guardado"});
    }
    }
}
export function loadLevelOG(request:RequestLoadOgLevel, response:ResponseLoadOgLevel){
  let listaNivelesOGtxt:string=fs.readFileSync(rutaNivelesOgjson, "utf-8");
  let listaNivelesOGjson:Nivel[]=JSON.parse(listaNivelesOGtxt);
  let numNivel=Number(request.params.numNivel);

  let nivelBuscado:Nivel={
    elementos:[],
    usuario:"",
    id:0,
    nombre:"",
    usuariosQueCompletaron:[],
    version:0,
    publicado:false,
    descargas:[],
    cantidadDescargas:0
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
export function publishLevel(request:RequestPublishLevel, response:ResponsePublishLevel){
let listaNivelesOnlinetxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
let listaNivelesOnlinejson: Nivel[]=JSON.parse(listaNivelesOnlinetxt);

let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);


let nivelAGuardar:Nivel={
    elementos:[],
    usuario:"",
    usuariosQueCompletaron:[],
    id:listaNivelesOnlinejson.length+1,
    nombre:"",
    version:1,
    publicado:true,
    descargas:[],
    cantidadDescargas:0
}

let usuario:string=request.params.username;

let n:number=0;
let m:number=0;

while (n<listaSaveFilesjson.length){
    if (listaSaveFilesjson[n].username===usuario){
       while (m<listaSaveFilesjson[n].nivelesCreados.length){
           if (listaSaveFilesjson[n].nivelesCreados[m].nombre===request.body.nombre){
            nivelAGuardar.elementos=listaSaveFilesjson[n].nivelesCreados[m].elementos;
            nivelAGuardar.nombre=listaSaveFilesjson[n].nivelesCreados[m].nombre;
            nivelAGuardar.usuario=listaSaveFilesjson[n].nivelesCreados[m].usuario;
            nivelAGuardar.usuariosQueCompletaron=listaSaveFilesjson[n].nivelesCreados[m].usuariosQueCompletaron;
            m=listaSaveFilesjson[n].nivelesCreados.length;
           }
           else{
            m++;
           }
       }
       n=listaSaveFilesjson.length
    }
    else{
        n++;
    }
}

if (nivelAGuardar.usuario===""){
    response.status(404).json({estatus:"Tal-nivel-no-fue-creado-por-el-usuario-correspondiente"});
}
else{
let existe:boolean=false;
let o:number=0;

while (o<listaNivelesOnlinejson.length){
    if (listaNivelesOnlinejson[o].nombre===nivelAGuardar.nombre){
      existe=true;
      o=listaNivelesOnlinejson.length
    }
    else{
        o++;
    }
}

if (existe===true){
response.status(409).json({estatus:"Ya-existe-un-nivel-con-ese-nombre"});
}
else{
listaNivelesOnlinejson.push(nivelAGuardar);
let nuevaListaNivelesOnlinetxt:string=JSON.stringify(listaNivelesOnlinejson, null, 1);
fs.writeFileSync(rutaNivelesjson, nuevaListaNivelesOnlinetxt);
response.status(200).json({estatus:"Nivel-publicado"});
}
}
}
export function completeOnlineLevel (request:RequestCompleteOnlineLevel, response:ResponseCompleteOnlineLevel){
     let listaNivelesOnlinetxt=fs.readFileSync(rutaNivelesjson, "utf-8");
     let listaNivelesOnlinejson:Nivel[]=JSON.parse(listaNivelesOnlinetxt);
     let listaPerfilestxt:string=fs.readFileSync(rutaMainjson, "utf-8");
     let listaPerfilesjson:Profile[]=JSON.parse(listaPerfilestxt);

     let existe:boolean=false;
     let yaPaso:boolean=false;
     let g:number=0;
     let i:number = 0;
     
     for (let n:number = 0; n<listaNivelesOnlinejson.length; n++){
        if (listaNivelesOnlinejson[n].nombre===request.params.nombre){
            existe=true
            for (let m:number = 0;m<listaNivelesOnlinejson[n].usuariosQueCompletaron.length; m++){
                if (listaNivelesOnlinejson[n].usuariosQueCompletaron[m]===request.body.username){
                    yaPaso=true;
                    i=m
                    m=listaNivelesOnlinejson[n].usuariosQueCompletaron.length;
                }
            }
            g=n;
            n=listaNivelesOnlinejson.length;
        }
     }

     let usuarioExiste:boolean=false;

     for (let h:number=0;h<listaPerfilesjson.length;h++){
        if (listaPerfilesjson[h].username===request.body.username){
            usuarioExiste=true;
            h=listaPerfilesjson.length;
        }
     }
     if (existe===true){

        if (usuarioExiste===true){
            if (yaPaso===true){
                response.status(409).json({estatus:"Usuario-ya-se-paso-el-nivel"});
            }
            else{
                listaNivelesOnlinejson[g].usuariosQueCompletaron.push(request.body.username);
                let listaNivelesOnlinejsontxt:string=JSON.stringify(listaNivelesOnlinejson, null, 1);
                fs.writeFileSync(rutaNivelesjson, listaNivelesOnlinejsontxt);
                response.status(200).json({estatus:"Nivel-completado"});
            }
        }
        else{
            response.status(404).json({estatus:"El-usuario-marcado-no-existe"});
        }
     }
     else{
        response.status(404).json({estatus:"Nivel-no-encontrado"});
     }
    
}
export function updateLevel (request:RequestUpdateLevel , response:ResponseUpdateLevel){
   let listaNivelesOnlinetxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
   let listaNivelesOnlinejson:Nivel[]=JSON.parse(listaNivelesOnlinetxt);

   let nombreDeNivel:string=request.params.nombre

   let nivelAActualizar: Nivel = {
    elementos:[],
    usuario:"",
    usuariosQueCompletaron:[],
    id:0,
    nombre:"",
    version:0,
    publicado:false,
    descargas:[],
    cantidadDescargas:0
   }

   let n:number = 0;
   let existe:boolean=false

   while (n<listaNivelesOnlinejson.length){
    if (listaNivelesOnlinejson[n].nombre===nombreDeNivel){
        nivelAActualizar=request.body;
        nivelAActualizar.version=listaNivelesOnlinejson[n].version+1;
        nivelAActualizar.publicado=listaNivelesOnlinejson[n].publicado
nivelAActualizar.descargas=listaNivelesOnlinejson[n].descargas
nivelAActualizar.cantidadDescargas=listaNivelesOnlinejson[n].cantidadDescargas
        listaNivelesOnlinejson[n]=nivelAActualizar;
        existe=true;
        n=listaNivelesOnlinejson.length
    }
    else{
        n++;
    }
   }
   if (nivelAActualizar.nombre!==request.params.nombre){
    response.status(400).json({estatus:"Para-cambiar-el-nombre-usa-la-otra-API"})
   }
   else{
    if (existe===true){
        let listaNivelesOnlinejsontxt:string = JSON.stringify(listaNivelesOnlinejson, null, 1);
        fs.writeFileSync("./data/niveles.json", listaNivelesOnlinejsontxt);
        response.status(200).json({estatus:"Nivel-actualizado"});
       }
       else{
        response.status(404).json({estatus:"El-nivel-no-ha-sido-publicado"});
       }
   }
}
export function saveLevelUser (request:RequestSaveLevelUser, response:ResponseSaveLevelUser){
     let listaNivelesOnlinetxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
     let listaNivelesOnlinejson:Nivel[]=JSON.parse(listaNivelesOnlinetxt);

     let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
     let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

     let n:number=0;
     let existe:boolean=false;
     let i:number=0;
     let nivelExiste:boolean=false;
     let nivelEnSaveFile:boolean=false;

     while (n<listaSaveFilesjson.length){
        if (listaSaveFilesjson[n].username===request.body.username){
            existe=true;
            i=n;
            n=listaSaveFilesjson.length;
        }
        else{
            n++;
        }
     }
     let yaDescargado:boolean=false;
     if (existe===true){
        let m:number=0;
        while (m<listaNivelesOnlinejson.length){
            if (listaNivelesOnlinejson[m].nombre===request.params.nombre){
                for (let g:number = 0;listaNivelesOnlinejson[m].descargas.length>g;g++){
                    if (listaNivelesOnlinejson[m].descargas[g]===request.body.username){
                        yaDescargado=true;
                    }
                }
                if (yaDescargado===false){
                    listaNivelesOnlinejson[m].descargas.push(request.body.username);
                    listaNivelesOnlinejson[m].cantidadDescargas=listaNivelesOnlinejson[m].descargas.length;
                }
                for (let h:number=0;h<listaSaveFilesjson[i].nivelesGuardados.length;h++){
                    if (listaSaveFilesjson[i].nivelesGuardados[h].nombre===request.params.nombre){
                        nivelEnSaveFile=true;
                    }
                }
                listaSaveFilesjson[i].nivelesGuardados.push(listaNivelesOnlinejson[m]);
                fs.writeFileSync(rutaSaveFilesjson, JSON.stringify(listaSaveFilesjson, null, 1));
                nivelExiste=true;
                m=listaNivelesOnlinejson.length
            }
            else{
                m++;
            }
        }
        if (nivelExiste===false){
            response.status(404).json({estatus:"Nivel-no-encontrado"});
        }
        else{
            if (nivelEnSaveFile===false){
                response.status(200).json({estatus:"Nivel-guardado"});
            }
            else{
                response.status(409).json({estatus:"Nivel-ya-ha-sido-guardado"})
            }
        }
     }
     else{
        response.status(404).json({estatus:"No-se-ha-encontrado-al-usuario"});
     }


}
export function hideLevel (request:RequestHideLevel, response:ResponseHideLevel){
         let listaNivelestxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
         let listaNivelesjson: Nivel[]=JSON.parse(listaNivelestxt);

         let nombreNivel:string=request.params.nombre;

         let n:number=0;
         let existe:boolean=false;

         while (n<listaNivelesjson.length){
            if (listaNivelesjson[n].nombre===nombreNivel){
                existe=true;
                listaNivelesjson[n].publicado=false;
                    fs.writeFileSync(rutaNivelesjson, JSON.stringify(listaNivelesjson, null, 1));
                n=listaNivelesjson.length;
            }
            else{
                n++;
            }
         }
         if (existe===true){
            response.status(200).json({estatus:"Nivel-ocultado"})
         }
         else{
            response.status(404).json({estatus:"Nivel-no-encontrado"});
         }
}
export function showLevel (request:RequestHideLevel, response:ResponseHideLevel){
      let listaNivelestxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
         let listaNivelesjson: Nivel[]=JSON.parse(listaNivelestxt);

         let nombreNivel:string=request.params.nombre;

         let n:number=0;
         let existe:boolean=false;

         while (n<listaNivelesjson.length){
            if (listaNivelesjson[n].nombre===nombreNivel){
                existe=true;
                listaNivelesjson[n].publicado=true;
                    fs.writeFileSync(rutaNivelesjson, JSON.stringify(listaNivelesjson, null, 1));
                n=listaNivelesjson.length;
            }
            else{
                n++;
            }
         }
         if (existe===true){
            response.status(200).json({estatus:"Nivel-mostrado"})
         }
         else{
            response.status(404).json({estatus:"Nivel-no-encontrado"});
         }
}
export function updateLevelNameOnline (request:RequestUpdateLevelNameOnline, response:ResponseUpdateLevelNameOnline){
    let listaNivelesOnlinetxt:string=fs.readFileSync(rutaNivelesjson, "utf-8");
    let listaNivelesOnlinejson:Nivel[]=JSON.parse(listaNivelesOnlinetxt);

    let nuevoNombre:string=request.body.nombre;
    let ID:number = Number(request.params.id);

    let n:number = 0;

    if (nuevoNombre===""){
        response.status(400).json({estatus:"No-se-especifico-el-nombre-del-nivel"});
    }
    else{
        while (n<listaNivelesOnlinejson.length){
        if (listaNivelesOnlinejson[n].id===ID){
            listaNivelesOnlinejson[n].nombre=nuevoNombre;
            n=listaNivelesOnlinejson.length
        }
        else{
            n++;
        }
    }

    fs.writeFileSync(rutaNivelesjson, JSON.stringify(listaNivelesOnlinejson, null, 1));

    response.status(200).json({estatus:"Nombre-de-nivel-cambiado"});
    }
    
}
export function updateLevelNameOffline (request:RequestUpdateLevelNameOffline, response:ResponseUpdateLevelNameOffline){
        let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
        let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

        let usuario:string = request.body.username;
        let nuevoNombre:string = request.body.nombre;
        let ID:number=Number(request.params.id);

        if (nuevoNombre===""){
            response.status(400).json({estatus:"No-se-ha-recibido-un-nombre"});
        }
        else{
            let n:number=0;
        let i:number = 0;
        let usuarioExiste:boolean=false;
        let nivelExiste:boolean=false;
        let m:number=0;
        let g:number =0;

        while (n<listaSaveFilesjson.length){
            if (listaSaveFilesjson[n].username===usuario){
                usuarioExiste=true;
                while (i<listaSaveFilesjson[n].nivelesCreados.length){
                    if (listaSaveFilesjson[n].nivelesCreados[i].id===ID){
                        listaSaveFilesjson[n].nivelesCreados[i].nombre=nuevoNombre;
                        nivelExiste=true;
                        fs.writeFileSync(rutaSaveFilesjson, JSON.stringify(listaSaveFilesjson, null, 1));
                        m=i;
                        i=listaSaveFilesjson[n].nivelesCreados.length;
                    }
                    else{
                        i++;
                    }
                }
                g=n
                n=listaSaveFilesjson.length;
            }
            else{
                n++;
            }
        }

        if (usuarioExiste===true){
            if (nivelExiste===true){
                response.status(200).json({estatus:"El-nombre-del-nivel-ha-sido-cambiado"});
            }
            else{
                response.status(404).json({estatus:"Nivel-no-encontrado"});
            }
        }
        else{
            response.status(404).json({estatus:"Usuario-no-encontrado"});
        }
        }
}
export function deleteLevel (request:RequestDeleteLevel , response:ResponseDeleteLevel){
    let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
    let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

    let ID:number=Number(request.params.id);
    let usuario:string=request.body.username;

    let usuarioExiste:boolean=false;

    let n:number=0;
    let m:number=0;
   
    while (n<listaSaveFilesjson.length){
        if (listaSaveFilesjson[n].username===usuario){
            usuarioExiste=true;
            m=n;
            n=listaSaveFilesjson.length;
        }
        else{
            n++;
        }
    }
    let listaMedia:Nivel[]=[];

    let i:number = 0;

    while (0<listaSaveFilesjson[m].nivelesCreados.length){

        i = listaSaveFilesjson[m].nivelesCreados.length-1;

        if (listaSaveFilesjson[m].nivelesCreados[i].id===ID){
            listaSaveFilesjson[m].nivelesCreados.pop()
        }
        else{
            listaMedia.push(listaSaveFilesjson[m].nivelesCreados[i]);
            listaSaveFilesjson[m].nivelesCreados.pop()
        }
    }

    while (0<listaMedia.length){
        i=listaMedia.length-1;
        listaSaveFilesjson[m].nivelesCreados.push(listaMedia[i]);
        listaMedia.pop()
    }
    
    fs.writeFileSync(rutaSaveFilesjson, JSON.stringify(listaSaveFilesjson, null, 1));

    if (usuarioExiste===true){
        response.status(200).json({estatus:"Nivel-eliminado"});
    }
    else{
        response.status(404).json({estatus:"Usuario-no-encontrado"});
    }
}
export function deleteSavedLevel (request:RequestDeleteSavedLevel, response:ResponseDeleteSavedLevel){
    let listaSaveFilesjsontxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
    let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilesjsontxt);

    let nombreNivel:string=request.params.nombre;
    let usuario:string=request.body.username;
    console.log(usuario);

    if (usuario===""){
        response.status(400).json({estatus:"No-se-especifico-un-usuario"});
    }
    else if (nombreNivel===""){
        response.status(400).json({estatus:"No-se-especifico-el-nombre-del-nivel-a-borrar"})
    }
    else{
        let n:number = 0;
    let m:number = 0;
    let usuarioExiste:boolean = false;

    while (n<listaSaveFilesjson.length){
        if (listaSaveFilesjson[n].username===usuario){
            usuarioExiste=true
            m=n
            n=listaSaveFilesjson.length
        }
        else{
            n++;
        }
    }
    if (usuarioExiste===true){
        let i:number = 0;
        let listaMedia:Nivel[]=[]
        while (0<listaSaveFilesjson[m].nivelesGuardados.length){
            i = listaSaveFilesjson[m].nivelesGuardados.length-1
            if (listaSaveFilesjson[m].nivelesGuardados[i].nombre===nombreNivel){
                listaSaveFilesjson[m].nivelesGuardados.pop()
            }
            else{
                listaMedia.push(listaSaveFilesjson[m].nivelesGuardados[i]);
                listaSaveFilesjson[m].nivelesGuardados.pop()
            }
        }

        while (listaMedia.length>0){
            i=listaMedia.length-1;
            listaSaveFilesjson[m].nivelesGuardados.push(listaMedia[i]);
            listaMedia.pop()
        }
        fs.writeFileSync(rutaSaveFilesjson, JSON.stringify(listaSaveFilesjson,null,1));
        response.status(200).json({estatus:"Nivel-eliminado-correctamente"});
    }
    else{
        response.status(404).json({estatus:"Usuario-no-encontrado"});
    }
    }
}
export function showUserProgress (request:RequestShowUserProgress, response:ResponseShowUserProgress){
    let listaSaveFilestxt:string=fs.readFileSync(rutaSaveFilesjson, "utf-8");
    let listaSaveFilesjson:SaveFile[]=JSON.parse(listaSaveFilestxt);

    let usuario:string=request.params.username;
    let saveFile:number=Number(request.body.saveFile);

    if (usuario===""){
        response.status(400).json({estatus:"No-se-especifico-ningun-usuario"});
    }
    else if (saveFile===0){
        response.status(400).json({estatus:"El-Save-File-marcado-no-existe"});
    }
    else{
        let usuarioExiste:boolean=false;
        let m:number=0;
        for (let n:number=0;n<listaSaveFilesjson.length;n++){
            if (listaSaveFilesjson[n].username===usuario){
                usuarioExiste=true;
                m=n;
                n=listaSaveFilesjson.length;
            }
            else{
                n=n;
            }
        }

        if (usuarioExiste===true){
            if (saveFile===1){
                response.json(listaSaveFilesjson[m].nivelesOG1);
            }
            else if (saveFile===2){
                response.json(listaSaveFilesjson[m].nivelesOG2);
            }
            else if (saveFile===3){
                response.json(listaSaveFilesjson[m].nivelesOG3);
            }
            else{
                response.status(400).json({estatus:"El-Save-File-marcado-no-existe"});;
            }
        }
        else{
            response.status(404).json({estatus:"Usuario-no-encontrado"});
        }
    }
}