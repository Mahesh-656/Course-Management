import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [courseData, setCourseData] = useState({
    cname: "",
    course_image: "",
    course_fees: "",
    course_duration: "",
    course_author: "",
  });

  let { cname, course_author, course_fees, course_image, course_duration } =
    courseData;

  let handleChange = (e) => {
    let name = e.target.name;
    setCourseData({ ...courseData, [name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(courseData);
    if (
      course_author &&
      course_image &&
      course_duration &&
      course_fees &&
      cname
    ) {
      let result = await axios.put(
        `http://localhost:3000/courses/${id}`,
        courseData
      );
      console.log(result);
      if (result.status == 200) {
        toast.success("Course Updated SuccessFully");
        navigate("/");
      }
    }
  };
  let getCourse = async () => {
    let result = await axios.get(`http://localhost:3000/courses?id=${id}`);
    setCourseData(result.data[0]);
  };

  useEffect(() => {
    getCourse();
  }, []);

  console.log(id);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Course
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* cname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              name="cname"
              onChange={handleChange}
              value={cname}
              placeholder="Enter course name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* course_image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Image URL
            </label>
            <input
              type="url"
              name="course_image"
              value={course_image}
              onChange={handleChange}
              placeholder="https://example.com/image"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* course_fee */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Fee
            </label>
            <input
              type="text"
              placeholder="Enter course fee"
              value={course_fees}
              name="course_fees"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* course_duration */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Duration
            </label>
            <input
              type="text"
              name="course_duration"
              value={course_duration}
              onChange={handleChange}
              placeholder="e.g. 6 weeks"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* course_author */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Author
            </label>
            <input
              type="text"
              placeholder="Author name"
              name="course_author"
              value={course_author}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
