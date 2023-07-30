import React from "react";
import { useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

export default function AdminDeleteCourse(props) {
  const courseId = props.courseId;
  console.log(courseId);
  useEffect(() => {
    fetch(
      "https://vidhyapith-full-stack-app.vercel.app/admin/courses/delete/" +
        courseId,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          auth: "bearer " + localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        Navigate("/admin/courses");
      });
    });
  });
}
