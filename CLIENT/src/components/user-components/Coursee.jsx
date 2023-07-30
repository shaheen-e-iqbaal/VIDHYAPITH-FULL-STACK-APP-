import React from "react";
import { useEffect } from "react";

export default function Coursee(props) {
  const { courseId } = props;
  useEffect(() => {
    const obj = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        auth: "bearer " + localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:3000/users/courses/" + { courseId }, obj).then(
      (res) => {
        res.json().then((data) => {
          alert("course purchased succesfully");
        });
      }
    );
  }, []);
}
