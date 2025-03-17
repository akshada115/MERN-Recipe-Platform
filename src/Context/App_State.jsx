
import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context.jsx";
import axios from "axios";

function AppState(props) {
  const url = "http://localhost:3000/api";

  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [saveRecipe, setsaveRecipe] = useState([]);
  const [user, setuser] = useState([]);
  const [userId, setuserId] = useState("");
  const [userRecipe, setuserRecipe] = useState([]);
  const [isAuthenticate, setisAuthenticate] = useState(false);
  const [reload, setreload] = useState(true);

  // Fetch recipes and check authentication on component mount
  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setrecipe(api.data.recipe);
    };
    fetchRecipe();
    getsavedrecipe();
    Profile();
    recipebyuserId(userId);
    // if (userId) {
    //   recipebyuserId(userId);
    // }
  }, [token, userId, reload]);

  // Check for token in localStorage on app load
  useEffect(()=>{
    if (token){
      localStorage.setItem("token", token);
    }
    const tokenFromLocalStorage = localStorage.getItem("token", token)
    if (tokenFromLocalStorage){
      setToken(tokenFromLocalStorage);
      setisAuthenticate(true);
    }
  }, [token])
  // useEffect(() => {
  //   const tokenFromLocalStorage = localStorage.getItem("token");
  //   if (tokenFromLocalStorage) {
  //     setToken(tokenFromLocalStorage);
  //     setisAuthenticate(true);
  //   }
  // }, []);

  // Register function
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      { name, gmail, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    setToken(api.data.token);
    // localStorage.setItem("token", api.data.token);
    // setisAuthenticate(true);
    return api;
  };

  // Login function
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      { gmail, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    setToken(api.data.token);
     localStorage.setItem("token", api.data.token);
    setisAuthenticate(true);
    return api;
  };

  // Add recipe function
  const addRecipe = async (
    title,
    instructions,
    ingrediant1,
    ingrediant2,
    ingrediant3,
    ingrediant4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgURL
  ) => {
    try {
      console.log("Token:", token); // Debugging: Log token
      const api = await axios.post(
        `${url}/add`,
        {
          title,
          instructions,
          ingrediant1,
          ingrediant2,
          ingrediant3,
          ingrediant4,
          qty1,
          qty2,
          qty3,
          qty4,
          imgURL,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          withCredentials: true,
        }
      );
      setreload(!reload);
      return api;
    } catch (error) {
      console.error("Error in addRecipe:", error.response?.data || error.message); // Debugging: Log error
      throw error;
    }
  };

  // Get recipe by ID
  const RecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return api;
  };

  // Save recipe by ID
  const SavedRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: { "Content-Type": "application/json", Authorization: token },
        withCredentials: true,
      }
    );
    setreload(!reload);
    return api;
  };

  // Get all saved recipes
  const getsavedrecipe = async () => {
    const api = await axios.get(`${url}/saved`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      withCredentials: true,
    });
    setsaveRecipe(api.data.recipe);
  };

  // Get user profile
  const Profile = async () => {
    const api = await axios.get(`${url}/user`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      withCredentials: true,
    });
    setuserId(api.data.user._id);
    setuser(api.data.user);
  };

  // Get recipes by user ID
  const recipebyuserId = async (id) => {
    const api = await axios.get(`${url}/user/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      withCredentials: true,
    });
    setuserRecipe(api.data.recipe);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setisAuthenticate(false);
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          login,
          register,
          addRecipe,
          recipe,
          RecipeById,
          SavedRecipeById,
          saveRecipe,
          userRecipe,
          user,
          logout,
          isAuthenticate,
          setisAuthenticate,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
}

export default AppState;

//193-388 line suyog's code
// import React, { useEffect, useState } from "react";
// import { AppContext } from "./App_Context.jsx";
// import axios from "axios";

// function AppState(props) {
//   const url = "http://localhost:3000/api";

//   const [token, setToken] = useState("");
//   const [recipe, setrecipe] = useState([]);
//   const [saveRecipe, setsaveRecipe] = useState([]);
//   const [user, setuser] = useState([]);
//   const [userId, setuserId] = useState("");
//   const [userRecipe, setuserRecipe] = useState([]);
//   const [isAuthenticate, setisAuthenticate] = useState(false);
//   const [reload, setreload] = useState(true);

//   // Fetch recipes and check authentication on component mount
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const api = await axios.get(`${url}/`, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       setrecipe(api.data.recipe);
//     };
//     fetchRecipe();
//     getsavedrecipe();
//     Profile();
//     recipebyuserId();
//   }, [token, userId, reload]);

//   // Check for token in localStorage on app load
//   useEffect(() => {
//     const tokenFromLocalStorage = localStorage.getItem("token");
//     if (tokenFromLocalStorage) {
//       setToken(tokenFromLocalStorage);
//       setisAuthenticate(true); // User is authenticated if token exists
//     }
//   }, []);

//   // Register function
//   const register = async (name, gmail, password) => {
//     const api = await axios.post(
//       `${url}/register`,
//       { name, gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Login function
//   const login = async (gmail, password) => {
//     const api = await axios.post(
//       `${url}/login`,
//       { gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Add recipe function
//   const addRecipe = async (
//     title,
//     instructions,
//     ingrediant1,
//     ingrediant2,
//     ingrediant3,
//     ingrediant4,
//     qty1,
//     qty2,
//     qty3,
//     qty4,
//     imgURL
//   ) => {
//     const api = await axios.post(
//       `${url}/add`,
//       {
//         title,
//         instructions,
//         ingrediant1,
//         ingrediant2,
//         ingrediant3,
//         ingrediant4,
//         qty1,
//         qty2,
//         qty3,
//         qty4,
//         imgURL,
//       },
//       {
//         headers: { "Content-Type": "application/json", Authorization: token },
//         withCredentials: true,
//       }
//     );
//     setreload(!reload);
//     return api;
//   };

//   // Get recipe by ID
//   const RecipeById = async (id) => {
//     const api = await axios.get(`${url}/${id}`, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     return api;
//   };

//   // Save recipe by ID
//   const SavedRecipeById = async (id) => {
//     const api = await axios.post(
//       `${url}/${id}`,
//       {},
//       {
//         headers: { "Content-Type": "application/json", Authorization: token },
//         withCredentials: true,
//       }
//     );
//     console.log(api);
//     setreload(!reload);
//     return api;
//   };

//   // Get all saved recipes
//   const getsavedrecipe = async () => {
//     const api = await axios.get(
//       `${url}/saved`,
//       {},
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     console.log("get saved recipe", api.data.recipe);
//     setsaveRecipe(api.data.recipe);
//   };

//   // Get user profile
//   const Profile = async () => {
//     const api = await axios.get(`${url}/user`, {
//       headers: { "Content-Type": "application/json", Authorization: token },
//       withCredentials: true,
//     });
//     setuserId(api.data.user._id);
//     setuser(api.data.user);
//   };

//   // Get recipes by user ID
//   const recipebyuserId = async (id) => {
//     const api = await axios.get(`${url}/user/${id}`, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     setuserRecipe(api.data.recipe);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setToken(""); // Clear token from state
//     setisAuthenticate(false); // Set authentication status

//     window.location.href = "/login"; // Redirect to login page
// };


//   return (
//     <div>
//       <AppContext.Provider
//         value={{
//           login,
//           register,
//           addRecipe,
//           recipe,
//           RecipeById,
//           SavedRecipeById,
//           saveRecipe,
//           userRecipe,
//           user,
//           logout,
//           isAuthenticate,
//           setisAuthenticate,
//         }}
//       >
//         {props.children}
//       </AppContext.Provider>
//     </div>
//   );
// }

// export default AppState;


// import React, { useEffect, useState, useCallback } from "react";
// import { AppContext } from "./App_Context.jsx";
// import axios from "axios";

// function AppState(props) {
//   const url = "http://localhost:3000/api";

//   const [token, setToken] = useState("");
//   const [recipe, setrecipe] = useState([]);
//   const [saveRecipe, setsaveRecipe] = useState([]);
//   const [user, setuser] = useState([]);
//   const [userId, setuserId] = useState("");
//   const [userRecipe, setuserRecipe] = useState([]);
//   const [isAuthenticate, setisAuthenticate] = useState(false);
//   const [reload, setreload] = useState(true);

//   // Fetch recipes and check authentication on component mount
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const api = await axios.get(`${url}/`, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       setrecipe(api.data.recipe);
//     };
//     fetchRecipe();
//     getsavedrecipe();
//     Profile();
//     recipebyuserId();
//   }, [token,userId,reload]);

//   // Check for token in localStorage on app load
//   useEffect(() => {
//     const tokenFromLocalStorage = localStorage.getItem("token");
//     if (tokenFromLocalStorage) {
//       setToken(tokenFromLocalStorage);
//       setisAuthenticate(true); // User is authenticated if token exists
//     }
//   }, []);

//   // Register function
//   const register = async (name, gmail, password) => {
//     const api = await axios.post(
//       `${url}/register`,
//       { name, gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Login function
//   const login = async (gmail, password) => {
//     const api = await axios.post(
//       `${url}/login`,
//       { gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Add recipe function
//   const addRecipe = async (
//     title,
//     instructions,
//     ingrediant1,
//     ingrediant2,
//     ingrediant3,
//     ingrediant4,
//     qty1,
//     qty2,
//     qty3,
//     qty4,
//     imgURL
//   ) => {
//     const api = await axios.post(
//       `${url}/add`,
//       {
//         title,
//         instructions,
//         ingrediant1,
//         ingrediant2,
//         ingrediant3,
//         ingrediant4,
//         qty1,
//         qty2,
//         qty3,
//         qty4,
//         imgURL,
//       },
//       {
//         headers: { "Content-Type": "application/json", Authorization: token },
//         withCredentials: true,
//       }
//     );
//     setreload(!reload);
//     return api;
//   };

//   // Get recipe by ID
//   const RecipeById = async (id) => {
//     const api = await axios.get(`${url}/${id}`, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     return api;
//   };

//   // Save recipe by ID
//   const SavedRecipeById = async (id) => {
//     const api = await axios.post(
//       `${url}/${id}`,
//       {},
//       {
//         headers: { "Content-Type": "application/json", Authorization: token, },
//         withCredentials: true,
//       }
//     );
//     console.log(api)
//     setreload(!reload);
//     return api;
//   };

//   // Get all saved recipes
//   const getsavedrecipe = async () => {
//     const api = await axios.get(
//       `${url}/saved`,
//       {},
//       {
//         headers: { "Content-Type": "application/json", },
//         withCredentials: true,
//       }
//     );
//     console.log("get saved recipe",api.data.recipe);
//     setsaveRecipe(api.data.recipe);
//   };

//   // Get user profile
//   const Profile = async () => {
//     const api = await axios.get(`${url}/user`, {
//         headers: { "Content-Type": "application/json", Authorization: token, },
//         withCredentials: true,
//       }
//     );
//     setuserId(api.data.user._id);
//     setuser(api.data.user);
//   };

//   // Get recipes by user ID
//   const recipebyuserId = async (id) => {
//     const api = await axios.get(`${url}/user/${id}`, {
//         headers: { "Content-Type": "application/json", },
//         withCredentials: true,
//       }
//     );
//     setuserRecipe(api.data.recipe);
//   };
 
//   const logout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     setToken(""); // Clear token from state
//     setisAuthenticate(false); // Set isAuthenticated to false
//   };
//   // const logout = ()=>{
//   //   localStorage.removeItem("token",token)
//   //   setToken("");
//   //   setisAuthenticate(false);
//   // }
//   return (
//     <div>
//       <AppContext.Provider
//         value={{
//           login,
//           register,
//           addRecipe,
//           recipe,
//           RecipeById,
//           SavedRecipeById,
//           saveRecipe,
//           userRecipe,
//           user,
//           logout,
//           isAuthenticate,
//           setisAuthenticate,
//         }}
//       >
//         {props.children}
//       </AppContext.Provider>
//     </div>
//   );
// }

// export default AppState;

//line number  196 393 is correct code

// import React, { useEffect, useState, useCallback } from "react";
// import { AppContext } from "./App_Context.jsx";
// import axios from "axios";

// function AppState(props) {
//   const url = "http://localhost:3000/api";

//   const [token, setToken] = useState("");
//   const [recipe, setrecipe] = useState([]);
//   const [saveRecipe, setsaveRecipe]=useState([])
//   const [user, setuser] = useState([])
//   const [userId, setuserId] = useState("")
//   const [userRecipe, setuserRecipe] = useState([])
//   const [isAuthenticate, setisAuthenticate] = useState(false)
//   const [reload, setreload] = useState(true)
  

//   useEffect(() => {
//     // login("tawde2003@gmail.com", "1981")
//     const fetchRecipe = async () => {
//       const api = await axios.get(`${url}/`, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       console.log(api.data.recipe);
//       setrecipe(api.data.recipe);
//     };
//     fetchRecipe();
//   getsavedrecipe();
//   Profile();
//   recipebyuserId();
//   }, [token, userId, reload]);

//   useEffect(() => {
//     if(token){
//       localStorage.setItem("token",token)
//     }
//     const tokenFromLocalStorage = localStorage.getItem("token",token)
//     if(tokenFromLocalStorage)
//     {
//        setToken(tokenFromLocalStorage);
//        setisAuthenticate(true)
//     }
//     }, [token,reload])

//   //For register purpose
//   const register = async (name, gmail, password) => {
//     const api = await axios.post(
//       `${url}/register`,
//       { name, gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     return api;
//   };

//   //For login purpose
//   const login = async (gmail, password) => {
//     const api = await axios.post(
//       `${url}/login`,
//       { gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     setisAuthenticate(true);

//     return api;
//     // console.log("Login data",api);
//   };

//   //for add recipe

  // const addRecipe = async (
  //   title,
  //   instructions,
  //   ingrediant1,
  //   ingrediant2,
  //   ingrediant3,
  //   ingrediant4,
  //   qty1,
  //   qty2,
  //   qty3,
  //   qty4,
  //   imgURL
  // ) => {
  //   const api = await axios.post(
  //     `${url}/add`,
  //     {
  //       title,
  //       instructions,
  //       ingrediant1,
  //       ingrediant2,
  //       ingrediant3,
  //       ingrediant4,
  //       qty1,
  //       qty2,
  //       qty3,
  //       qty4,
  //       imgURL,
  //     },
  //     {
  //       headers: { "Content-Type": "application/json", Authorization: token },
  //       withCredentials: true,
  //     }
  //   );
  //   setreload(!reload)
  //   return api;
  // };
//   //here recipebyid is shown
  // const RecipeById = async (id) => {
  //   const api = await axios.get(`${url}/${id}`, {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   });
  //   return api;
  // };

  //Saved recipe by id
  // const SavedRecipeById = async (id) => {
  //   const api = await axios.post(
  //     `${url}/${id}`,
  //     {},
  //     {
  //       headers: { "Content-Type": "application/json", Authorization: token },
  //       withCredentials: true,
  //     }
  //   );
  //   setreload(!reload)
  //   console.log(api)
  //   return api;
  // };

//   //gell all saved recipe by id
  // const getsavedrecipe = useCallback(async()=>{
  //   const api = await axios.post(
  //     `${url}/saved`,
  //     {},
  //     {
  //       headers: { "Content-Type": "application/json", Authorization: token },
  //       withCredentials: true,
  //     }
  //   );
  //   console.log("hello",api.data.recipe)
  //   // return api;
  //   setsaveRecipe(api.data.recipe);
  // })

//   const Profile = useCallback(async() =>{
  //   const api = await axios.get(
  //     `${url}/user`,
  //     {},
  //     {
  //       headers: { "Content-Type": "application/json", Authorization: token },
  //       withCredentials: true,
  //     }
  //   );
  //   console.log("hello",api.data.user);
  //   setuserId(api.data.user._id)
  //   setuser(api.data.user)
  // })

//   //recipe by user
  // const recipebyuserId = useCallback(async(id)=>{
  //   const api = await axios.post(
  //     `${url}/user/${id}`,
  //     {},
  //     {
  //       headers: { "Content-Type": "application/json", Authorization: token },
  //       withCredentials: true,
  //     }
  //   );
  //   // console.log(api)
  //   setuserRecipe(api.data.recipe)
  // });

//   const logout = async()=>{
//     localStorage.removeItem("token",token)
//     setisAuthenticate(false);
//   }
  

//   return (
//     <div>
//       <AppContext.Provider
//         value={{
//           login,
//           register,
//           addRecipe,
//           recipe,
//           RecipeById,
//           SavedRecipeById,
//           getsavedrecipe,
//           saveRecipe,
//           Profile,
//           user,
//           recipebyuserId,
//           userRecipe,
//           logout,
//           isAuthenticate,
//           setisAuthenticate
        
//         }}
//       >
//         {props.children}
//       </AppContext.Provider>
//     </div>
//   );
// }


// export default AppState;
