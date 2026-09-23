# [TODO: Nombre del proyecto]

[TODO: descripción en una línea de qué hace esta API]

## Endpoints

| Método | Ruta          | Body / params | Respuesta |
| ------ | ------------- | -------------- | --------- |
| `GET`  | `/health`     | —              | `200 OK` (texto plano) |
|`POST`  | `/saveProfile`| [TODO]         | `200 OK` (Un json que marca que se creó un usuario)|
|`POST`  | `/saveProfile`| [TODO]         | `409 ERROR` (Un json que marca que ya había un perfil con ese username)|
| `POST` | `/logProfile` | [TODO]         | `200 OK` (Un json que marca que se logeo el usuario) |
| `POST` | `/logProfile` | [TODO]         | `401 ERROR`(Un json que marca que el usuario no coincide con la contraseña)|
| `POST` | `/logProfile` | [TODO]         | `404 ERROR`(Un json que marca que no se encontro un usuario)|
| [TODO] | [TODO]        | [TODO]         | [TODO]   

## Datos

[TODO: qué se guarda en `data/` y en qué formato, si aplica]
