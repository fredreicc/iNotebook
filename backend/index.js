const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
var app = express();
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/image", require("./routes/image"));


app.listen(port, () => {
  console.log(`CloudBook backend listening on port ${port}`);
});
