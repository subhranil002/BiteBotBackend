import { Router } from "express";
import {
    addRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    HandleGetTrendingRecipes,
    HandleGetFreshRecipes,
    HandleGetQuickRecipes,
    HandleGetPremiumRecipes,
    HandleGetRecommendedRecipes,
    handleLikeUnlikeRecipe
} from "../controllers/recipe.controllers.js";
import {
    validateRecipe,
} from "../middlewares/recipe.middlewares.js";
import { isAuthorized, isLoggedIn } from "../middlewares/auth.middlewares.js";

const recipeRoutes = Router();

recipeRoutes
    .route("/")
    .post(isLoggedIn, isAuthorized("CHEF"), validateRecipe, addRecipe)
    .get(getAllRecipes);

recipeRoutes.route("/trending").get(HandleGetTrendingRecipes);
recipeRoutes.route("/fresh").get(HandleGetFreshRecipes);
recipeRoutes.route("/quick").get(HandleGetQuickRecipes);
recipeRoutes.route("/premium").get(HandleGetPremiumRecipes);
recipeRoutes.route("/recommended").get(isLoggedIn, HandleGetRecommendedRecipes);

recipeRoutes.route("/like/:id").get(isLoggedIn, handleLikeUnlikeRecipe);

recipeRoutes
    .route("/:id")
    .get(isLoggedIn, getRecipeById)
    .put(validateRecipe, updateRecipe)
    .delete(deleteRecipe);

export default recipeRoutes;
