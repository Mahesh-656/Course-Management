import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  let { login, logout } = useContext(Auth);
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    let name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.email) {
      let res = await axios.get(
        `http://localhost:3000/users?email=${formData.email}&&password=${formData.password}`
      );

      if (res.data[0]) {
        login(res.data[0]);
        toast.success("Login Successfull");
        navigate("/");
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-slate-900/80 p-8 shadow-2xl backdrop-blur border border-slate-700"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-cyan-400">
          Login
        </h2>

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

        <div className="mb-6">
          <label className="mb-1 block text-sm text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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
  );
};

export default Login;
