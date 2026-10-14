# Lindsey's Lasers

## Explicación de los endpoints

"/saveProfile"

Registra un perfil y verifica si hay un perfil con el username recibido en la base de datos

"/logProfile"

Verifica el username y contraseña recibidos para ver si coinciden en un perfil o si el username siquiera existe en la base de datos

"/loadLevels"

Carga todos los niveles online que estén publicados del json "data/niveles.json"

"/loadLevels/:username"

Carga todos los niveles online que estén publicados del json "data/niveles.json" que correspondan a un usuario específico

"/saveLevel"

Guarda un nivel en la sección "nivelesCreados" del save file de un usuario en específico, en el archivo "saveFiles.json"

"/:username"

Carga información del usuario correspondiente, su Usuario, Contraseña e ID y también los niveles que publicó

"/loadLevel/level/:nombre"

Carga un nivel de los niveles online que tenga el nombre puesto en la URL

":username/configs"

Carga las configuraciones de un usuario en específico

":username/saveConfigs"

Guarda las configuraciones de un usuario en específico, verificando también si la configuración es igual a la que había antes

"/loadLeveles/original/all"

Carga todos los niveles creados por los desarrolladores a la vez

"saveFile/:username"

Carga el archivo de guardado de un usuario en específico

"level/original/:numNivel" GET

Carga un nivel creado por los desarrolladores que tenga el número de nivel marcado en la URL

"/level/original/:numNivel" POST

Hace que el saveFile del usuario que se envió por el body se modifique para marcar como completado el nivel marcado en la URL

"/publishLevel/:username"

Hace que el nivel recibido en el body sea publicado a nombre del usuario puesto en la URL

"/level:nombre" POST

Hace que el usuario enviado en el body entre a la lista de usuarios que completaron el nivel marcando en la URL

"/level:nombre" PUT

Actualiza el nivel deseado en el archivo "niveles.json", sumandole +1 a su versión

"/saveLevelUser/:nombre"

Guarda el un nivel online en una parte del Save File del usuario

"/level/hide/:nombre"

Oculta un nivel online de la visión pública

"/level/show/:nombre"

Hace que un nivel que esté oculto reaparezca en la visión pública

"/level/name/online/:id"

Modifica el nombre de un nivel online

"/level/name/offline/:id"

Modifica el nombre de un nivel offline

"/level/delete/:id"

Elimina un nivel creado del Save File del usuario correspondiente

"/deleteLevelUser/:nombre"

Elimina un nivel guardado del Save File del usuario correspondiente

"/showProgress/:username"

Muestra el progreso de un archivo de guardado de un usuario en específico

## Endpoints

| Método | Ruta          | Body / params | Respuesta |
| ------ | ------------- | -------------- | --------- |
| `GET`  | `/health`     |—| `200 OK` (texto plano) |
|`POST`| `/saveProfile`|UserProfile|`200 OK`{estatus:"Perfil-guardado"}|
|`POST`| `/saveProfile`|UserProfile|`409 ERROR`{estatus:"Perfil-ya-existe"}|
|`POST`|`/logProfile`|UserProfile|`200 OK`{estatus:"Logueado-correctamente"}|
|`POST`|`/logProfile`|UserProfile|`401 ERROR`{estatus:"Contraseña-incorrecta"}|
|`POST`| `/logProfile` |UserProfile|`404 ERROR`{estatus:"Usuario-y/o-contraseña-incorrecta"}|
|`GET`|`/loadLevels`|—| `200 OK`(listaDeNiveles)|
|`GET`|`/loadLevels/:username`|UserUsername|`200 OK`(listaDeNiveles)|
|`GET`|`/loadLevels/:username`|UserUsername|`404 ERROR`{estatus:"No-se-ha-encontrado-el-usuario-marcado"}|
|`GET`|`/loadLevels/:username`|UserUsername|`404 ERROR`{estatus:"No-se-han-encontrado-niveles-a-nombre-de-ese-usuario"}|
|`POST`|`/saveLevel`|Nivel|`200 OK` {estatus:"Nivel-guardado"}|
|`POST`|`/saveLevel`|Nivel|`404 ERROR` {estatus:"Perfil-no-encontrado"}|
|`POST`|`/saveLevel`|Nivel|`400 ERROR`{estatus:"Nivel-vacio"}|
|`POST`|`/saveLevel`|Nivel|`400 ERROR`{estatus:"No-se-le-ha-puesto-nombre-al-nivel"}|
|`POST`|`/saveLevel`|Nivel|`400 ERROR`{estatus:"No-se-especifico-un-usuario"}|
|`GET`|`/:username`|UserUsername|`200 OK`(PerfilCompletoDelUsuario)|
|`GET`|`/:username`|UserUsername|`404 ERROR`{estatus:"Perfil-no-encontrado"}|
|`GET`|`/loadLevel/level/:nombre`|{nombre:string}|`200 OK` (nivelQueHayQueCargar)|
|`GET`|`/loadLevel/level/:nombre`|{nombre:string}|`404 ERROR` {estatus:"No-se-ha-encontrado-un-nivel-con-dicho-nombre"}|
|`GET`|`/loadLevel/level/:nombre`|{nombre:string}|`404 ERROR` {estatus:"Nivel-esta-en-oculto"}|
|`GET`|`/:username/configs`|UserUsername|`200 OK` (configCargada)|
|`GET`|`/:username/configs`|UserUsername|`404 ERROR` {estatus:"Usuario-no-encontrado"}|
|`POST`|`/:username/saveConfigs`|ConfigNoUser&UserUsername|`200 OK` {estatus:"Nueva-configuracion-guardada"}|
|`POST`|`/:username/saveConfigs`|ConfigNoUser&UserUsername|`200 OK` {estatus:"Misma-configuracion"}|
|`POST`|`/:username/saveConfigs`|ConfigNoUser&UserUsername|`404 ERROR` {estatus:"Configuracion-vacia"}|
|`POST`|`/:username/saveConfigs`|ConfigNoUser&UserUsername|`404 ERROR` {estatus:"Tal-perfil-no-existe"}|
|`GET`|`/loadLevels/original/all`|—|`200 OK`|
|`GET`|`/saveFile/:username`|UserUsername|`200 OK` (requestedSaveFile)|
|`GET`|`/saveFile/:username`|UserUsername|`404 ERROR` {estatus:"Archivo-de-guardado-no-encontrado"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`200 OK`{estatus:"Complecion-de-nivel-guardada"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`200 OK`{estatus:"Complecion-de-nivel-guardada"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`200 OK`{estatus:"Complecion-de-nivel-guardada"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`404 ERROR`{estatus:"No-hay-tal-nivel"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`404 ERROR`{estatus:"No-hay-tal-archivo-de-guardado"}|
|`POST`|`/level/original/:numNivel`|{numNivel:string}/UserUsername&{nombre:string}|`404 ERROR`{estatus:"No-se-ha-encontrado-el-usuario-correspondiente"}|
|`GET`|`/level/original/:numNivel`|{numNivel:string}|`200 OK` (nivelBuscado)|
|`GET`|`/level/original/:numNivel`|{numNivel:string}|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`POST`|`/publisLevel/:username`|UserUsername/{nombre:string}|`200 OK` {estatus:"Nivel-publicado"}|
|`POST`|`/publisLevel/:username`|UserUsername/{nombre:string}|`409 OK` {estatus:"Ya-existe-un-nivel-con-ese-nombre"}|
|`POST`|`/publisLevel/:username`|UserUsername/{nombre:string}|`404 OK` {estatus:"Tal-nivel-no-fue-creado-por-el-usuario-correspondiente"}|
|`POST`|`/level/:nombre`|{nombre:string}/UserUsername|`409 ERROR` {estatus:"Usuario-ya-se-paso-el-nivel"}|
|`POST`|`/level/:nombre`|{nombre:string}/UserUsername|`200 OK` {estatus:"Nivel-completado"}|
|`POST`|`/level/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`POST`|`/level/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"El-usuario-marcado-no-existe"}|
|`PUT`|`/level/:nombre`|{nombre:string}/Nivel|`200 OK`{estatus:"Nivel-actualizado"}|
|`PUT`|`/level/:nombre`|{nombre:string}/Nivel|`404 ERROR`{estatus:"El-nivel-no-ha-sido-publicado"}|
|`PUT`|`/level/:nombre`|{nombre:string}/Nivel|`400 ERROR`{estatus:""Para-cambiar-el-nombre-usa-la-API-correspondiente""}|
|`POST`|`/saveLevel/:nombre`|{nombre:string}/UserUsername|`200 OK` {estatus:"Nivel-guardado"}|
|`POST`|`/saveLevel/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"No-se-ha-encontrado-al-usuario"}|
|`POST`|`/saveLevel/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`POST`|`/saveLevel/:nombre`|{nombre:string}/UserUsername|`409 ERROR` {estatus:"Nivel-ya-esta-guardado"}|
|`PUT`|`/hideLevel/:nombre`|{nombre:string}|`200 OK` {estatus:"Nivel-ocultado"}|
|`PUT`|`/hideLevel/:nombre`|{nombre:string}|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`PUT`|`/hideLevel/:nombre`|{nombre:string}|`409 ERROR` {estatus:"El-nivel-ya-esta-oculto"}|
|`PUT`|`/showLevel/:nombre`|{nombre:string}|`200 OK` {estatus:"Nivel-mostrado"}|
|`PUT`|`/showLevel/:nombre`|{nombre:string}|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`PUT`|`/showLevel/:nombre`|{nombre:string}|`409 ERROR` {estatus:"Nivel-ya-esta-siendo-mostrado"}|
|`PATCH`|`/level/name/online/:id`|{id:string}/{nombre:string}|`200 OK` {estatus:"Nombre-de-nivel-cambiado"}|
|`PATCH`|`/level/name/online/:id`|{id:string}/{nombre:string}|`400 ERROR` {estatus:"No-se-especifico-la-ID-del-nivel"}|
|`PATCH`|`/level/name/online/:id`|{id:string}/{nombre:string}|`404 ERROR` {estatus:"No-hay-un-nivel-con-dicha-ID"}|
|`PATCH`|`/level/name/offline/:id`|{id:string}/{nombre:string}|`200 OK` {estatus:"El-nombre-del-nivel-ha-sido-cambiado"}|
|`PATCH`|`/level/name/offline/:id`|{id:string}/{nombre:string}|`400 ERROR` {estatus:"No-se-ha-recibido-un-nombre"}|
|`PATCH`|`/level/name/offline/:id`|{id:string}/{nombre:string}|`404 ERROR` {estatus:"Nivel-no-encontrado"}|
|`PATCH`|`/level/name/offline/:id`|{id:string}/{nombre:string}|`404 ERROR` {estatus:"Usuario-no-encontrado"}|
|`DELETE`|`/deleteLevel/:id`|{id:string}/UserUsername|`200 OK` {estatus:"Nivel-eliminado"}|
|`DELETE`|`/deleteLevel/:id`|{id:string}/UserUsername|`404 ERROR` {estatus:"Usuario-no-encontrado"}|
|`DELETE`|`/deleteLevel/:id`|{id:string}/UserUsername|`404 ERROR` {estatus:"No-existe-un-nivel-con-dicha-ID"}|
|`DELETE`|`/deleteLevelUser/:nombre`|{nombre:string}/UserUsername|`200 OK` {estatus:"Nivel-eliminado-correctamente"}|
|`DELETE`|`/deleteLevelUser/:nombre`|{nombre:string}/UserUsername|`400 ERROR` {estatus:"No-se-especifico-un-usuario"}|
|`DELETE`|`/deleteLevelUser/:nombre`|{nombre:string}/UserUsername|`400 ERROR` {estatus:"No-se-especifico-el-nombre-del-nivel-a-borrar"}|
|`DELETE`|`/deleteLevelUser/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"Usuario-no-encontrado"}|
|`DELETE`|`/deleteLevelUser/:nombre`|{nombre:string}/UserUsername|`404 ERROR` {estatus:"El-nivel-no-se-encuentra-en-el-save-file-del-usuario"}|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`200 OK` (listaSaveFilesjson[m].nivelesOG1)|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`200 OK` (listaSaveFilesjson[m].nivelesOG2)|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`200 OK` (listaSaveFilesjson[m].nivelesOG3)|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`400 ERROR` {estatus:"El-Save-File-marcado-no-existe"}|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`400 ERROR` {estatus:"No-se-especifico-ningun-usuario"}|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`400 ERROR` {estatus:"El-Save-File-marcado-no-existe"}|
|`GET`|`/showProgress/:username`|UserUsername/{saveFile:string}|`404 ERROR` {estatus:"Usuario-no-encontrado"}|

## Datos

Hay cinco archivos de datos:

-main.json

Almacena los perfiles del juego, en forma un array del tipo Profile

-configs.json

Almacena las configuraciones de cada usuario, en forma de array del tipo Config

-saveFiles.json

Almacena los archivos de guardado de cada usuario, en forma de array del tipo SaveFile

-nivelesOriginales.json

Almacena los niveles creados por los desarrolladores, en forma de array del tipo Nivel

-niveles.json

Almacena los niveles publicados por la comunidad, en forma de array del tipo Nivel

## Archivos de código

index.ts: Archivo del commit inicial, no cumple una función en el archivo, está para recordar donde inició el proyecto

server.ts: Archivo principal del proyecto, contiene todas las rutas de las API

tipos.ts: Archivo de tipos que no sean los de Request o Response

funcionesApis.ts: Archivo con todas las funciones de las API

request&responseTypes.ts: Archivo de los tipos de Request y Response
