const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect("mongodb+srv://emmanuel:emmanuel@cluster0.ni5q0nv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connecté a mongo");
  })
  .catch((error) => {
    console.log("Erreur de connection a mongo", error);
  });

app.listen(port, () => {
  console.log("Serveur lancé sur le port",port);
});

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    //create a new Employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee Enregistré avec succes",
      employe: newEmployee,
    });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Echec d'ajout d'employé" });
  }
});

//endpoint to fetch all the employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Echec de recuperation d'employee" });
  }
});
