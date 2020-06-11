import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import CheckoutData from "../Checkout/ContactData/ContactData";
import ContactData from "../Checkout/ContactData/ContactData";
import * as action from '../../store/actions/index';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect=this.props.purchased?<Redirect to='/'/>:null;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased:state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
