//ARCHIVO DE LOS TIPOS DE RESPONSE Y REQUEST

import type {Request, Response } from 'express';
import type {Nivel} from './tipos.js'

type UserProfile = {
    username:string,
    password:string
}

//Usuarios

export type RequestSaveProfile = Request<unknown, unknown , UserProfile>
export type RequestLoadProfile = Request<unknown,unknown , UserProfile>

//Niveles

export type RequestLoadLevels = Request<unknown, Nivel[]>
export type RequestLoadLevelsUsers = Request<{username:string}, Nivel[]>
export type RequestSaveLevel = Request<unknown, Nivel, Nivel>
