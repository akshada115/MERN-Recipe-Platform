import express from "express";

import { add, getAllrecipe, getrecipebyid, getrecipeUserid, getsavedrecipe, savedrecipeById } from "../Controllers/Recipe.js";
import { Authenticate } from "../Middleware/auth.js";

const router = express.Router();
//create recipe
// router.post("/add",add)
router.post("/add", Authenticate, add)

//get all recipe
router.get("/",getAllrecipe)

//get savedrecipe by id
router.get("/saved",getsavedrecipe)

//get request by id
router.get("/:id", getrecipebyid)

//get request by userid
router.get("/user/:id",getrecipeUserid)

//savedrecipe by id
router.post("/:id",savedrecipeById)




export default router;