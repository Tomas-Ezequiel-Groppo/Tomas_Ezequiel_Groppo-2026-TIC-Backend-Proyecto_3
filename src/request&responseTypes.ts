//ARCHIVO DE LOS TIPOS DE RESPONSE Y REQUEST

import type {Request, Response } from 'express';
import type {Nivel, WholeProfile, Config} from './tipos.js'
import type { SaveFile } from './tipos.js';

type UserProfile = {
    username:string,
    password:string
}
export type UserUsername = {
    username:string
}
type ConfigNoUser={
    theme:string,
    volume:number,
    resolution:string
}

type Estatus={
    estatus:string
}

//REQUEST

//Usuarios

export type RequestSaveProfile = Request<unknown, unknown , UserProfile>;
export type RequestSaveConfig = Request<UserUsername, unknown, ConfigNoUser>;
export type RequestLogProfile = Request<unknown,unknown , UserProfile>;
export type RequestLoadProfile = Request<UserUsername, WholeProfile>;
export type RequestLoadConfig = Request<UserUsername, Config>;


//Niveles

export type RequestSaveLevel = Request<unknown, Estatus, Nivel>;
export type RequestLoadLevels = Request<unknown, Nivel[]>;
export type RequestLoadLevelsUsers = Request<UserUsername, Nivel[]>;
export type RequestLoadLevel = Request<{nombre:string},Nivel>;
export type RequestLoadOgLevels = Request<unknown, Nivel[]>;
export type RequestCompleteLevel = Request<{numNivel:string}, Estatus, UserUsername & {saveFile:string}>;
export type RequestLoadOgLevel = Request<{numNivel:string}, Nivel>
export type RequestPublishLevel= Request<UserUsername, Estatus , {nombre:string}>;
export type RequestCompleteOnlineLevel = Request<{nombre:string}, Estatus , UserUsername>;
export type RequestUpdateLevel = Request<{nombre:string}, Estatus, Nivel>;
export type RequestHideLevel = Request<{nombre:string}, Estatus>;
export type RequestUpdateLevelNameOnline=Request<{id:string}, Estatus , {nombre:string}>;
export type RequestUpdateLevelNameOffline=Request<{id:string}, Estatus, {nombre:string}&{username:string}>;
export type RequestDeleteLevel = Request<{id:string}, Estatus, UserUsername>

//SaveFile

export type RequestLoadSaveFile = Request<UserUsername,SaveFile>;
export type RequestSaveLevelUser = Request<{nombre:string}, Estatus , UserUsername>;

//RESPONSE

//Usuarios

export type ResponseSaveProfile = Response<Estatus>;
export type ResponseSaveConfig = Response<Estatus>;
export type ResponseLogProfile = Response<Estatus>;
export type ResponseLoadProfile = Response<Estatus | WholeProfile>;
export type ResponseLoadConfig = Response<Estatus | Config>;

//Niveles

export type ResponseSaveLevel = Response<Estatus | Nivel>;
export type ResponseLoadLevels = Response<Estatus | Nivel[]>;
export type ResponseLoadLevelUsers = Response<Estatus | Nivel[]>;
export type ResponseLoadLevel = Response<Estatus | Nivel>;
export type ResponseLoadOgLevels = Response<Estatus | Nivel[]>;
export type ResponseCompleteLevel = Response<Estatus>;
export type ResponseLoadOgLevel = Response<Estatus | Nivel>;
export type ResponsePublishLevel = Response<Estatus>;
export type ResponseCompleteOnlineLevel = Response<Estatus>;
export type ResponseUpdateLevel = Response<Estatus>;
export type ResponseHideLevel = Response <Estatus>;
export type ResponseUpdateLevelNameOnline= Response<Estatus>;
export type ResponseUpdateLevelNameOffline=Response<Estatus>;
export type ResponseDeleteLevel=Response<Estatus>;

//SaveFile

export type ResponseLoadSaveFile = Response<Estatus | SaveFile>;
export type ResponseSaveLevelUser = Response <Estatus>