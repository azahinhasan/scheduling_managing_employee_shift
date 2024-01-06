# Technical documentation

Here I am going to provide some information about this app.

## Technology Used

- React js
- Node js
- Express js
- Material Ui
- Mongoose
- Scss
- Jest
- JWT
- Docker and more.

## Features of this App

### Backend

#### Folder structure (/server is for backend)

- `server/models` : Holds all schema models.
- `server/controllers` : Manages the business logic and actions.
- `server/middleware` : Handles authorization functionality.
- `server/routes` : Defines all API endpoints.
- `server/helpers` : Contains reusable functions utilized across multiple files.
- `server/_tests_` : Encompasses all Jest test cases.
- `server/index.js` : Serves as the main entry point for the server.
- `server/config` : Houses configuration keys declared and used by other files.

#### All API endpoints

- `POST - /auth/sign_in`: User for sign. Send into the body:<br/>
  For administrator
  ```
  {
  "email":"admin@test.com",
  "password":"123456"
  }
  ```
  For supervisor
  ```
  {
  "email":"supervisor@test.com",
  "password":"123456"
  }
  ```
  For employee
  ```
  {
  "email":"employee@test.com",
  "password":"123456"
  }
  ```
- `GET - /api/user/get_all`: Retrieve user data based on user role. Administrators get all user data, supervisors get the users (employees) assigned under them, and employees receive a 401 Unauthorized response.
- `POST - /api/user/create`: Create a new user. If requested by administrators, the new user will inherit the specified role. Requests from supervisors and employees will get a 401 Unauthorized response. <br/> If creating requested by `none` type user then the new created user will be assigned the role of an employee (used for Sign Up).
- `PUT - /api/user/update/:user_id`: Update user information. Administrators can modify any information of any user. Supervisors can only update the active_status of users assigned under them. Any user type can update their own basic information.
- `DELETE - /api/user/delete/:user_id`: Delete a user account. Only administrators have the authority to delete any user's account. Additionally, the account of any administrator cannot be deleted.
- `POST - /api/user/change_role/:user_id`: Change the role of a user between employee and supervisor. Only administrators have the authority to perform this action. When changing the role, if the current role is a supervisor, their information from SupervisorEmployeeRelations collection will be removed (i.e., unselecting all employees assigned to them). If the current role is an employee, they will be removed from their supervisor.
- `GET - /api/user/get_by_id`: Retrieve user information(same user who requested for the info) based on the decoded user ID from the token.
