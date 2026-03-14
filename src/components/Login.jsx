import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {

  const navigate=useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // console.log("Login Data:", form);
    // later → axios.post("/api/auth/login", form)
    axios.post("http://localhost:8080/users/login",form).then(
      (response) => {
            console.log("data is =: ",response);
            // console.log("My dtat     0-----:",response);
            if(response.status==200){
              toast("Login successful, Welcome to dashboard");
              localStorage.setItem("user", JSON.stringify(response.data.user));
              const user=response.data.user;
              console.log(user.role);
              if(user.role==="THEATRE_OWNER"){
                navigate('/admin');
              }else if(user.role==="MOVIE_OWNER"){
                navigate('/movie-owner')
              }else{
                navigate('/');
              }
              scrollTo(0,0);
            }
          }
          
    ).catch((error) => {
            console.error('Something went wrong:', error);
        });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <Navbar/>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
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

          {/* Extra actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>

            <a
              href="#"
              className="text-indigo-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white font-semibold py-3 rounded-lg
                       transition duration-300 shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
