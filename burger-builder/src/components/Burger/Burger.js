import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let ingredientArray = Object.keys(props.ingredients)
    .map((ing) => {
      return [...Array(props.ingredients[ing])].map((_, i) => {
        return <BurgerIngredient key={ing + i} type={ing} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(ingredientArray.length===0){
        ingredientArray=<p>Please start adding Ingredients!</p>;
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
