import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();
  const { email, name } = formData;
  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      console.log(error.message);
      toast.error("Could not update the profile details");
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-10">My Profile</h1>
        <form className="flex flex-col items-center justify-center px-4 w-full md:w-[50%] mx-auto">
          <input
            type="text"
            className={`w-full rounded-md h-14 mb-5 text-xl  border-gray-500 ${
              changeDetail ? "bg-red-300 text-black" : "bg-white text-gray-500"
            }`}
            disabled={!changeDetail}
            value={name}
            onChange={onChange}
            id="name"
          />
          <input
            type="text"
            className="w-full rounded-md h-14 mb-5 text-xl text-gray-500 border-gray-500 "
            disabled
            value={email}
          />
          <div className="flex w-full justify-between px-2">
            <p>
              Edit Your Name?{" "}
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail(!changeDetail);
                }}
                className="text-red-500 cursor-pointer hover:underline hover:text-red-700"
              >
                {changeDetail ? "Apply Changes" : "Edit"}
              </span>
            </p>
            <p
              onClick={logOut}
              className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700"
            >
              Sign Out
            </p>
          </div>
        </form>
        <div className="w-full  md:w-[50%] mx-auto justify-center px-4">
          <Link to="/create-listing">
            <button
              type="button"
              className="mx-auto w-full bg-blue-500 h-14 my-3 rounded text-white hover:shadow-lg hover:bg-blue-600 active:bg-blue-700 active:font-semibold flex justify-center items-center"
            >
              <FcHome className="bg-pink-200 p-1 text-3 text-3xl rounded-full mr-1 border-2 border-white" />
              Sell Or Rent Your Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
