import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
import UserState from "./context/User/UserState";
import Profile from "./components/Profile";
import ImageState from "./context/ImageHandles/ImageState";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const backgrounds = [
    "https://i.pinimg.com/originals/46/9e/2b/469e2b971cbfcc9403885a2d2faa192e.jpg",
    "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000",
    "https://png.pngtree.com/background/20210709/original/pngtree-parasol-parachute-rescue-equipment-color-background-picture-image_403082.jpg",
    "https://blog.depositphotos.com/wp-content/uploads/2017/07/Soothing-nature-backgrounds-2.jpg.webp",
    "https://colibriwp.com/blog/wp-content/uploads/2019/06/pawel-czerwinski-vI5XwPbGvmY-unsplash.jpg",
    "https://w0.peakpx.com/wallpaper/146/911/HD-wallpaper-blue-abstract-waves-creative-blue-wavy-background-blue-backgrounds-abstract-waves-waves-textures.jpg",
    "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds_181624-11068.jpg?w=2000",
    "https://www.pcclean.io/wp-content/uploads/2020/4/iuEnim.jpg",
    "https://img.rawpixel.com/private/static/images/website/2022-05/rm422-076-x.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=444e119094ef45a3248aa529fb696b2b",
    "https://i.pinimg.com/736x/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
    "https://i.pinimg.com/736x/cf/da/3c/cfda3c9030bc6706e4c3509582e19526.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/249/78/desktop-wallpaper-horizon-moon-mug-purple-moon-and-mountain.jpg",
    "https://images7.alphacoders.com/411/411820.jpg",
    "https://wallpapercave.com/wp/wp3311457.jpg",
    "http://wallpaperset.com/w/full/3/c/7/452349.jpg",
    "https://www.teahub.io/photos/full/177-1777872_sunset-clouds-dark-ocean-wallpapers-dark-desktop-backgrounds.jpg",
  ];

  // const [ind, setInd] = useState(0);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setInd((ind + Math.floor(Math.random() * 100)) % backgrounds.length);
  //   }, 10000);
  // });

  const myStyle = {
    backgroundImage: "url('" + backgrounds[0] + "')",
    height: "100%",
    // margin: "0",
    paddingBottom: "500px",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    fontFamily: 'Cantata One',
  };

  return (
    <>
      <div style={myStyle}>
      <ImageState>
        <UserState>
          <NoteState>
            <BrowserRouter>
              <NavBar />
              <Alert alert={alert} />
              <Routes>
                <Route
                  path="/"
                  element={<Home showAlert={showAlert} />}
                ></Route>
                <Route path="/about" element={<About />}></Route>
                <Route
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                ></Route>
                <Route
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                ></Route>
                <Route
                  path="/profile"
                  element={<Profile showAlert={showAlert} />}
                ></Route>
              </Routes>
            </BrowserRouter>
          </NoteState>
        </UserState>
      </ImageState>
      </div>
    </>
  );
}

export default App;
