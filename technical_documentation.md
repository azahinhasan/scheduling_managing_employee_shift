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

- `POST - /auth/sign-in`: User for sign. Send into the body:<br/>
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

- `GET - /api/role/get-all`: Retrieve all roles. The requested user's role will include permissions if matched otherwise, it will only contain role_name and _id.
- `POST - /api/role/get-all`: Add a new role(between "administrator", "supervisor" and "employee"). Users need to send only role_name, and default permissions will be assigned from the model. Only administrator have access to perform.
