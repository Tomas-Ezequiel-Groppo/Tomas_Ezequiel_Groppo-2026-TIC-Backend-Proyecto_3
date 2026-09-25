//ARCHIVO DE LOS TIPOS DE RESPONSE Y REQUEST

import type {Request, Response } from 'express';
import type {Nivel, WholeProfile} from './tipos.js'

type UserProfile = {
    username:string,
    password:string
}
type UserUsername = {
    username:string
}

//Usuarios

export type RequestSaveProfile = Request<unknown, unknown , UserProfile>
export type RequestLogProfile = Request<unknown,unknown , UserProfile>
export type RequestLoadProfile = Request<UserUsername, WholeProfile>
//Niveles

export type RequestLoadLevels = Request<unknown, Nivel[]>
export type RequestLoadLevelsUsers = Request<UserUsername, Nivel[]>
export type RequestSaveLevel = Request<unknown, Nivel, Nivel>
