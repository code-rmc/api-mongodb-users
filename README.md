# API-mongodb-users

## 👾 Descripcion
Api de usuarios construida en node js y express, usando mongoDB, Middlewares express-validator, autentificacion de usuario manejo de rol y uso de Json Web Token

## Pre-requisitos
Instalar las dependencias necesarias, mongoose, express, jsonwebtoken...

usuando el siguiente comando instala los paquetes
```
npm i
```

## 📝 Test 
cada vez que haga un commit a github automaticamente realizara un test 

para correr los test aparte use
```
npm run test
```

## 🚀 Deploy
Heroku [link](https://api-mogodb-user.herokuapp.com/)

## 🚧 EndPoints
**Doc Swagger**
- /documentation

**api/v1/users**
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

**api/v1/auth/login**
- POST /auth/login
##### Ejemplo

```.json
{
  "status":200,
  "data":
  {
    "docs":
    [{
    "_id":"61e5d7aa2ae4cec4b68777f3",
    "name":"Pablo",
    "last":"Lopez",
    "email":"prueba@email.com.ar",
    "birthdate":"2001-06-16T03:00:00.000Z",
    "password":"$2b$10$hgiyZ1peFuv2JX7P9QsyIOKdBNn7p2LoWoewCcjejasbSHFRBM/T2",
    "rol":"USER_ROLE",
    "enable":true,
    "createdAt":"2022-01-17T20:55:07.004Z",
    "updatedAt":"2022-01-17T20:55:07.004Z",
    "__v":0
    }],
    "totalDocs":1,
    "offset":0,
    "limit":10,
    "totalPages":1,
    "page":1,
    "pagingCounter":1,
    "hasPrevPage":false,
    "hasNextPage":false,
    "prevPage":null,
    "nextPage":null
  }
}
```
