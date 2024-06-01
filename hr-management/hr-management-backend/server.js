const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion des ressources humaines");
});

// Routes
const employeRoutes = require("./routes/employeRoutes");
app.use("/api/employes", employeRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
