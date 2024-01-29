import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success("User Has Been Created Successfully");
      console.log(user);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <button
        onClick={onGoogleClick}
        type="button"
        className="w-full h-12 bg-red-500 text-white text-xl rounded-md shadow-md hover:bg-red-600 hover:shadow-lg mt-6 flex justify-center items-center"
      >
        <FcGoogle className="bg-white rounded-full mr-1 text-xl" />
        <span>Continue With Google</span>
      </button>
    </>
  );
};

export default OAuth;
