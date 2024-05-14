const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true,
        unique:true,
    },
    employeeName:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    joinningDate:{
        type:String,
        required: true,
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    salary:{
        type:number,
        required:true,
    },
    activeeEmplyee:{
        type:Boolean,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;