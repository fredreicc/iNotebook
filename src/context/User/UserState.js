import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const host = "http://localhost:5000";
  const state = {
    email: localStorage.getItem("email"),
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
    date: localStorage.getItem("date"),
  };
  const [state2, setState2] = useState(state);

  const update = (email, first_name, last_name, date) => {
    setState2({
      email: email,
      first_name: first_name,
      last_name: last_name,
      date: date,
    });
  };
  const getUserDetails = async () => {
    // console.log("Adding a new note");
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    update(json.email, json.first_name, json.last_name, json.date);
    localStorage.setItem("first_name", json.first_name);
    localStorage.setItem("last_name", json.last_name);
    localStorage.setItem("email", json.email);
    localStorage.setItem("date", json.date);
    localStorage.setItem("userid", json._id);
  };

  const editUserdetails = async (id, first_name, last_name) => {
    const res = await fetch(`${host}/api/auth/editusername/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ first_name, last_name }),
    });
    console.log(res);
    getUserDetails();
  };

  return (
    <UserContext.Provider value={{ state2, update, getUserDetails, editUserdetails }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
