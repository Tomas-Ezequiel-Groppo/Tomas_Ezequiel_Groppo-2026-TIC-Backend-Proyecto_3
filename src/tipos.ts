//ARCHIVO DE LOS TIPOS DEL PROYECTO

export type Profile = {username:string ; password:string ; profileID:number};
export type WholeProfile={
    profileData:Profile,
    createdLevels:Nivel[]
}

export type Objeto = {orientacion:string|null;propiedadEspecial:string|null};
export type ElementoPP = {propiedadEspecial:string}
export type Elemento ={tipo:Objeto | ElementoPP; posicionX:number; posicionY:number}|null;
export type Nivel = {
    elementos:Elemento[],
    usuario:string,
    id:number,
    nombre:string
}
export type Config = {
    theme:string,
    volume:number,
    resolution:string,
    user:string
}
export type SaveFile = {
    nivelesOG1:boolean[],
    nivelesOG2:boolean[],
    nivelesOG3:boolean[],
    nivelesCreados:Nivel[],
    usernsame:string
}