const express = require("express"); //loading mongoose module for MongoDB Connection

const mongoose = require("mongoose");

const router = express.Router();

//injecting userModel.
const UserModel = require("../model/UserModel");

//Testing Database connection for localhost
//const db = "mongodb://localhost:27017/foodDB";

//Testing Database connection for cloudclever
const db =
  "mongodb://uixdaznktlpcscsnhxgr:HO4MSt14eSzuGmSe20Hg@b29zv75kznnqjb0-mongodb.services.clever-cloud.com:27017/b29zv75kznnqjb0";

//loading multer module
const multer = require("multer");

//Basic Configuration for Multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
  destination: "public/images/",
});

const upload = multer({
  storage: storage,
});

mongoose.connect(db, (err) => {
  if (err) throw err;
  else console.log("Successfully connected to MongoDB");
});

//get all food list from database
router.get("/users", (req, res) => {
  // res.send("All foods from database");
  UserModel.find({}).exec((err, data) => {
    if (err) res.status(200).json({ message: err });
    else res.status(200).json({ userlist: data });
  });
});

//adding new food details
router.post("/users", upload.single("photo"), (req, res) => {
  //accepting incoming data
  const name = req.body.name;
  const email = req.body.email;
  const dob = req.body.dob;
  const role = req.body.role;
  const biodata = req.body.biodata;

  const photo = "http://localhost:4200/images/" + req.file.filename;
  //console.log("pic-----", photo);

  //Creating instance of foodList Model
  const newUser = new UserModel();
  //assigning value to model
  newUser.name = name;
  newUser.email = email;
  newUser.dob = dob;
  newUser.role = role;
  newUser.biodata = biodata;
  newUser.photo = photo;

  //inserting model to Collections.
  newUser.save((err, data) => {
    if (err) {
      res
        .status(200)
        .json({ message: "email already exists", status: "false" });
    } else {
      res.status(201).json({
        message: "One User Added Successfully !",
        data: data,
        status: "true",
      });
    }
  });
});

//Put Request
router.put("/users/:id", upload.single("photo"), (req, res) => {
  // console.log(
  //   "req body is---->" +
  // );
  if (req.file) {
    const photo = "http://localhost:4200/images/" + req.file.filename;
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          dob: req.body.dob,
          role: req.body.role,
          biodata: req.body.biodata,
          photo: photo,
        },
      },
      { new: true },
      (err, data) => {
        if (err)
          res.status(200).json({ message: "Cannot update", status: "false" });
        else
          res
            .status(202)
            .json({ message: "Updated", data: data, status: "true" });
      }
    );
  } else {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          dob: req.body.dob,
          role: req.body.role,
          biodata: req.body.biodata,
        },
      },
      { new: true },
      (err, data) => {
        if (err)
          res.status(200).json({ message: "Cannot update", status: "false" });
        else
          res
            .status(202)
            .json({ message: "Updated", data: data, status: "true" });
      }
    );
  }
});

//delete request
router.delete("/users/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id).exec((err, data) => {
    if (err)
      res.status(200).json({ message: "could not delete", status: "false" });
    else
      res.status(202).json({ message: "Successfully Deleted", status: "true" });
  });
});

//make router object available to server.js
module.exports = router;
console.log("Router is Configured");
