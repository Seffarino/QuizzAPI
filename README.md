## Usage

To run the test server, run the following command

```bash
  npm run test
```

To run the dev server, run the following command

```bash
  npm run dev
```

To run the server, run the following command

```bash
  npm run start
```

## API Reference

### Auth

```http
  POST /auth/register - create an user
```

| Body       | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. The email of the user    |
| `password` | `string` | **Required**. The password of the user |

```http
  POST /auth/login - return a accesstoken if credentials are right
```

| Body       | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. The email of the user    |
| `password` | `string` | **Required**. The password of the user |

#### return :

#### accessToken :

A jwtToken that authentificate an user , the token has the value : email , isAdmin , userId

#### user : \_id , email , validated , isAdmin , createdAt , updatedAt

```http
  POST /auth/refresh - use the refresh token to refresh access token
```

| cookie | Type     | Description                                            |
| :----- | :------- | :----------------------------------------------------- |
| `jwt`  | `string` | **Required**. The refresh token to refresh access toke |

```http
  POST /auth/logout - delete all token
```

### Quizzs

#### required in all request :

| Headers         | Value              | Description                 |
| :-------------- | :----------------- | :-------------------------- |
| `Authorisation` | `Bearer **token**` | **Required**. The jwt token |

```http
  GET /quizz - get all quizzs
```

```http
  POST /quizz - create an empty quizz
```

| Body          | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `name`        | `string` | **Required**. The namme of the quizz |
| `description` | `string` | Description of the quizz             |

```http
  PATCH /quizz - update a quizz
```

| Body          | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `name`        | `string` | **Required**. The name of the quizz |
| `description` | `string` | Description of the quizz            |
| `id`          | `string` | **Required**. The id of the quizz   |

```http
  PATCH /quizz - delete a quizz
```

| Body | Type     | Description                       |
| :--- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. The id of the quizz |

```http
  POST /quizz/question - add a question to a quizz
```

| Body         | Type     | Description                          |
| :----------- | :------- | :----------------------------------- |
| `quizzId`    | `string` | **Required**. The id of the quizz    |
| `questionId` | `string` | **Required**. The id of the question |

```http
  POST /quizz/question - remove a question to a quizz
```

| Body         | Type     | Description                          |
| :----------- | :------- | :----------------------------------- |
| `quizzId`    | `string` | **Required**. The id of the quizz    |
| `questionId` | `string` | **Required**. The id of the question |

### Questions

```http
  GET /question - remove a question from user questions
```

```http
  POST /question - add a question from user questions
```

| Body      | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `libelle` | `string` | **Required**. The libelle of the question           |
| `type`    | `enum`   | **Required**. The type of the question (qcu,qcm ..) |
| `reponse` | `array`  | Array of object {libelle,isCorrect}                 |
| `tags`    | `array`  | Array of string                                     |

```http
  POST /question - delete a question from user questions
```

| Body | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `id` | `string` | **Required**. The id of the question |
