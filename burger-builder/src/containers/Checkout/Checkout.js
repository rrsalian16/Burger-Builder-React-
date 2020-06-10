import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import CheckoutData from "../Checkout/ContactData/ContactData";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.props.ing}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={CheckoutData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
