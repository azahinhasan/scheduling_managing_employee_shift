import Cookies from "js-cookie";
// import dotenv from "dotenv";
// dotenv.config();

const signIn = async (body) => {
  try {
    let response = await fetch(process.env.REACT_APP_PROXY + `/auth/sign_in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (body) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllRoles = async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/role/get_all`,
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserList = async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/get_all`,
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const createUser = async (body) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(body),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (body, userId) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/update/` + userId,
      {
        method: "Put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(body),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (userId) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/delete/` + userId,
      {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const changeRole = async (userId) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/change_role/` + userId,
      {
        method: "Post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserInfoById= async (userId) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/user/get_by_id`,
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllGroups= async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/supervisor_employee_relations/all_assigned_employee`,
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const tagToSupervisor= async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/supervisor_employee_relations/tag_employee_to_supervisor`,
      {
        method: "Put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


export {
  signIn,
  signUp,
  getUserList,
  getAllRoles,
  createUser,
  updateUser,
  deleteUser,
  changeRole,
  getUserInfoById,
  getAllGroups,
  tagToSupervisor
};
