# [TODO: Nombre del proyecto]

Lindsey's Lasers

[TODO: descripción en una línea de qué hace esta API]

## Endpoints

| Método | Ruta          | Body / params | Respuesta |
| ------ | ------------- | -------------- | --------- |
| `GET`  | `/health`     |—| `200 OK` (texto plano) |
|`POST`| `/saveProfile`|{username:string; password:string; profileID:number}|`200 OK`{estatus:"Perfil-guardado"}|
|`POST`| `/saveProfile`|{username:string; password:string; profileID:number}|`409 ERROR`{estatus:"Perfil-ya-existe"}|
|`POST`|`/logProfile`|{username:string; password:string; profileID:number}|`200 OK`{estatus:"Logueado-correctamente"}|
|`POST`|`/logProfile`|{username:string; password:string; profileID:number}|`401 ERROR`{estatus:"Contraseña-incorrecta"}|
|`POST`| `/logProfile` |{username:string; password:string; profileID:number}|`404 ERROR`{estatus:"Usuario-y/o-contraseña-incorrecta"}|
|`GET`|`/loadLevels`|-| `200 OK`{estatus:"Niveles-cargados"}|
|`GET`|`/loadLevelsUsers`|{username:string}|`200 OK`{estatus:"Niveles-cargados"}|
|`GET`|`/loadLevelsUsers`|{username:string}|`404 ERROR`{estatus:"No-se-ha-encontrado-el-usuario-marcado"}|
|`GET`|`/loadLevelsUsers`|{username:string}|`404 ERROR`{estatus:"No-se-han-encontrado-niveles-a-nombre-de-ese-usuario"}|
|`POST`|`/saveLevel`|{}| [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |
| [TODO] | [TODO]        | [TODO]         | [TODO] |

## Datos

[TODO: qué se guarda en `data/` y en qué formato, si aplica]

## Archivos

index.ts: Archivo del commit inicial, no cumple una función en el archivo, está para recordar donde inició el proyecto

server.ts: Archivo principal del proyecto, contiene todas las rutas de las API

tipos.ts: Archivo de tipos que no sean los de Request o Response

funcionesApis.ts: Archivo con todas las funciones de las API

request&responseTypes.ts: Archivo de los tipos de Request y Response
