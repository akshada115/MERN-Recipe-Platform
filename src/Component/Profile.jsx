import React, { useContext } from "react";
import { AppContext } from "../Context/App_Context.jsx";

function Profile() {
  const { user, userRecipe } = useContext(AppContext);

  // if (!user || !userRecipe) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container text-center my-3">
      <h1>Welcome, {user.name}</h1>
      <h2> {user.gmail}</h2>

      <div className="text-center mx-auto" style={{ width: "1200px" }}>
        <div className="row d-flex justify-content-center align-items-center">
            {userRecipe?.map((data) => (
              <div key={data._id} className="col-md-3 my-3 gap-1">
                <div className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={data.imgURL}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </div>

                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;


// import React, { useContext } from "react";
// import { AppContext } from "../Context/App_Context";

// function Profile() {
//   const { user, userRecipe } = useContext(AppContext);

//   // Check if user and userRecipe are available before rendering
//   if (!user || !userRecipe) {
//     return <div></div>;  // Or any other loading indicator you'd prefer
//   }

//   return (
//     <div className="container text-center my-3">
//       <h1>Welcome {user.name}</h1>
//       <h1>Welcome {user.gmail}</h1>

//       <div className="text-center mx-auto" style={{ width: "1200px" }}>
//         <div className="row d-flex justify-content-center align-items-center">
//           {userRecipe?.length > 0 ? (
//             userRecipe.map((data) => (
//               <div key={data._id} className="col-md-3 my-3 gap-1">
//                 <div className="d-flex justify-content-center align-items-center p-3">
//                   <img
//                     src={data.imgURL}
//                     className="card-img-top"
//                     alt="..."
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       borderRadius: "10px",
//                       border: "2px solid yellow",
//                     }}
//                   />
//                 </div>

//                 <div className="card-body">
//                   <h5 className="card-title">{data.title}</h5>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>No recipes available</div>  // Handle case if there are no recipes
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;


// // import React, { useContext } from "react";
// // import { AppContext } from "../Context/App_Context";
// // function Profile(){
// //     const {user, userRecipe} = useContext(AppContext)
// //     return (
// //         <div>
// //             <div className="container text-center my-3">
// //             <h1>Welcome {user.name}</h1>
// //             <h1>Welcome {user.gmail}</h1>
// //             </div>
// //             <div className="text-center mx-auto " style={{ width: "1200px" }}>
// //         <div className="row d-flex justify-content-center align-items-center">
// //           {userRecipe?.map((data) => (
// //             <div key={data._id} className="col-md-3 my-3 gap-1">
              
// //                 <div className="d-flex justify-content-center align-items-center p-3">
// //                   <img
// //                     src={data.imgURL}
// //                     className="card-img-top"
// //                     alt="..."
// //                     style={{ width: "200px", height: "200px",borderRadius:"10px",border:"2px solid yellow" }}
// //                   />
// //                 </div>

// //                 <div className="card-body">
// //                   <h5 className="card-title">{data.title}</h5>
// //                 </div>
             
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //         </div>
// //     )
// // }

// // export default Profile;