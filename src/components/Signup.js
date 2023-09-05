import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/User/userContext";

const Signup = (props) => {
  const context = useContext(userContext);
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  let Navigate = useNavigate();
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { first_name, last_name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      context.getUserDetails();
      Navigate("/");
      props.showAlert("Account Successfully Created", "success");
    } else {
      props.showAlert("User with same email address already exists", "danger");
    }
  };

  return (
    <div
      className="container"
      style={{
        fontWeight: "bolder",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h1
            style={{
              fontWeight: "bolder",
            }}
          >
            Signup to CloudBook
          </h1>
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            onChange={onChange}
            name="first_name"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            onChange={onChange}
            name="last_name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength={8}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            onChange={onChange}
            name="confirmpassword"
          />
          <div id="emailHelp" class="form-text">
            {credentials.password === credentials.confirmpassword
              ? ""
              : "Passwords don't match"}
          </div>
        </div>

        <button
          type="submit"
          disabled={
            credentials.password === credentials.confirmpassword &&
            credentials.confirmpassword.length > 0
              ? ""
              : "true"
          }
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
