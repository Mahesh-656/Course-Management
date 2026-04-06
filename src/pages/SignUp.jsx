import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as randomId } from "uuid";

const SignUp = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    confirmPassword: "",
    uId: randomId(),
  });

  let handleChange = (e) => {
    let name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let { username, password, email, role, confirmPassword } = formData;
    let getdata = await axios.get(`http://localhost:3000/users`);
    if (getdata.data.length === 0) {
      role = "admin";
    }
    let alreadyExists = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );
    if (alreadyExists.data.length > 0) {
      toast.error("email already registered...");
      return;
    }

    console.log(getdata.data.length);
    // if(getdata.data.length)
    if (confirmPassword !== password) {
      toast.error("Password does not match ");
      return;
    } else {
      if (
        formData.username &&
        formData.password &&
        formData.email &&
        formData.confirmPassword
      ) {
        let res = await axios.post(`http://localhost:3000/users`, {
          username,
          email,
          role,
          password,
        });
        navigate("/login");
        console.log(res);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "",
          confirmPassword: "",
        });
        toast.success("Login Success");
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen grid place-items-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-2xl backdrop-blur border border-slate-700"
        >
          <h2 className="mb-6 text-center text-3xl font-bold text-cyan-400">
            Sign Up
          </h2>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400 active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
