import React from "react";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth);

  if (!user) return <p>Please login to view profile.</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full mt-3" />
    </div>
  );
};

export default Profile;
