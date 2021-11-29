import React, { useEffect, useState } from "react";
import memoriesText from "@/images/memoriesText.png";
import memoriesLogo from "@/images/memoriesLogo.png";
import { clsx } from "@/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "@/app/store";
import decode from "jwt-decode";

export function Navbar() {
  const authLogout = useStore((state) => state.authLogout);
  const user = JSON.parse(localStorage.getItem("profile"));

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    authLogout();
    navigate("/posts");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    useStore.setState({ authData: user });
  }, [location]);
  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-md",
        "py-2 px-5 mt-3",
        "flex justify-between items-center"
      )}
    >
      <Link to="/" className="flex items-center gap-1">
        <img className="w-36" src={memoriesText} alt="" />
        <img className="w-8 h-8" src={memoriesLogo} alt="" />
      </Link>
      <div className="">
        {user ? (
          <div className="flex items-center gap-1">
            <img
              src={
                user.result.imageUrl
                  ? user.result.imageUrl
                  : "https://i.pravatar.cc/150"
              }
              alt=""
              className="rounded-full w-8 h-8"
            />
            <h6 className="hidden sm:block">{user.result.name}</h6>
            <button
              onClick={logout}
              className="bg-red-500 text-white rounded  py-1 px-2 hover:bg-opacity-80"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className=" bg-blue-500 text-white rounded  py-1 px-2 hover:bg-opacity-95 "
            to="/auth"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
