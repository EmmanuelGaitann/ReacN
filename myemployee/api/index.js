const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

mongoose
  .connect("mongodb+srv://emmanuel:emmanuel@cluster0.ni5q0nv.mongodb.net/", {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((error) => {
    console.log("Erreur de connection a MongoDb", error);
  });

app.listen(port, () => {
  console.log("Serveur lancer sur le port 8000 le port");
});
