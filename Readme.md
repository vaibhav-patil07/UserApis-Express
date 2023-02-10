
# Express Server

This respository provides a Express server which has CRUD api's for user. For persistent storage this server uses a json file.

To run the server

install all the dependencies using
```bash 
npm install
```
After that to start server 
```bash 
npm run start
```
To start server in development mode run
```bash 
npm run dev
```

## API Reference

#### Get all users

```http
  GET /users
```

#### Get User

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

(Response body - json)
```json
    [
        {
            "id": string,
            "name": string,
            "profileImage": string,
            "introduction":string,
            "profileLink": string
        },...
    ]
```
#### Create User

```http
  POST /users
```
(Request body - json)

```json
    {
        "name": string,
        "profileImage": string,
        "introduction":string,
        "profileLink": string
    }
```
(Response body - json)
```json
    {
        "id": string,
        "name": string,
        "profileImage": string,
        "introduction":string,
        "profileLink": string
    }
```

#### Update User

```http
  POST /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |

(Request body - json) 

```json
    {
        "name": string,
        "profileImage": string,
        "introduction":string,
        "profileLink": string
    }
```
(Response body - json) Updated user
```json
    {
        "id": string,
        "name": string,
        "profileImage": string,
        "introduction":string,
        "profileLink": string
    }
```
#### Delete User

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |

(Response body - json) Deleted user
```json
    [
        {
            "id": string,
            "name": string,
            "profileImage": string,
            "introduction":string,
            "profileLink": string
        },...
    ]
```

