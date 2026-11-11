//ARCHIVO DE LOS TIPOS DEL PROYECTO

export type Profile = {username:string , password:string , profileID:number};
export type ProfileNoPassword = {username:string , profileID:number}
export type WholeProfile={
    profileData:ProfileNoPassword,
    createdLevels:Nivel[]
}
type Portal ={
    propiedadEspecial:string,
    posicionXPortalB:number,
    posicionYPortalB:number
}
export type Objeto = {orientacion:string|null;propiedadEspecial:string|null|Portal};
export type ElementoPP = {propiedadEspecial:string|null}
export type Elemento ={tipo:Objeto | ElementoPP; posicionX:number; posicionY:number}|null;
export type Nivel = {
    elementos:Elemento[],
    usuario:string,
    id:number,
    nombre:string,
    usuariosQueCompletaron: string[],
    version:number,
    publicado:boolean,
    descargas:string[],
    cantidadDescargas:number
}
export type Config = {
    theme:string,
    volumeMusic:number,
    volumeSFX:number,
    language:string,
    user:string
}
export type SaveFile = {
    nivelesOG1:boolean[],
    nivelesOG2:boolean[],
    nivelesOG3:boolean[],
    nivelesCreados:Nivel[],
    username:string,
    nivelesGuardados:Nivel[],
    id:number
}