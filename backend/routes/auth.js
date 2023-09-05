const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
router.use(express.json({ limit: "10mb", extended: true }));
router.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

// Create a User

const JWT_SECRET = "SabMohMayaHai";

// Route 1(Create a User)
router.post(
  "/createUser",
  [
    body("first_name", "Enter a valid name").isLength({ min: 3 }),
    body("last_name", "Enter a valid name"),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length should be atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);
      success = true;
      // res.json(user);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
    // res.send("hello");
  }
);

// Route2: Authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = false;
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const passwordComp = await bcrypt.compare(password, user.password);
      if (!passwordComp) {
        success = false;
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);

      // res.json(user);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route3: Get logged in User details: POST "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edituserName/:id", fetchuser, async (req, res) => {
  const { first_name, last_name, date } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const secPass = await bcrypt.hash(password, salt);
  try {
    const newUser = {};
    if (first_name) {
      newUser.first_name = first_name;
    }
    if (last_name) {
      newUser.last_name = last_name;
    }
    // if (password) {
    //   newUser.password = secPass;
    // }
    let tempuser = await User.findById(req.params.id);
    if (!tempuser) {
      res.status(404).send("Not Found");
    }

    tempuser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );

    res.json({ tempuser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
