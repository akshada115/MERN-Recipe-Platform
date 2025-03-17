import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar.jsx";
import Login from "./Component/Login.jsx";
import Register from "./Component/Register.jsx";
import AddRecipe from "./Component/AddRecipe.jsx";
import Home from "./Component/Home.jsx";
import Saved from "./Component/Saved.jsx";
import Profile from "./Component/Profile.jsx";
import Detail from "./Component/Detail.jsx";

function App() {
  const [isAuthenticate, setisAuthenticate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisAuthenticate(true); // ✅ Check if token exists and update state
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticate={isAuthenticate} setisAuthenticate={setisAuthenticate} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setisAuthenticate={setisAuthenticate} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, {useEffect, useState} from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Component/Navbar.jsx";
// import Login from "./Component/Login.jsx";
// import Register from "./Component/Register.jsx";
// import AddRecipe from "./Component/AddRecipe.jsx";
// import  Home  from "./Component/Home.jsx";
// import Saved from "./Component/Saved.jsx";
// import Profile from "./Component/Profile.jsx";
// // import  FetctRecipeById  from "./Component/FetctRecipeById.jsx";
// import Detail from "./Component/Detail.jsx";
// function App() {
//   const [isAuthenticate, setisAuthenticate] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setisAuthenticate(true); // ✅ Check if token exists and update state
//     }
//   }, []);
//   return (
//     <div>
//       <Router>
//         <Routes>
//           { <Route path="/" element={<Home />} /> }
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />}/>
//           <Route path="/saved" element={<Saved />}/>
//           <Route path="/add" element={<AddRecipe />} />
//           <Route path="/:id" element={<Detail />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
