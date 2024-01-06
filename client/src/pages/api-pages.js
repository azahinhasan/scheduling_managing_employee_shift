import Cookies from "js-cookie";
// import dotenv from "dotenv";
// dotenv.config();

const signIn = async (body) => {
  try {
    let response = await fetch(process.env.REACT_APP_PROXY + `/auth/sign-in`, {
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
      process.env.REACT_APP_PROXY + `/api/role/get-all`,
      {
        method: "GET",
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
      process.env.REACT_APP_PROXY + `/api/user/get-all`,
      {
        method: "GET",
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
        method: "PUT",
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
        method: "DELETE",
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
      process.env.REACT_APP_PROXY + `/api/user/change-role/` + userId,
      {
        method: "POST",
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
      process.env.REACT_APP_PROXY + `/api/user/get-by-id`,
      {
        method: "GET",
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
      process.env.REACT_APP_PROXY + `/api/supervisor-employee-relations/all-assigned-employee`,
      {
        method: "GET",
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

const tagToSupervisor= async body => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/supervisor-employee-relations/tag-employee-to-supervisor`,
      {
        method: "PUT",
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

const untagFromSupervisor= async body => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/supervisor-employee-relations/untag-employee-from-supervisor`,
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

const getAllShift = async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/shift/get-all`,
      {
        method: "GET",
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

const createShift = async (body) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/shift/create`,
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

const deleteShift = async (id) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/shift/delete/`+id,
      {
        method: "DELETE",
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
}

const updateShift = async (body,id) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/shift/update/`+id,
      {
        method: "PUT",
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

const modifyEmployeeShift = async (body,id) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_PROXY + `/api/shift/modify-employees-shift`,
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
}

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
  tagToSupervisor,
  untagFromSupervisor,
  createShift,
  deleteShift,
  updateShift,
  getAllShift,
  modifyEmployeeShift
};
