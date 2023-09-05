import imgContext from "./imgContext";
import { useState } from "react";

const ImageState = (props) => {
  const host = "http://localhost:5000";
  const [origImage, setOrigImage] = useState({ testImage: "" });

  const getImage = async () => {
    const response = await fetch(`${host}/api/image/getimg`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const res = await response.json();
    // console.log("print for res on line 16",res[0].img.data);
    if (res[0].testImage) {
      setOrigImage({ ...origImage, testImage: res[0].testImage });
      localStorage.setItem("dp", res[0].testImage);
    }
  };

  const deleteImage = async (id) => {
    const response = await fetch(`${host}/api/image/delete/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <imgContext.Provider value={{ origImage, getImage, setOrigImage, deleteImage }}>
      {props.children}
    </imgContext.Provider>
  );
};

export default ImageState;
