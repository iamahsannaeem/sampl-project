import React, { useState } from "react";
import OAuth from "../components/OAuth";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      console.log(user);
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      toast.success("User Successfully Created");
      await setDoc(doc(db, "users", user.uid), formDataCopy);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className=" text-center text-4xl font-bold my-4 md:my-8">Sign Up</h1>
      <div className=" flex flex-wrap items-center justify-between p-4">
        <div className="w-full md:w-[50%] lg:w-[45%] mb-10">
          <form className="space-y-3 my-5" onSubmit={onSubmit}>
            <input
              placeholder="Enter Your Full Name:"
              type="text"
              id="name"
              className="w-full h-12 text-xl px-3 outline-none  rounded-md"
              value={name}
              onChange={onChange}
            />
            <input
              placeholder="Enter Your Email:"
              type="email"
              id="email"
              className="w-full h-12 text-xl px-3 outline-none  rounded-md"
              value={email}
              onChange={onChange}
            />
            <div className="relative">
              <input
                placeholder="Enter Your Password:"
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full h-12 text-xl px-3 outline-none  rounded-md"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <FaEye
                  className="absolute right-3 top-[15px] cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-[15px] cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white text-xl rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg"
            >
              Sign Up
            </button>
            <div className="flex justify-between">
              <p>
                Create An Account?{" "}
                <Link to="/sign-in">
                  <span className="text-red-500 cursor-pointer hover:text-red-600 hover:font-semibold">
                    Sign In
                  </span>
                </Link>
              </p>
              <Link to="/forgotpassword">
                <p className="text-blue-500 cursor-pointer hover:text-blue-600 hover:font-semibold">
                  Forget Password?
                </p>
              </Link>
            </div>
          </form>
          <div className="flex items-center before:border-t before:border-t-gray-400 before:flex-1 after:border-t after:border-t-gray-400 after:flex-1">
            <p className="font-bold mx-4">OR</p>
          </div>
          <OAuth />
        </div>
        <div className="w-full md:w-[50%] lg:w-[50%]">
          <img
            className="rounded-xl"
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="key"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
