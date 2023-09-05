import React from "react";
import { useContext } from "react";
import userContext from "../context/User/userContext";
import { useState } from "react";
import imgContext from "../context/ImageHandles/imgContext";
import { useEffect, useRef } from "react";
import axios from "axios";
import $ from 'jquery';

const Profile = (props) => {
  const userdetails = useContext(userContext);
  // user context

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  // for showing time registered

  function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find((i) => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
  }
  // for showing time registered

  const timeDiff = (text) => {
    // const d1 = Date.now;
    const d2 = new Date(text);
    return timeSince(d2);
  };
  // getting time difference

  const imagedetails = useContext(imgContext);
  const { origImage, getImage, setOrigImage } = imagedetails;
  // console.log(getImage);
  // image context
  // const ref = useRef(null);
  // const refClose = useRef(null);
  // console.log("origImage in Profile ", origImage.data);
  const [uploadedFile, setUploadedFile] = useState({ testImage: "" });
  const [profilepicUrl, setProfilepicUrl] = useState({ testImage: "" });

  const host = "http://localhost:5000";
  const FinalPost = async (newImage) => {
    try {
      await axios.post(`${host}/api/image/upload`, newImage, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userdetails.getUserDetails();
    if (localStorage.getItem("token")) {
      // console.log(origImage);
      getImage();
      // console.log(localStorage.getItem("dp"), "ok");
    }
  }, []);

  // using effect on page rendering
  const submitUploadedFile = async (event) => {
    event.preventDefault();
    // uploadImage(uploadedFile);
    await FinalPost(uploadedFile);
    console.log(uploadedFile);
    setProfilepicUrl(uploadedFile);
    setOrigImage({
      ...origImage,
      [origImage.testImage]: uploadedFile.testImage,
    });
    props.showAlert("Profile Photo Changed Successfully!", "success");
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onChangeFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // console.log(file);
    const base64f = await convertToBase64(file);
    // console.log(base64f);
    setUploadedFile({ ...uploadedFile, testImage: base64f });
  };

  const [editName, setEditName] = useState({
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
  });

  const handleENamechange = (event) => {
    setEditName({ ...editName, [event.target.name]: event.target.value });
  };

  const submitNameChange = async (event) => {
    event.preventDefault();
    // console.log(editName);
    $('#EditName').modal('hide');
    userdetails.editUserdetails(
      localStorage.getItem("userid"),
      editName.first_name,
      editName.last_name
    );
    props.showAlert("Name Changed Successfully!", "success");
  };

  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(1);

  return (
    <>
      <div
        className="container"
        style={{
          justifyContent: "center",
          display: "flex",
          fontWeight: "bolder",
        }}
      >
        <h1> Profile Page</h1>
      </div>
      <div
        className="container my-3"
        style={{
          color: "white",
          justifyContent: "center",
          display: "flex",
          height: "200px",
        }}
      >
        <div>
          <img
            style={{
              borderRadius: "50%",
              opacity: opacity,
              cursor: "pointer",
              width: "200px",
              height: "200px",
            }}
            alt=""
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            src={
              profilepicUrl.testImage ||
              origImage.testImage ||
              "https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
            }
            // onClick={submitUploadedFile}
            onMouseEnter={() => {
              setHovered(true);
              setOpacity(0.7);
            }}
            onMouseLeave={() => {
              setHovered(false);
              setOpacity(1);
            }}
            title="Change Profile Image"
          />
          {hovered && (
            <i
              style={{
                fontSize: "20px",
                color: "gray",
                position: "absolute",
                top: "35%",
                left: "49.40%",
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="fa-solid fa-square-pen"
              // onClick={submitUploadedFile}
              title="Change Profile Image"
              onMouseEnter={() => {
                setHovered(true);
                setOpacity(0.7);
              }}
              onMouseLeave={() => {
                setHovered(false);
                setOpacity(1);
              }}
            />
          )}
        </div>
      </div>

      <div
        className="container"
        style={{ justifyContent: "center", display: "flex" }}
      >
        <h2 style={{ display: "inline" }} className="mx-2">
          {userdetails.state2.first_name} {userdetails.state2.last_name}
          <i
            style={{ fontSize: "20px", color: "gray" }}
            className="fa-solid fa-square-pen"
            data-bs-toggle="modal"
            data-bs-target="#EditName"
            title="Edit Name"
          />
        </h2>
      </div>
      <div
        className="container"
        style={{ justifyContent: "center", display: "flex" }}
      >
        <h3 style={{ display: "inline" }}>
          Email Address: {userdetails.state2.email}
        </h3>
      </div>
      <div
        className="container"
        style={{ justifyContent: "center", display: "flex" }}
      >
        <h5 style={{ display: "inline" }}>
          Registered: {timeDiff(userdetails.state2.date)}
        </h5>
      </div>
      {/* Modal for Profile Pic Change */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form
              className="mx-1"
              onSubmit={submitUploadedFile}
              encType="multipart/form-data"
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change Profile Photo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label mx-2">
                  Image must be less than 16MB
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  filename="testImage"
                  required
                  onChange={onChangeFile}
                  accept=".jpeg, .jpg, .png"
                />
              </div>
              <div className="modal-footer mx-1">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Change Profile Picture
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Modal for Name Change */}
      <div
        className="modal fade"
        id="EditName"
        tabIndex="-1"
        aria-labelledby="EditName2Label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form
              className="mx-1"
              onSubmit={submitNameChange}
              encType="multipart/form-data"
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change Your Name
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mb-3">
                <div className="mb-3">
                  <label for="editfname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editfname"
                    minLength={3}
                    required
                    name="first_name"
                    value={editName.first_name}
                    onChange={handleENamechange}
                  />
                </div>
                <div className="mb-3">
                  <label for="editlname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editlname"
                    name="last_name"
                    value={editName.last_name}
                    onChange={handleENamechange}
                  />
                </div>
              </div>
              <div className="modal-footer mx-1">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Change Name
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
