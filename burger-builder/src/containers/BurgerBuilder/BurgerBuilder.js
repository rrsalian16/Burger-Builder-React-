import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
   
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasable = (ingredients) => {
    const sum = Object.values(ingredients).reduce(
      (sumValue, element) => sumValue + element,
      0
    );
    return sum > 0 ;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ing,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        totalPrice={this.props.price}
        ingredients={this.props.ing}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
    );
    
    let burger = this.props.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded..!</p> : <Spinner />;
    if (this.props.ing) {
      burger = (
        <React.Fragment>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientsAdded}
            ingredientsRemove={this.props.onIngredientsRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ing)}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }
    return <React.Fragment>{burger}</React.Fragment>;
  }
}

const mapStateToProps=state=>{
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
}
const mapDispatchToProps=dispatch=>{
  return{
    onIngredientsAdded:(name)=>dispatch(actions.addIngredient(name)),
    onIngredientsRemoved:(name)=>dispatch(actions.removeIngredient(name)),
    onInitIngredients:()=>dispatch(actions.initIngredient()),
    onInitPurchase:()=>dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
