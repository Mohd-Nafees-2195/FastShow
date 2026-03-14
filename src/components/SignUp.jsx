import { useState } from "react";
import Input from "./Input";
import axios, { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {


  const navigate=useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"USER",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Signup Data:", form);
    // later → axios.post("/api/auth/signup", form)

    if(!form){
      return;
    }
    const data={
      user:form
    }
    axios.post("http://localhost:8080/users/signup",data).then(
      response => {
            console.log(response.data);
            if(response.status==200){
              toast("Registration successful, Please login now");
              navigate('/login');
              scrollTo(0,0);
            }
          }
          
    ).catch(error => {
            console.error('Something went wrong:', error);
        });
  };


  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirmPassword}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300
               text-gray-900 bg-white
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="USER">User</option>
              <option value="THEATRE_OWNER">Theatre Owner</option>
              <option value="MOVIE_OWNER">Movie Owner</option>
            </select>
          </div>


          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white font-semibold py-3 rounded-lg
                       transition duration-300 shadow-lg"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
