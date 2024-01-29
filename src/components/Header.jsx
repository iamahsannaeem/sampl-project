import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign In");

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);
  return (
    <div className="bg-white z-10 shadow-md w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-7">
        <div className="">
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="">
          <ul className="flex space-x-5 md:space-x-10">
            <li
              className={`py-4 font-semibold border-b-[4px]   cursor-pointer ${
                location.pathname === "/"
                  ? "text-black border-b-red-500"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-4 font-semibold border-b-[4px]   cursor-pointer ${
                location.pathname === "/offers"
                  ? "text-black border-b-red-500"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-4 font-semibold border-b-[4px]   cursor-pointer ${
                location.pathname === "/sign-in" ||
                location.pathname === "/profile"
                  ? "text-black border-b-red-500"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
