const express = require('express');
const { authenticateJwt, secretKey, generatejwt } = require("../middleware/auth");
const { User, Course, Admin } = require("../db");
const router = express.Router();

  
  

  router.post("/signup", async (req, res) => {
    // logic to sign up user
    const user = req.body;
    const present = await User.findOne(user);
    if (present) {
      res.status(404).json({ message: "User already exist" });
    } else {
      const newuser = new User(user);
      newuser.save();
      req.body.role = "User";
      const token = generatejwt(req);
      res
        .status(200)
        .json({ message: "user created succesfully", token: token });
    }
  });

  router.post("/login", async (req, res) => {
    // logic to log in user
    const { username, password } = req.body;
    const present = await User.findOne({ username, password });
    if (present) {
      req.body.role = "User";
      const token = generatejwt(req);
      res.status(200).json({ message: "Logged in succesfully", token: token });
    } else {
      res.status(404).json({ message: "Invalid credential" });
    }
  });

  router.post("/update", authenticateJwt, async (req, res) => {
    const username = req.user.username;
    const password = req.user.password;
    const present = await User.findOne({
      username: username,
      password: password,
    });
    const obj = {
      username: username,
      password: req.body.password,
      purchasedCourses: present.purchasedCourses,
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
      req.body.role = "User";
      const token = generatejwt(req);
      res.json({ message: "updated succesfully", token: token });
    } else {
      res.status(404).json({ message: "failed update operation" });
    }
  });

  router.get("/me", authenticateJwt, (req, res) => {
    res.status(200).json(req.user.username);
  });

  router.get("/password", authenticateJwt, (req, res) => {
    res.status(200).json(req.user.password);
  });

  router.get("/courses", authenticateJwt, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({});
    res.status(200).json(courses);
  });

  router.get("/coursesbeforesignin", async (req, res) => {
    const courses = await Course.find({});
    res.status(200).json(courses);
  });

  router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
    // logic to purchase a course
    const courseId = req.params.courseId;
    const course = await Course.findOne({ courseId: courseId });

    if (!(course === null)) {
      const user = await User.findOne({
        username: req.user.username,
        password: req.user.password,
      });
      if (user) {
        user.purchasedCourses.push(course);
        user.save();
        res.status(200).json("course purchased succesfully");
      } else {
        res.status(404).json("no such user available");
      }
    } else {
      res.status(404).json("no such course available");
    }
  });

  router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({
      username: req.user.username,
      password: req.user.password,
    });
    if (user) {
      let courses = [];
      for (i = 0; i < user.purchasedCourses.length; i++) {
        const course = await Course.findById(user.purchasedCourses[i]);
        courses.push(course);
      }
      res.status(200).json(courses);
    } else {
      res.status(404).json("no such user exist");
    }
  });

  module.exports = router;