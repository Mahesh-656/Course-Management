import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as randomId } from 'uuid'
import { Auth } from '../context/AuthContext';
const Login = () => {
let {login , logout} = useContext(Auth)
let navigate = useNavigate()
let [formData , setFormData] = useState({
email:'',
password:'',
role:''
})
let { password , email ,role} = formData;

    let handleChange = (e)=>{
        let name = e.target.name
        setFormData({...formData , [name]:e.target.value})
    }
    let handleSubmit = async(e)=>{
        e.preventDefault();
       let result = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}&role=${role}`)
       console.log(result.data);

       if(result.data[0]){
        login(result.data[0])
        toast.success('Login Successfull')
        navigate('/')
       }
       setFormData({
        email:'',
        password:'',
        role:''
    })

}
return (

  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      {/* Heading */}
      <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">
        Welcome Back
      </h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Please login to your account
      </p>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Select Role
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">User</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Admin</span>
          </label>
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:scale-[1.01] active:scale-95"
      >
        Login
      </button>

      {/* Footer */}
      <p className="mt-5 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          Sign up
        </span>
      </p>
    </form>

  </div>
);

}

export default Login

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as randomId } from 'uuid'
const SignUp = () => {
let navigate = useNavigate()
let [formData , setFormData] = useState({
username:'',
email:'',
password:'',
confirmPassword:'',
id:randomId(),
role:'user'
})
let {username , password , email , confirmPassword} = formData;

    let handleChange = (e)=>{
        let name = e.target.name
        setFormData({...formData , [name]:e.target.value})
    }

    let handleSubmit = async(e)=>{
        e.preventDefault();
     let alreadyExist = await axios.get(`http://localhost:3000/users?email=${email}`)
     console.log(alreadyExist?.data);
     if(alreadyExist?.data.length>0){
      toast.error('User already exists')
      return;
     }
      if(confirmPassword != password){
        toast.error('Password does not match ')
        return;
      }
      else{
        if(username.trim() && password.trim().length>8 && email.trim().includes('@gmail.com') && confirmPassword.trim()){
            console.log(formData);
           let result =await axios.post('http://localhost:3000/users' , formData)
           console.log(result);
           if(result.status == 201){
             toast.success('SignUp successfull')
              navigate('/login')
           }
        }

        setFormData({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        id:randomId()
    })
    }

}

return (

<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            name='username'
            placeholder="Enter username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name='email'
            onChange={handleChange}
            value={email}
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
          name='password'
            type="password"
            value={password}
            onChange={handleChange}

            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
          name='confirmPassword'
            type="password"
            value={confirmPassword}
            onChange={handleChange}

            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Footer text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="cursor-pointer font-medium text-blue-600 hover:underline">
            Login
          </span>
        </p>

      </form>

    </div>

)
}

export default SignUp

import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/AuthContext'

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<AuthContext>
<App/> <Toaster/>
</AuthContext>)

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext'

const Navbar = () => {
let {user , logout} = useContext(Auth)
console.log(user);

const linkClass = ({ isActive }) =>
isActive
? 'text-blue-600 font-semibold border-b-2 border-blue-600'
: 'text-gray-700 hover:text-blue-600'

return (

  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex h-16 items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-600">
          Course<span className="text-gray-800">Hub</span>
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`
            }
          >
            Courses
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `relative transition-all duration-300 ${
                  isActive
                    ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Add Courses
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`
            }
          >
            Cart
          </NavLink>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={logout}
              className="rounded-md border border-red-500 px-3 py-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Login
            </NavLink>
          )}

          {!user && (
            <NavLink
              to="/signup"
              className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
            >
              Sign Up
            </NavLink>
          )}

          {/* User Avatar */}
          {user && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white">
              {user?.username?.charAt(0)}
            </div>
          )}
        </div>

      </div>
    </div>

  </nav>
)

}

export default Navbar

import { createContext, useState } from "react";
import React from 'react'

export let Auth = createContext()
const AuthContext = ({children}) => {
let [user , setUser] = useState(()=>{
return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
})
let login = (loginDetails)=>{
setUser(loginDetails)
localStorage.setItem('user' ,JSON.stringify(loginDetails) )
}
console.log(user);

    let logout = ()=>{
        setUser(null)
        localStorage.removeItem('user')
    }

return (
<Auth.Provider value={{login , user , logout}}>{children}</Auth.Provider>
)
}

export default AuthContext

import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as randomId } from 'uuid'
import { Auth } from '../context/AuthContext';
const Login = () => {
let {login , logout} = useContext(Auth)
let navigate = useNavigate()
let [formData , setFormData] = useState({
email:'',
password:'',
role:''
})
let { password , email ,role} = formData;

    let handleChange = (e)=>{
        let name = e.target.name
        setFormData({...formData , [name]:e.target.value})
    }
    let handleSubmit = async(e)=>{
        e.preventDefault();
       let result = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}&role=${role}`)
       console.log(result.data);

       if(result.data[0]){
        login(result.data[0])
        toast.success('Login Successfull')
        navigate('/')
       }
       setFormData({
        email:'',
        password:'',
        role:''
    })

}
return (

  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      {/* Heading */}
      <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">
        Welcome Back
      </h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Please login to your account
      </p>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Select Role
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">User</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Admin</span>
          </label>
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:scale-[1.01] active:scale-95"
      >
        Login
      </button>

      {/* Footer */}
      <p className="mt-5 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          Sign up
        </span>
      </p>
    </form>

  </div>
);

}

export default Login

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as randomId } from 'uuid'
const SignUp = () => {
let navigate = useNavigate()
let [formData , setFormData] = useState({
username:'',
email:'',
password:'',
confirmPassword:'',
id:randomId(),
role:'user'
})
let {username , password , email , confirmPassword} = formData;

    let handleChange = (e)=>{
        let name = e.target.name
        setFormData({...formData , [name]:e.target.value})
    }

    let handleSubmit = async(e)=>{
        e.preventDefault();
     let alreadyExist = await axios.get(`http://localhost:3000/users?email=${email}`)
     console.log(alreadyExist?.data);
     if(alreadyExist?.data.length>0){
      toast.error('User already exists')
      return;
     }
      if(confirmPassword != password){
        toast.error('Password does not match ')
        return;
      }
      else{
        if(username.trim() && password.trim().length>8 && email.trim().includes('@gmail.com') && confirmPassword.trim()){
            console.log(formData);
           let result =await axios.post('http://localhost:3000/users' , formData)
           console.log(result);
           if(result.status == 201){
             toast.success('SignUp successfull')
              navigate('/login')
           }
        }

        setFormData({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        id:randomId()
    })
    }

}

return (

<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            name='username'
            placeholder="Enter username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name='email'
            onChange={handleChange}
            value={email}
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
          name='password'
            type="password"
            value={password}
            onChange={handleChange}

            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
          name='confirmPassword'
            type="password"
            value={confirmPassword}
            onChange={handleChange}

            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Footer text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="cursor-pointer font-medium text-blue-600 hover:underline">
            Login
          </span>
        </p>

      </form>

    </div>

)
}

export default SignUp

import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/AuthContext'

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<AuthContext>
<App/> <Toaster/>
</AuthContext>)

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCourse = () => {
let navigate = useNavigate()
let {id} = useParams()
let [courseData, setCourseData] = useState({
cname:'',
course_image:'',
course_fee:'',
course_duration:'',
course_author:''
})

    let {cname , course_author , course_fee , course_image , course_duration} = courseData

let handleChange = (e)=>{
let name = e.target.name
setCourseData({...courseData , [name]:e.target.value})
}

let handleSubmit = async(e)=>{
e.preventDefault()
console.log(courseData);
if(course_author && course_image && course_duration && course_fee && cname){
let result = await axios.put(`http://localhost:3000/courses/${id}` , courseData)
console.log(result);
if(result.status == 200){
toast.success('Course Updated SuccessFully')
navigate('/')
}
}

}
let getCourse = async()=>{
let result = await axios.get(`http://localhost:3000/courses?id=${id}`)
setCourseData(result.data[0])
}

useEffect(()=>{
getCourse();
} , [])

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

{/_ course_image _/}

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Course Image URL
</label>
<input
type="url"
name='course_image'
value={course_image}
onChange={handleChange}

              placeholder="https://example.com/image"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

{/_ course_fee _/}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Fee
            </label>
            <input
              type="text"
              placeholder="Enter course fee"
              value={course_fee}
              name='course_fee'
              onChange={handleChange}

              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

{/_ course_duration _/}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Duration
            </label>
            <input
              type="text"
              name='course_duration'
              value={course_duration}
              onChange={handleChange}
              placeholder="e.g. 6 weeks"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

{/_ course_author _/}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Author
            </label>
            <input
              type="text"
              placeholder="Author name"
              name='course_author'
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

)

}

export default UpdateCourse

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext'

const Course = ({
cname,
course_image,
course_fee,
course_duration,
course_author,
id
}) => {

let {user} = useContext(Auth)

return (

<div className="flex w-[280px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <img
        src={course_image}
        alt={cname}
        className="h-44 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {cname}
        </h3>

        <p className="text-sm text-gray-500">
          By {course_author}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Duration: {course_duration}
        </p>

        {/* Push footer to bottom */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-blue-600">
            ₹{course_fee}
          </span>


        {user.role === 'admin' ? (

  <div className="flex gap-2">
    <NavLink
      to={`/update/${id}`}
      className="rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
    >
      Update
    </NavLink>

    <button
      className="rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
    >
      Delete
    </button>

  </div>
) : (
  <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
    View
  </button>
)}

        </div>
      </div>

    </div>

)
}

export default Course

{
"users": [
{
"username": "admin",
"email": "admin@gmail.com",
"password": "admin@123",
"role": "admin",
"id": "85b5"
},
{
"id": "7d6e8a35-03a3-48b4-a08a-68eecc87e380",
"username": "Akshay",
"email": "a@gmail.com",
"password": "a@123",
"confirmPassword": "a@123",
"role": "user"
},
{
"id": "5995f27f-4073-4ae9-aff0-01feab856554",
"username": "NewUser",
"email": "newUser@gmail.com",
"password": "new@12345",
"confirmPassword": "new@12345"
}
],
"courses": [
{
"id": "101a",
"cname": "full stack",
"course_image": "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210215160315/FREE-Python-Course-For-Beginners.png",
"course_fee": 30000,
"course_duration": "6 months",
"course_author": "Rajesh Sir"
},
{
"cname": "Java full stack",
"course_image": "https://www.coursesxpert.com/wp-content/uploads/2021/01/Java-Course.jpg",
"course_fee": 30000,
"course_duration": "6 months",
"course_author": "Keshav Sir",
"id": "24ce"
},
{
"cname": "Mern full stack",
"course_image": "https://tse1.mm.bing.net/th/id/OIP.kUcrjifpGcJVPD01rZFzTwHaEP?cb=ucfimg2&ucfimg=1&w=1300&h=744&rs=1&pid=ImgDetMain&o=7&rm=3",
"course_fee": 35000,
"course_duration": "4 months",
"course_author": "Srinivasa Sir",
"id": "bcde"
},
{
"id": "455b",
"cname": "Devops Course Jspiders",
"course_image": "https://media.geeksforgeeks.org/wp-content/uploads/20230410112114/DevOps.png",
"course_fee": "30000",
"course_duration": "6 months",
"course_author": "Preran Sir"
},
{
"cid": "6dc1a2c6-9600-4935-aa19-230de8fbf39b",
"cname": "ReactJs Course By Jspiders",
"course_image": "https://tse3.mm.bing.net/th/id/OIP.ALEiMvuR7IQDglvydYZSQgHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
"course_fee": "3000",
"course_duration": "1 month",
"course_author": "Akshay",
"id": "1842"
},
{
"id": "a1e7",
"cname": "JDBC / Servlet Course",
"course_image": "https://www.devopsschool.com/blog/wp-content/uploads/2023/12/image-168.png",
"course_fee": "4000",
"course_duration": "1",
"course_author": "Anugraha Mam"
},
{
"id": "265b1d2c-f4e8-4e2c-a3cd-6ff0ed08afaa",
"cname": "flask",
"course_image": "https://kanhasoft.com/blog/wp-content/uploads/2018/07/django.jpg",
"course_fee": "20000",
"course_duration": "5 weeks",
"course_author": "Akshay"
}
],
"cart": []
}

import React, { createContext, useContext, useState } from 'react'
import { Auth } from './AuthContext'
import axios from 'axios'

export let CartData = createContext()
const CartContext = ({children}) => {
let {user} = useContext(Auth)
let [cart , setCart] = useState([])
let addToCart = (course)=>{
let cartObject = {...course , userId:user.id}
let result = axios.post('http://localhost:3000/cart' , cartObject)
console.log(result.data);
setCart([...cart , result.data[0]])
}

return (
<CartData.Provider value={{addToCart , cart}}>
{children}
</CartData.Provider>
)
}

export default CartContext

import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/AuthContext'
import CartContext from './context/CartContext'

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<AuthContext>
<CartContext>
<App/> <Toaster/>
</CartContext>
</AuthContext>)

import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../context/AuthContext'
import axios from 'axios'

const Cart = () => {
let {user} = useContext(Auth)
let [allCart , setAllCart] = useState([])

let getCart = async()=>{
let result = await axios.get(`http://localhost:3000/cart?userId=${user.id}`)
setAllCart(result.data)

}
console.log(allCart);

useEffect(()=>{
getCart()
} , [])
return (

<div>

    </div>

)
}

export default Cart

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext'
import { CartData } from '../context/CartContext'

const Course = (props) => {
let {
cname,
course_image,
course_fee,
course_duration,
course_author,
id,
onDelete
} = props;

let {user} = useContext(Auth)
let {addToCart , cart} = useContext(CartData)
return (

<div className="flex w-[280px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <img
        src={course_image}
        alt={cname}
        className="h-44 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {cname}
        </h3>

        <p className="text-sm text-gray-500">
          By {course_author}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Duration: {course_duration}
        </p>

        {/* Push footer to bottom */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-blue-600">
            ₹{course_fee}
          </span>


        {user.role === 'admin' ? (

  <div className="flex gap-2">
    <NavLink
      to={`/update/${id}`}
      className="rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
    >
      Update
    </NavLink>

    <button onClick={()=>onDelete(id)}
      className="rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
    >
      Delete
    </button>

  </div>
) : (
 <>
  <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
    View
  </button>
  <button onClick={()=>addToCart(data)} className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700">
    Add to Cart
    </button>
 
 </>
)}

        </div>
      </div>

    </div>

)
}

export default Course
