//ARCHIVO DE LOS TIPOS DE RESPONSE Y REQUEST

import type {Request, Response } from 'express';
import type {Nivel, WholeProfile, Config} from './tipos.js'

type UserProfile = {
    username:string,
    password:string
}
type UserUsername = {
    username:string
}
type ConfigNoUser={
    theme:string,
    volume:number,
    resolution:string
}

//Usuarios

export type RequestSaveProfile = Request<unknown, unknown , UserProfile>
export type RequestSaveConfig = Request<UserUsername, Config, ConfigNoUser> 
export type RequestLogProfile = Request<unknown,unknown , UserProfile>
export type RequestLoadProfile = Request<UserUsername, WholeProfile>
export type RequestLoadConfig = Request<UserUsername, Config>

//Niveles

export type RequestSaveLevel = Request<unknown, Nivel, Nivel>
export type RequestLoadLevels = Request<unknown, Nivel[]>
export type RequestLoadLevelsUsers = Request<UserUsername, Nivel[]>
export type RequestLoadLevel = Request<{nombre:string},Nivel>
