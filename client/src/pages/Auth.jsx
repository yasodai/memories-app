import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

import { clsx } from "./../utils";
import { Label, Icon } from "@/components";
import useStore from "@/app/store";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const authLogin = useStore((state) => state.authLogin);
  const signIn = useStore((state) => state.signIn);
  const signUp = useStore((state) => state.signUp);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    isSignup ? signUp(formData, navigate) : signIn(formData, navigate);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    authLogin({ result, token });
    navigate("/");
  };

  const googleFailure = ({ error, details }) => {
    console.log("Google Sign In was unsuccessful. Try Again Later", error);
    console.log(details);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex flex-col gap-5",
        "w-[90%] sm:max-w-md mx-auto mt-[20%] p-5",
        "bg-white rounded-md shadow-md"
      )}
    >
      <header className="flex flex-col justify-center items-center">
        <Icon.Lock className="w-10 text-white stroke-2 bg-pink-500 p-2 rounded-full" />
        <h5 className="text-xl font-medium">
          {isSignup ? "Sign Up" : "Sign In"}
        </h5>
      </header>

      {isSignup && (
        <div className="flex gap-3">
          <Label type="firstName" placeholder="First Name">
            <input
              className="peer h-10"
              onChange={handleChange}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
          </Label>
          <Label type="lastName" placeholder="Last Name">
            <input
              className="peer h-10"
              onChange={handleChange}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </Label>
        </div>
      )}
      <Label type="email" placeholder="Email Address">
        <input
          className="peer h-10"
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
        />
      </Label>
      <Label type="password" placeholder="Password ">
        <input
          className="peer h-10"
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </Label>

      {isSignup && (
        <Label type="confirmPassword" placeholder="Repeat Password ">
          <input
            className="peer h-10"
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Repeat Password"
          />
        </Label>
      )}
      <button
        type="submit"
        className={clsx(
          "bg-blue-500 text-white ",
          "py-2 rounded",
          "hover:bg-opacity-90"
        )}
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </button>
      <GoogleLogin
        clientId="981000505831-hj0b2al13j0j2aeqd2gulbf1fjatuaqv.apps.googleusercontent.com"
        render={(props) => (
          <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-opacity-90"
          >
            Google Sign In
          </button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
      <p
        onClick={() => setIsSignup(!isSignup)}
        className="w-full cursor-pointer hover:underline"
      >
        {isSignup
          ? "Already have an account? Sign In"
          : "Dont't have an account? Sign Up"}
      </p>
    </form>
  );
}
