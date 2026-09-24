//ARCHIVO DE LOS TIPOS DEL PROYECTO

export type Profile = {username:string ; password:string ; profileID:number};

export type Objeto = {orientacion:string|null;propiedadEspecial:string|null};
export type ElementoPP = {propiedadEspecial:string}
export type Elemento ={tipo:Objeto | ElementoPP; posicionX:number; posicionY:number}|null;
export type Nivel = Elemento[];