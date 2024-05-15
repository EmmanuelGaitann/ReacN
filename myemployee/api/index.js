const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://emmanuel:emmanuel@cluster0.ni5q0nv.mongodb.net/", {
    useNewUrlParser: true,
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

const Employee = require("./models/employee");
const Attendance = require('./models/attendance');

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    //creation d'un nouvel employée
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({
        message: "Reussit: l'enregistrement de l'employee",
        employee: newEmployee,
      });
  } catch (error) {
    console.log("Echec Creation Emplyéé", error);
    res.status(500).json({ message: "Echec Enregistrement Employee" });
  }
});

//endpoint to fetch all the employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Echec de recuperation de l'employee" });
  }
});
