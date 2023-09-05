import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/User/userContext";
import BrightIDButton from "grail-test";

const Login = (props) => {
  const context = useContext(userContext);
  // const {update} = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      // console.log(credentials.email);
      context.getUserDetails();
      Navigate("/");
      // console.log(context.email);
      props.showAlert("Logged In Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const handleRegister = () => {
    Navigate("/signup");
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>    <BrightIDButton />
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <h1
            style={{
              fontWeight: "bolder",
            }}
          >
            Login to CloudBook
          </h1>
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{
              fontWeight: "bolder",
            }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
            style={{
              fontWeight: "bolder",
            }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-1"
        >
          Login
        </button>

        <button
          type="submit"
          className="btn my-1"
          color="blue"
          onClick={handleRegister}
          style={{
            fontWeight: "bolder",
          }}
        >
          <u
            style={{
              fontWeight: "bolder",
            }}
          >
            New User?
          </u>
        </button>
      </form>
    </>
  );
};

export default Login;
