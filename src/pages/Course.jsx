import React, { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { CartData } from "../context/CartContext";

const Course = ({ data }) => {
  const {
    cname,
    course_image,
    course_fees,
    course_duration,
    course_author,
    id,
    onDelete,
  } = data;
  let { user } = useContext(Auth);
  let { addToCart, cart } = useContext(CartData);

  return (
    <div className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <img
        src={course_image}
        alt={cname}
        className="w-full h-44 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{cname}</h2>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Author:</span> {course_author}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Duration:</span> {course_duration}
        </p>

        <p className="text-sm font-semibold text-gray-700">
          Fees: ₹{course_fees}
        </p>
        {user.role === "admin" ? (
          <div className="flex gap-2">
            <NavLink
              to={`/update/${id}`}
              className="rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Update
            </NavLink>

            <button className="rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white">
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enroll Now
            </button>
            <button
              onClick={() => addToCart(data)}
              className="w-full mt-3 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Add Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
