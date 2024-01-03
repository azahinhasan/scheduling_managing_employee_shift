import Cookies from "js-cookie";
// import dotenv from "dotenv";
// dotenv.config();

const signIn = async body => {
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

const signUp = async body => {
  try {
    let response = await fetch(process.env.REACT_APP_PROXY + `/api/user/create`, {
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

export {
  signIn,signUp
};
