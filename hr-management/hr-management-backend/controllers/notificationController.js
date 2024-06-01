const { text } = require("express");
const notificationService = require("../services/notificationService");

exports.sendNotification = (req,res) => {
    const { to, subject, text } =req.body;

notificationService.sendNotification(to,subject,text);
res.status(200).json({message:'notification envoyé'});
};