import React, { useContext } from "react";
import { AppContext } from "../Context/App_Context.jsx";
import FetchRecipeById from "./FetctRecipeById.jsx";

const Saved = () => {
  const { saveRecipe } = useContext(AppContext);
  console.log(saveRecipe);
  return (
    <div>
      <div className="row container mx-auto my-3">
        {saveRecipe?.map((data) => (
          <div className="col-md-3" key={data.recipe}>
            <FetchRecipeById id={data.recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
