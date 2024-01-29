import React, { useState } from "react";
import OAuth from "../components/OAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Has Been Successfully Sent On Your EmailBox");
    } catch (error) {
      toast.error("Email Could't be Sent");
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className=" text-center text-4xl font-bold my-4 md:my-8">
        Forgot Password
      </h1>
      <div className=" flex flex-wrap justify-between items-center p-4">
        <div className="w-full md:w-[50%] lg:w-[45%] mb-10">
          <form className="space-y-5 my-5" onSubmit={onSubmit}>
            <input
              placeholder="Enter Your Email:"
              type="email"
              id="email"
              className="w-full h-12 text-xl px-3 outline-none  rounded-md"
              value={email}
              onChange={onChange}
            />

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white text-xl rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg"
            >
              Send Reset Password Link to Email
            </button>
            <div className="flex justify-between">
              <p>
                Create An Account?{" "}
                <Link to="/sign-up">
                  <span className="text-red-500 cursor-pointer hover:text-red-600 hover:font-semibold">
                    Register
                  </span>
                </Link>
              </p>
              <Link to="/sign-in">
                <p className="text-blue-500 cursor-pointer hover:text-blue-600 hover:font-semibold">
                  Sign In Instead
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

export default ForgetPassword;

//const ForgetPassword = () => {
