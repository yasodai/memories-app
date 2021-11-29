// @ts-ignore
import { Navbar } from "@/components";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth, Home, PostDetails } from "./pages";
import useState from "@/app/store";
function App() {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const user = useState((state) => state.authData);
  return (
    <BrowserRouter>
      <div className="mx-2 sm:container sm:mx-auto">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate replace to="/posts?page=1" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="posts/search" element={<Home />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/posts?page=1" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
