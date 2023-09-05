import React from "react";
const About = () => {
  return (
    <div
      className="container my-2"
      style={{
        paddingBottom: "500px",
        fontSize: "23px",
        fontWeight: "bolder",
        textAlign: "center",
      }}
    >
      <img
        src="./logo_full_dark.png"
        className="my-2"
        style={{
          display: "flex",
          width:"50%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      ></img>
      This is About CloudBook
    </div>
  );
};

export default About;
