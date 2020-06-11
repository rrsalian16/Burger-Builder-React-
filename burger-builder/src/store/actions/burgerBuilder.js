import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchIngredientFail=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_FAIL
    }
}

export const initIngredient = () => {
  return (dispath) => {
    axios
      .get("https://burger-builder-7fe76.firebaseio.com/Ingredients.json")
      .then((response) => {
        dispath(setIngredient(response.data));
      })
      .catch((err) => {
        dispath(fetchIngredientFail());
      });
  };
};
