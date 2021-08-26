# Backend API

## TOPICS

- #### `GET /api/v1/topics`
  Cтянуть топики с пагинацией

  ***Query***: `page?: string`

  **Response**
  ```
  {
    results: [
        id: number,
        title: string,
        owner: string,
        views: number,
        createdAt: string,
        updatedAt: string,
        commentsCount: number,
    ],
    totalItems: number,
    totalPages: number,
    currentPage: number
  }
  ```

- #### `GET /api/v1/topics/:id`
  Cтянуть конкретный топик по id

  **Response**
  ```
  {
    id: number,
    title: string,
    owner: string,
    views: number,
    createdAt: string,
    updatedAt: string,
    comments: Comment[],
  }
  ```

- #### `POST /api/v1/topics`
  Добавить топик

  **Request data**
  ```
  {
    username: string,
    title: string
  }
  ```
  **Response** - добавленный топик

- #### `DELETE /api/v1/topics/:id`
  Удалить топик по id

  **Response** - ОК

- #### `GET /api/v1/topics/watch/:id`
  Увеличить счетчик просмот топика на один по id
  **Response** - ОК


## COMMENTS
- #### `GET /api/v1/comments/:topicId`
  Cтянуть комментарии с пагинацией по id топика
  ***Query***: `page?: string`
  **Response**
  ```
  {
    results: [
        id: number
        username: string
        topicId: number
        text: string
        createdAt: string
        updatedAt: string
        topic: Topic
    ],
    totalItems: number,
    totalPages: number,
    currentPage: number
  }
  ```

- #### `POST /api/v1/comments`
  Добавить комментарий
  **Request data**
  ```
  {
    topicId: number | string,
    username: string,
    text: string
  }
  ```

- #### `DELETE /api/v1/comments/:id`
  Удалить комментарий по id
  **Response** - ОК


## THEMES
- #### `GET /api/v1/themes`
  Получить список доступных тем  
  **Response**
  ```
  [
      {
          "id": 1,
          "name": "light",
          "description": "light theme description"
      },
      {
          "id": 2,
          "name": "dark",
          "description": "dark theme profound description"
      }
  ]
  ```

- #### `GET /api/v1/themes/mytheme`
  Получить выбранную тему юзера  
  **Response**
  ```
  {
    "ownerId": 85902,
    "themeId": "0"
  }
  ```

- #### `PUT /api/v1/themes/mytheme`
  Задать выбранную тему юзера  
  **Request**
  ```
  {"themeId": 0}
  ```
  **Response**
  ```
  [
      {
          "ownerId": 85902,
          "themeId": "1"
      },
      null
  ]
  ```
