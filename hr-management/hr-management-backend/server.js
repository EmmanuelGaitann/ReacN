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

const absenceRoutes = require("./routes/absenceRoutes");
app.use("/api/absences", absenceRoutes);

const demandeAbsenceRoutes = require("./routes/demandeAbsenceRouttes");
app.use("/api/demande-absence", demandeAbsenceRoutes);

const typeAbsenceRoutes = require("./routes/typeAbsenceRoutes");
app.use("/api/type-absence", typeAbsenceRoutes)

const salaireRoutes = require("./routes/salaireRoutes");
app.use("/api/salaires", salaireRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);