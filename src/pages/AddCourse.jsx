import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const AddCourse = () => {
  const [course, setCourse] = useState({
    cname: "",
    course_image: "",
    course_fees: "",
    course_duration: "",
    course_author: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      cId: uuid(), // UUID generated here
      course,
      course_fees: Number(course.course_fees),
    };

    await axios.post("http://localhost:3000/courses", newCourse);

    toast.success("Course Added Successfully!");

    setCourse({
      cname: "",
      course_image: "",
      course_fees: "",
      course_duration: "",
      course_author: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-600">
          Add Course
        </h2>

        <input
          type="text"
          name="cname"
          placeholder="Course Name"
          value={course.cname}
          onChange={handleChange}
          required
          className="border p-2 rounded-md focus:outline-cyan-500"
        />

        <input
          type="text"
          name="course_image"
          placeholder="Image URL"
          value={course.course_image}
          onChange={handleChange}
          required
          className="border p-2 rounded-md focus:outline-cyan-500"
        />

        <input
          type="number"
          name="course_fees"
          placeholder="Course Fees"
          value={course.course_fees}
          onChange={handleChange}
          required
          className="border p-2 rounded-md focus:outline-cyan-500"
        />

        <input
          type="text"
          name="course_duration"
          placeholder="Duration (e.g. 6 Months)"
          value={course.course_duration}
          onChange={handleChange}
          required
          className="border p-2 rounded-md focus:outline-cyan-500"
        />

        <input
          type="text"
          name="course_author"
          placeholder="Author Name"
          value={course.course_author}
          onChange={handleChange}
          required
          className="border p-2 rounded-md focus:outline-cyan-500"
        />

        <button
          type="submit"
          className="bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-all"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
