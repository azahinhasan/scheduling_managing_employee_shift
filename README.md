# Singularity task

### Instruction to run this app
- Make sure the user has docker on the system
- Clone the app and open the docker desktop
- Go to the project folder and run the following command via the terminal: <br/>
  `docker compose up` <br/>
  or <br/>
  `docker compose up -d client` [if the user doesn't want to see logs in the same terminal] <br/>
  <br/>
  Give some time. Then the server will run on `PORT:5000` and the client on `PORT:3000`(make sure there is nothing running on those port).
  <br/> [PS: if users have an old version of docker then they might have to add a hyphen like this docker-compose]
  

### Instruction to run Unit Tests
- Make sure app(server) is running(by following above instruction).
- Now open another terminal and go to the server directory and run the following command:<br/>
  `docker exec -it singularity-task-server sh`.
  <br/> It will take us into the server container. Also, user can access it from the docker desktop. There is an option called `Open in terminal` into three dots beside all containers.
- After doing that user can see `/app #` in the terminal. Now type the following command:`npm run test`. It will start Jest.

#### Note: other information related to the app is given in `technical_documentation.md` file. Which is located at the root of this project. And credentials for testing can be found into this file as well.