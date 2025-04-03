# prueba-licita-lab
# Proyecto de Oportunidades

Este proyecto es una aplicación para gestionar oportunidades y usuarios. Permite a los usuarios registrarse, iniciar sesión, ver oportunidades y seguirlas. Los administradores tienen permisos adicionales para gestionar los usuarios y las oportunidades.

## Tecnologías Utilizadas

- **Backend**: 
  - **NestJS**: Framework para crear el servidor.
  - **MongoDB**: Base de datos NoSQL.
  - **JWT**: Autenticación basada en tokens.
  - **Bcrypt**: Encriptación de contraseñas.
  - **Mongoose**: ORM para MongoDB.

- **Frontend**:
  - **React.js**: Librería para construir la interfaz de usuario.
  - **Redux**: Manejo de estado global.
  - **Mantine UI**: Biblioteca de componentes UI.
  - **React Icons**: Biblioteca de iconos.
  - **SWR**: Librería para la obtención de datos (fetching).

## Características

- **Registro y autenticación de usuarios**:
  - Los usuarios pueden registrarse y autenticarse con JWT.
  
- **Gestión de oportunidades**:
  - Los usuarios pueden ver oportunidades disponibles, aplicar filtros por fecha y tipo.
  - Los usuarios pueden seguir oportunidades.

- **Autenticación con JWT**:
  - Se utiliza JWT para proteger las rutas y asegurar que los usuarios solo accedan a recursos que les pertenecen.

- **Manejo de estado con Redux**:
  - La aplicación utiliza Redux para manejar el estado global, incluyendo el estado de autenticación del usuario.

# Instrucciones para Crear un Usuario Administrador

Para crear un usuario administrador, sigue estos pasos:

1. Abre **Postman** o cualquier herramienta para realizar peticiones HTTP.

2. Realiza una solicitud `POST` a la siguiente URL: http://localhost:3000/api/users/register

3. En el cuerpo de la solicitud (`Body`), agrega el siguiente JSON:

```json
{
    "name": "Ivan Sanchez",
    "email": "ivan.sanchez@hotmial.com",
    "password": "$2b$10$R6Y5mNm1/7QPLcwoqyrpmOsiedHRjz0qBQWhvuP6X3WCcEIG/rg/S",
    "role": "Admin",
    "_id": "67ee58aa0c9e679fa59143d2",
    "createdAt": "2025-04-03T09:45:14.744Z",
    "updatedAt": "2025-04-03T09:45:14.744Z",
    "__v": 0
}
```

4. Los usuarios no administradores se crean en la interface al momento de registrar un nuevo usuario

## Backend
- Navega a la carpeta del proyecto backend
- Instala las dependencias:

```bash
npm install
```
## Frontend
- Navega a la carpeta del proyecto backend
- Instala las dependencias:

```bash
npm install
```
