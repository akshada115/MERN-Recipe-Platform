import { Recipe } from "../Models/Recipe.js";
import { SavedRecipe } from "../Models/Savedrecipe.js";

export const add = async (req, res) => {
  const {
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
  } = req.body;
  console.log(req.body);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: User not authenticated" });
}
  try {
    const recipe = await Recipe.create({
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
      user: req.user._id,
    });
    res.json({ message: "Good! Recipe Created Successfully", recipe });
  } catch (err) {
    console.error("Recipe Save Error:", err);
    res.status(500).json({ message: "Failed to save recipe", error: err.message });
  }
  
};

//to get all recipe
export const getAllrecipe = async (req, res) => {
  const recipe = await Recipe.find();
  res.json({ recipe });
};

//to get recipe by id
export const getrecipebyid = async (req, res) => {
  const id = req.params.id;
  try {
    let recipe = await Recipe.findById(id);

    if (!recipe) return res.json({ message: "Recipe does not exist" });
    res.json({ message: "Recipe by id", recipe });
  } catch (err) {
    console.error("Recipe Save Error:", err);
    res.status(500).json({ message: "Failed to save recipe", error: err.message });
  }
  
};

//get reuest for access user by userid
export const getrecipeUserid = async (req, res) => {
  const userid = req.params.id;
  try {
    let recipe = await Recipe.find({ user: userid });

    if (!recipe) res.json({ message: "User recipe does not exist" });
    res.json({ message: "Recipe by  user id", recipe });
  } catch (err) {
    console.error("Recipe Save Error:", err);
    res.status(500).json({ message: "Failed to save recipe", error: err.message });
  }
  
};

//to saved recipe of user by id
export const savedrecipeById = async (req, res) => {
  const id = req.params.id;
  let recipe = await SavedRecipe.findOne({ recipe: id });
  if (recipe) return res.json({ message: "Recipe already saved" });
  recipe = await SavedRecipe.create({ recipe: id });
  res.json({ message: "Recipe saved successfully.....!" });
};
// import mongoose from "mongoose";

// //to save recipe of user by id
// export const savedrecipeById = async (req, res) => {
//   const id = req.params.id;

//   // Check if the ID is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Recipe ID" });
//   }

//   try {
//     // Use mongoose.Types.ObjectId to convert the ID to a valid ObjectId
//     let recipe = await SavedRecipe.findOne({ recipe: mongoose.Types.ObjectId(id) });

//     if (recipe) {
//       return res.json({ message: "Recipe already saved" });
//     }

//     // Save the recipe if not already saved
//     recipe = await SavedRecipe.create({ recipe: mongoose.Types.ObjectId(id) });
//     res.json({ message: "Recipe saved successfully.....!" });
//   } catch (err) {
//     res.json({ message: err });
//   }
// };


//to get save recipe
export const getsavedrecipe = async (req, res) => {
  const recipe = await SavedRecipe.find();
  res.json({ recipe });
};

