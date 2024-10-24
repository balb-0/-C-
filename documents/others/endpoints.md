### Log-In Page endpoint

- **Adress:** `/login`
- **Method:** `GET`
- **Headers:** Not applicable
- **Body:** Not applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

### Sign-Up page (part 1) endpoint

- **Adress:** `/signup`
- **Method:** `GET`
- **Headers:** Not applicable
- **Body:** Not applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

### Sign-Up page (second part) endpoint

- **Adress:** `/signup2`
- **Method:** `GET`
- **Headers:** Not applicable
- **Body:** Not applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

### Sign-Up user creation endpoint

- **Adress:** `/signup`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "fullName": "[fullName]",
    "emailAdress": "[emailAdress]",
    "password": "[password]",
    "birthday": "[birthday]",
    "countryPov": "[countryPov]",
    "aboutMe": "[aboutMe]",
    "gender": "[gender]",
    "countryId": "[countryId]",
    "educationId": "[educationId]",
    "userType": "[userType]"
  }
  ```
- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /me
    ```
  - Error - Conflict (409 Conflict)

    ```http
    HTTP/1.1 409 Conflict
    Content-Type: application/json

    {
      "error": "Email address is already in use."
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during signup.",
      "details": "[Error details, if available]"
    }
    ```

### Log-in user log-in endpoint

- **Adress:** `/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "emailAdress": "[emailAdress]",
    "password": "[password]"
  }
  ```
- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /me
    ```
  - Error - User Not Found (404 Not Found)

    ```http
    HTTP/1.1 404 Not Found
    Content-Type: application/json

    {
      "error": "User Not Found."
    }
    ```

  - Error - Invalid Password (401 Unauthorized)

    ```http
    HTTP/1.1 401 Unauthorized
    Content-Type: application/json

    {
      "error": "Invalid password."
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during login.",
      "details": "[Error details, if available]"
    }
    ```

### Find current user endpoint

- **Adress:** `/me`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - User Not Logged In (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      "error": "User not logged in."
    }
    ```

  - Error - User Not Found (404 Not Found)

    ```http
    HTTP/1.1 404 Not Found
    Content-Type: application/json

    {
      "error": "User Not Found."
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while retrieving user details.",
      "details": "[Error details, if available]"
    }
    ```

### User log-out endpoint

- **Adress:** `/logout`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during logout.",
      "details": "[Error details, if available]"
    }
    ```

### User profile photo update endpoint

- **Adress:** `/user/update-photo`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: multipart/form-data; boundary=---123456
  ```
- **Body:**

  ```http
  -----123456
  Content-Disposition: form-data; name="[name]"; filename="[file name]"
  Content-Type: image/["file extension"]

  ["binary data of the photo file"]
  -----123456--
  ```

- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /me
    ```
  - Error - User Not Logged In (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - No File Uploaded (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      "error": "No file was uploaded."
    }
    ```

  - Error - File Upload Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "File upload error.",
      "details": "[Error details, if available]"
    }
    ```

  - Error - Cloudinary Upload Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "Cloudinary upload error.",
      "details": "[Error details, if available]"
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during logout.",
      "details": "[Error details, if available]"
    }
    ```

### Admin dashboard endpoint

- **Adress:** `/admin`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Access Denied (403 Forbidden)

    ```http
    HTTP/1.1 403 Forbidden
    Content-Type: application/json

    {
      "error": "Forbidden",
      "message": "Access denied."
    }
    ```

### Game creation page endpoint

- **Adress:** `/game/create`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error ocurred during game creation",
      "details": "[Error details, if available]"
    }
    ```

### Create game endpoint

- **Adress:** `/game/create`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "startDate": "[startDate]",
    "endDate": "[endDate]"
  }
  ```
- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /admin
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during game creation.",
      "details": "[Error details, if available]"
    }
    ```

### Game page endpoint

- **Adress:** `/game/:id`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching game details.",
      "details": "[Error details, if available]"
    }
    ```

### Create universe endpoint

- **Adress:** `/universe/create`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "color": "[color]",
    "gameId": "[gameId]"
  }
  ```
- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /game/:id
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching game details.",
      "details": "[Error details, if available]"
    }
    ```

### Universe page endpoint

- **Adress:** `/universe/:id`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Universe Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching game details.",
      "details": "[Error details, if available]"
    }
    ```

### Group creation page endpoint

- **Adress:** `/group/create`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```

### Create group endpoint

- **Adress:** `/group/create`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "name": "[name]",
    "tutorId": "[tutorId]",
    "studentIds": "[studentIds]",
    "universeId": "[universeId]"
  }
  ```
- **Responses:**

  - Success (302 Found):
    ```http
    HTTP/1.1 302 Found
    Location: /universe/:id
    ```
  - Redirect (302 Found):
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500):

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred during group creation.",
      "details": "[Error details, if available]"
    }
    ```

### Group page endpoint

- **Adress:** `/group/:id`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Not Found (404 Not Found)
    ```http
    HTTP/1.1 404 Not Found
    Content-Type: text/html; charset=utf-8
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
    "error": "An error occurred while fetching group details.",
    "details": "[Error details, if available]"
    }
    ```

### Create profile message endpoint

- **Adress:** `/me/message`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "content": "[content]"
  }
  ```
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      [message content]
    }
    ```

  - Error - User Not Authenticated (401 Unauthorized)

    ```http
    HTTP/1.1 401 Unauthorized
    Content-Type: application/json

    {
      error: "User not authenticated."
    }
    ```

  - Error - Message Content Is Mandatory (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      error: "Message Content Is Mandatory."
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      error: "Error in message creating."
    }
    ```

### Feedback creation page endpoint

- **Adress:** `/feedback`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```

### Create feedback endpoint

- **Adress:** `/feedback`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "toUserId": "[recipient user ID]",
    "roundId": "[round ID]",
    "content": "[content]"
  }
  ```
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      fromUserId: "[current user ID]",
      toUserId: "[recipient user ID]",
      roundId: "[round ID]",
      content: "[content]",
      date: "[date]"
    }
    ```

  - Error - Feedback Content Is Mandatory (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      error: "All fields are required."
    }
    ```

  - Error - Recipient User Does Not Exist (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      error: "Recipient user does not exist."
    }
    ```

### Feedback page endpoint

- **Adress:** `/feedback`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Error - Server Internal Error (500 Internal Server Error)
    ```http
    HTTP/1.1 500 Internal Server Error
    ```

### Round creation page endpoint

- **Adress:** `/round/create`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```

### Create round endpoint

- **Adress:** `/round/create`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**

```json
{
  "startDate": "[start date]",
  "endDate": "[end date]",
  "roundNumber": "[round number]",
  "explanation": "[explanation]",
  "gameId": "[game ID]"
}
```

- **Responses:**

  - Success (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /game/:id
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      error: "An error occurred during round creation."
    }
    ```

### Get Personal Type Questions Endpoint

- **Address:** `/questions/personal-type`
- **Method:** `GET`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:** None
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: application/json

    "message": "Personal type question created successfully.",
    "questionId": "[question ID]"
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while retrieving personal type questions."
    }
    ```

### Create Personal Type Question Endpoint

- **Address:** `/questions/binary_choice`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "questionText": "[question text]",
    "options": ["[option 1]", "[option 2]"]
  }
  ```
- **Responses:**

  - Success (201 Created)

    ```http
    HTTP/1.1 201 Created
    Content-Type: application/json

    {
      "message": "Personal type question created successfully.",
      "questionId": "[question ID]"
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while creating the personal type question."
    }
    ```

### Home page endpoint

- **Adress:** `/`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching user or group information.",
      "details": "[Error details, if available]"
    }
    ```

### Create Happiness-meter endpoint

- **Adress:** `/happiness-meter`
- **Method:** `POST`
- **Headers:** 
    ```http
      Content-Type: application/json
     ```
- **Body:** 
  ```json
  {
    "data-value": ["[option 1]", "[option 2]", "[option 3]", "[option 4]", "[option 5]"],
  }
  ```
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: aplication/json
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "Failed to update happiness level.",
      "details": "[Error details, if available]"
    }
    ```

### Edit Current user Page endpoint

- **Adress:** `/me/edit`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching user details."
      "details": "[Error details, if available]"
    }
    ```

### Update User endpoint

- **Adress:** `/updateUser`
- **Method:** `POST`
- **Headers:** 
    ```http
      Content-Type: application/json
     ```
- **Body:** 
  ```json
  {
    "fullName": "[fullName]",
    "countryPov":"[countryPov]",
    "aboutMe":"[aboutMe]",
    "gender":"[gender]",
    "timezoneId":"[timezoneId]",
  }
  ```
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: aplication/json
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - User Not Found (404 Not Found)

    ```http
    HTTP/1.1 404 Not Found
    Content-Type: application/json

    {
      "error": "User Not Found."
    }
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while updating the profile.",
      "details": "[Error details, if available]"
    }
    ```

### Create Group Find User By Email endpoint

- **Adress:** `/group/create/findUserByEmail`
- **Method:** `GET`
- **Headers:** 
 ```http
      Content-Type: application/json
  ```
- **Body:** 
 ```json
  {
    "emailAddress": "[emailAddress]",
  }
  ```
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: application/json
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "User was not found."
      "details": "[Error details, if available]"
    }
    ```

### Group Page endpoint

- **Adress:** `/group`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)
    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```
  - Redirect (302 Found)
    ```http
    HTTP/1.1 302 Found
    Location: /login
    ```
  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while fetching group details."
      "details": "[Error details, if available]"
    }
    ```

### External Type Questions page Endpoint

- **Address:** `/questions/external-type`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "Error fetching questions"
    }
    ```

### Create External Type Questions Endpoint

- **Address:** `/questions/radio_choice`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "questionText": "[question text]",
    "options": ["[option 1]", "[option 2]", "[option 3]", "[option 4]","[option 5]"]
  }
  ```
- **Responses:**

  - Success (201 Created)

    ```http
    HTTP/1.1 201 Created
    Content-Type: application/json

    {
      "message": "Personal type question created successfully.",
      "questionId": "[question ID]"
    }
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "An error occurred while creating the externaç type question."
    }
    ```
  - Error - User Not Logged In (400 Bad Request)

    ```http
    HTTP/1.1 400 Bad Request
    Content-Type: application/json

    {
      "error": "Invalid answers format."
    }
    ```

### Profile Questions Results Page Endpoint

- **Address:** `/questions/profile-result`
- **Method:** `GET`
- **Headers:** Not Applicable
- **Body:** Not Applicable
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "Error fetching answers"
    }
    ```

### Profile External Page Endpoint

- **Address:** `/profile/:id`
- **Method:** `GET`
- **Headers:** 
 ```http
  Content-Type: application/json
  ```
- **Body:** 
  ```json
  {
    "userId": "[userId]",
    "profileId": "[profileId]",
    "teammate": "[teammate]",
  }
  ```
- **Responses:**

  - Success (200 OK)

    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: [content length in bytes]
    Date: [date and time]
    ```

  - Error - Internal Server Error (500 Internal Server Error)

    ```http
    HTTP/1.1 500 Internal Server Error
    Content-Type: application/json

    {
      "error": "Error in finding teammate"
    }
    ```