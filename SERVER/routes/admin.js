const mongoose = require("mongoose");
const express = require('express');
const { User, Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { secretKey } = require("../middleware/auth")
const { authenticateJwt, generatejwt } = require("../middleware/auth");

const router = express.Router();


  router.get("/role", authenticateJwt, (req, res) => {
    if (req.user.role === "Admin") res.json({ role: "Admin" });
    else res.json({ role: "User" });
  });

  router.get("/courses", async (req, res) => {
    const courses = await Course.find({});
    res.status(200).json(courses);
  });

  // Admin routes
  router.post("/signup", async (req, res) => {
    // logic to sign up admin
    const admin = req.body;
    const present = await Admin.findOne(req.body);
    if (present) {
      res.status(403).json({ message: "Admin exist already" });
    } else {
      const newAdmin = new Admin(admin);
      await newAdmin.save();
      req.body.role = "Admin";
      const token = generatejwt(req);
      res
        .status(200)
        .json({ message: "Admin created succesfully", token: token });
    }
  });

  router.post("/login", async (req, res) => {
    // logic to log in admin
    const { username, password } = req.body;
    const present = await Admin.findOne({ username, password });
    if (present) {
      req.body.role = "Admin";
      const token = generatejwt(req);
      res.status(200).json({ message: "Logged in succesfully", token: token });
    } else {
      res.status(404).json({ message: "Invalid credential" });
    }
  });

  router.get("/me", authenticateJwt, (req, res) => {
    res.status(200).json(req.user.username);
  });

  router.post("/update", authenticateJwt, async (req, res) => {
    const username = req.user.username;
    const password = req.user.password;
    const present = await Admin.findOne({
      username: username,
      password: password,
    });
    const obj = {
      username: username,
      password: req.body.password,
    };
    const update = await User.findOneAndUpdate(
      {
        username: username,
        password: password,
      },
      obj,
      { new: true }
    );
    if (update) {
      req.body.username = username;
      req.body.role = "Admin";
      const token = generatejwt(req);
      res.json({ message: "updated succesfully", token: token });
    } else {
      res.status(404).json({ message: "failed update operation" });
    }
  });

  router.post("/courses", authenticateJwt, async (req, res) => {
    // logic to create a course
    const course = req.body;
    const present = await Course.findOne({ courseId: course.courseId });
    const present1 = await Course.findOne({
      title: course.title,
      description: course.description,
    });
    if (present) {
      res.status(404).json({ message: "Course with this ID Exist" });
    } else if (present1) {
      res
        .status(404)
        .json({ message: "Course with this Title and Description Exist" });
    } else {
      const newcourse = new Course(course);
      await newcourse.save();
      res
        .status(200)
        .json({ message: "course created", courseId: newcourse.id });
    }
  });

  router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    // logic to edit a course
    const courseId = req.params.courseId;
    const course = await Course.findOneAndUpdate(
      { courseId: courseId },
      req.body,
      { new: true }
    );
    if (course) {
      res.status(200).json({ message: "course updated succesfully" });
    } else {
      res.status(404).json({ message: "no such courses" });
    }
  });

  router.delete(
    "/courses/delete/:courseId",
    authenticateJwt,
    async (req, res) => {
      const courseId = req.params.courseId;
      const course = await Course.findOneAndDelete({ courseId: courseId });
      res.json({ message: "course deleted succesfully" });
    }
  );

  router.get("/courses", authenticateJwt, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.status(200).json(courses);
  });

  module.exports = router;