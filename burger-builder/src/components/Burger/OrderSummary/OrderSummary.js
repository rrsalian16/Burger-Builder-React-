import React, { Component } from "react";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //This is can be a funtional component
  componentDidUpdate(){
    console.log("ordersummary update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span key={igKey} style={{ textTransform: "capitalize" }}>
            {igKey}
          </span>:{this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious Burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : ${this.props.totalPrice} </strong>
        </p>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
