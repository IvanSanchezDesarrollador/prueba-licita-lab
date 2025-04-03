# prueba-licita-lab

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
