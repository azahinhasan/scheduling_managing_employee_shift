# Technical documentation

Here I am going to provide some information about this app.

## Credentials

For Admin:

```
  administrator@test.com
```

For Supervisor:

```
  supervisor@test.com
  supervisor2@test.com
```

For Employee:

```
  employee@test.com
  employee2@test.com
```

Password(same of all of them):

```
  123456
```

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

- `server/index.js` : This file acts as the central entry point for the server, initializing and starting the server application.
- `server/config` : This directory contains all the configuration settings and keys. These configurations are imported and utilized throughout the application for various functionalities.
- `server/middleware` : Dedicated to middleware functions, primarily focused on handling authorization and request processing.
- `server/models` : This folder stores all the database schema models. It defines the structure and relationships of the data used in the application.
- `server/controllers` : Responsible for managing the core business logic of the application. This directory contains controllers that handle the actions based on the requests received.
- `server/routes` : Defines the API routes/endpoints. It specifies the paths and methods for client-server communication.
- `server/helpers` : Contains reusable functions utilized across multiple files.
- `server/_tests_` : Contains all the Jest test cases for the application. This directory is essential for implementing test-driven development and ensuring code reliability.

#### All API endpoints

- `POST - /auth/sign-in`: User for sign. Send into the body:<br/>\
  For administrator

  ```
  {
  "email":"administrator@test.com",
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

  <br/>

- `GET - /api/user/get-all`: Retrieve user data based on user role. Administrators get all user data, supervisors get the users (employees) assigned under them, and employees receive a 401 Unauthorized response.
- `POST - /api/user/create`: Create a new user. If requested by administrators, the new user will inherit the specified role. Requests from supervisors and employees will get a 401 Unauthorized response. <br/> If creating requested by `none` type user then the new created user will be assigned the role of an employee (used for Sign Up).
- `PUT - /api/user/update/:user_id`: Update user information. Administrators can modify any information of any user. Supervisors can only update the active_status of users assigned under them. Any user type can update their own basic information.
- `DELETE - /api/user/delete/:user_id`: Delete a user account. Only administrators have the authority to delete any user's account. Additionally, the account of any administrator cannot be deleted.
- `POST - /api/user/change-role/:user_id`: Change the role of a user between employee and supervisor. Only administrators have the authority to perform this action. When changing the role, if the current role is a supervisor, their information from SupervisorEmployeeRelations collection will be removed (i.e., unselecting all employees assigned to them). If the current role is an employee, they will be removed from their supervisor.
- `GET - /api/user/get-by-id`: Retrieve user information(same user who requested for the info) based on the decoded user ID from the token.

 <br/>

- `GET - /api/shift/get-all`: Retrieve all shifts. Administrators receive list of all shifts. Supervisors get only the shifts where their employees are assigned. Employees receive the shifts where they are assigned.
- `POST - /api/shift/create`: Create a new shift. Only administrators have the authority to perform this action. If the new shift's date, start_time, and end_time match with any already existing shift, the new shift will not be added.
- `PUT - /api/shift/update/:shift_id`: Update a shift. Only administrators have the authority to perform this action. If the updated shift's date, start_time, and end_time match with any already existing shift, the shift will not be updated.
- `DELETE - /api/shift/delete/:shift_id`: Delete shift. Only administrators have the authority to perform this action.
- `GET - /api/shift/get-by-id/:shift_id`: Retrieve specific shift information by ID. Only administrators have the authority to perform this action.
- `POST - /api/shift/modify-employees-shift`: Modify employee assignments in a shift. This endpoint is used for adding, removing, or modifying employees assigned to a specific shift. The specific action is determined by sending the following object in the request body:<br/> <br/>
  For adding into the shift
  ```
  {
  "employee_id":"employee_id",
  "new_shift_id":"new_shift_id",
  "action_type":"add"
  }
  ```
  For removing into the shift
  ```
  {
  "employee_id":"employee_id",
  "current_shift_id":"current_shift_id",
  "action_type":"remove"
  }
  ```
  For switching into the shift(only shifts between same day.If want to switch other day shift the add.)
  ```
  {
  "employee_id":"employee_id",
  "current_shift_id":"current_shift_id",
  "new_shift_id":"new_shift_id",
  "action_type":"switch"
  }
  ```
  Here administrators can do this action for any employee but supervisors can do it for only their employees.

<br/>

- `GET - /api/supervisor-employee-relations/all-assigned-employee`: Retrieve a list of all supervisors and their assigned employees. Administrators get a list of all supervisors and their respective employees. Supervisors receive details only about their assigned group of employees. Employees get 401.
- `POST - /api/supervisor-employee-relations/untag-employee-from-supervisor`: Administrators can remove or untagging employee from any supervisor.
- `PUT - /api/supervisor-employee-relations/untag-employee-from-supervisor`: Tag or assign any employee to any supervisor. Only administrators have the authority to perform this action. If the employee is already assigned to this supervisor, an error will be thrown. If the employee is assigned under another supervisor, they will be untagged from the current supervisor and added under the new one.

<br/>

- `GET - /api/role/get-all`: Retrieve all roles. The requested user's role will include permissions if matched otherwise, it will only contain role_name and \_id.
- `POST - /api/role/get-all`: Add a new role(between "administrator", "supervisor" and "employee"). Users need to send only role_name, and default permissions will be assigned from the model. Only administrator have access to perform.

#### [Note: Token required for all of above api exist auth/sign-in]

### Frontend

#### Folder structure (/client is for frontend)

- `client/App.js` : This is the primary entry point of client application, where the core functionality begins.
- `client/src/pages` : This directory contains all the main pages of application. These pages are rendered on the client side and contain all route declarations.
- `client/src/context` : This folder houses Context API implementations. These are utilized across multiple components for consistent state management.
- `client/src/components` : This directory is dedicated to reusable components.
- `client/public` : This is where static files such as HTML, CSS, images, and other public assets are stored. These files are accessible to the client and are essential for the look and feel of the application.

### Some information related security and others

- Token Encryption Using JWT: Utilizing JWT (JSON Web Tokens) for token encryption. Each token encapsulates the user's ID and their assigned role. This approach is essential as certain server-side actions require the user's ID or role for execution. Each token is valid of 1 day.

- Password Hashing with Unique Salt Keys: For securing user passwords, implemented hashing via the Crypto library. A distinctive feature of my approach is the use of unique salt keys for each user. This method enhances the security of user credentials, ensuring robust authentication.

- Role-Based Permission Management: Permissions are systematically managed within our 'Role' collection. These permissions are pivotal for authorization processes. In specific scenarios, the base role (as identified in the token) is instrumental in modifying data or actions on the server side.
  
- Client: In client side for designing mostly use in-line css,scss and material ui. Also client side is mobile responsive.