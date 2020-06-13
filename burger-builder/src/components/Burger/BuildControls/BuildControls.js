import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price:<strong>$ {props.price.toFixed(2)}</strong>
    </p>
    {controls.map((cntrl) => (
      <BuildControl
        key={cntrl.label}
        label={cntrl.label}
        added={() => props.ingredientsAdded(cntrl.type)}
        removed={() => props.ingredientsRemove(cntrl.type)}
        disabledButton={props.disabled[cntrl.type]}
      />
    ))}
    <button onClick={props.ordered} disabled={!props.purchasable} className={classes.OrderButton}>
      {props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControls;
