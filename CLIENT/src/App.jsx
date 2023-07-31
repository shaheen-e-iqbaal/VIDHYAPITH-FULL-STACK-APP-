import Signup from "./components/user-components/Signup"
import Appbar from "./components/user-components/Appbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from "./components/user-components/Signin"
import AddCourse from "./components/admin-components/AddCourse"
import Signin_appbar from "./components/admin-components/Signin_appbar"
import Courses from "./components/admin-components/Courses"
import Coursee from "./components/admin-components/Coursee"
import UserAllCourses from './components/user-components/UserAllCourses';
import SingleCourse from "./components/user-components/SingleCourse";
import UserPurchasedCourses from "./components/user-components/UserPurchasedCourses"
import Setting from "./components/user-components/Setting";
import FaltuContent from "./components/user-components/FaltuContent"
import CoursesBeforeSignin from "./components/user-components/CoursesBeforeSignin"
import AdminAppbar from './components/admin-components/AdminAppbar'
import AdminSignin from "./components/admin-components/AdminSignin"
import AdminSignup from "./components/admin-components/AdminSignup"
import AdminCoursesBeforeSignin from "./components/admin-components/AdminCoursesBeforeSignin"
import AdminSetting from "./components/admin-components/AdminSetting"
import AdminFaltuContent from "./components/admin-components/AdminFaltuContent"
import { Switch } from "@mui/material"
import Sidebar from "./components/user-components/Sidebar"
import AdminSidebar from './components/admin-components/AdminSidebar'
import { useLocation } from "react-router-dom"
import React  from "react"

function App() {
  
  const path = window.location.href;
  const parts = path.split("/");
  const lastPart = parts[parts.length - 1];
  const secondlastpart = parts[parts.length - 2];
  const components =
    lastPart === "admin" ||
    secondlastpart === "admin" ||
    lastPart === "courses" ||
    secondlastpart === "coursee" ? (
      <AdminAppbar />
    ) : (
      <Appbar />
    );

  return (
    <>
      <Router>
        {components}
        <Routes>
          {/* USER ROUTES */}

          <Route path="/signin" element={[<Signin />]} />
          <Route path="/signup" element={[<Signup />]} />
          <Route path="/appbar" element={[<Appbar />]} />
          <Route path="/signin_appbar" element={<Signin_appbar />} />
          <Route
            path="/userallcourses"
            element={[<UserAllCourses />]}
          />
          <Route
            path="/singlecourse/:courseId"
            element={[<SingleCourse />]}
          />
          <Route
            path="/userpurchasedcourses"
            element={[<UserPurchasedCourses />]}
          />
          <Route path="/setting" element={[<Setting />]} />
          <Route path="/home" element={[<FaltuContent />]} />
          <Route exact path="/" element={[<FaltuContent />]} />
          <Route
            path="/coursesbeforesignin"
            element={[<CoursesBeforeSignin />]}
          />

          {/* USER ROUTES */}

          {/* ADMIN ROUTES */}

          <Route
            exact path="/admin"
            element={[<AdminFaltuContent />]}
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/coursee/:courseId" element={<Coursee />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/courses" element={[<Courses />]} />
          <Route path="/admin/setting" element={<AdminSetting />} />
          <Route path="/admin/addcourse" element={<AddCourse />} />
          <Route
            path="/admin/admincoursesbeforesignin"
            element={<AdminCoursesBeforeSignin />}
          />

          {/* ADMIN ROUTES */}
        </Routes>
      </Router>
    </>
  );
}

export default App
