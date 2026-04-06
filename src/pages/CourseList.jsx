import axios from "axios";
import React, { useEffect, useState } from "react";
import Course from "./Course";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    let response = await axios.get("http://localhost:3000/courses");
    setCourses(response.data);
  };

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-around">
      {courses.map((el) => (
        <Course data={el} key={el.cId} />
      ))}
    </div>
  );
};

export default CourseList;
