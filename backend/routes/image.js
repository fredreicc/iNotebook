const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const multer = require("multer");
const ImageModel = require("../models/Image");
router.use(express.json({ limit: "10mb", extended: true }));
router.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

router.post(
  "/upload",
  upload.single("testImage"),
  fetchuser,
  async (req, res) => {
    const body = req.body;
    body.user = req.user.id;
    try {
      const newImage = await ImageModel.create(body);
      newImage.save();
      res.status(201).json({ msg: "New image uploaded..." });
    } catch (error) {
      console.error("error got: ", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/getimg", fetchuser, async (req, res) => {
  try {
    ImageModel.find({ user: req.user.id })
      .sort({ _id: -1 })
      .limit(1)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json(error);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
