//ARCHIVO DE LOS TIPOS DE RESPONSE Y REQUEST

import express  from "express";
import type {Request, Response } from 'express';

export type RequestSaveProfile = Request<unknown, unknown , {username:string;password:string}>
export type RequestLoadProfile = Request<unknown,unknown , {username:string;password:string}>