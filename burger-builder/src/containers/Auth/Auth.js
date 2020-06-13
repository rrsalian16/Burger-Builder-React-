import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: true,
      },
    },
    isSignUp: true,
  };

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElemtnt = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElemtnt.value = event.target.value;
    updatedFormElemtnt.valid = this.checkValidity(
      updatedFormElemtnt.value,
      updatedFormElemtnt.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElemtnt;
    this.setState({ orderForm: updatedOrderForm });
  };

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }
    let isValid = false;
    if (rules.required) {
      // isValid=value.trim() !=='';
      isValid = value.length > 4;
    }
    if (rules.minlength !== undefined) {
      isValid = value.length >= rules.minlength;
    }

    return isValid;
  };

  componentDidMount(){
    if(!this.props.buildingBurger && this.props.autRedirectPath!=='/'){
      this.props.onSetAuthRedirectPath()
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.orderForm.email.value,
      this.state.orderForm.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      console.log(this.props.error);
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect=null;
    if(this.props.isAuth){
      authRedirect=<Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form>
          {form}
          <Button clicked={this.submitHandler} btnType="Success">
            ORDER
          </Button>
          <Button clicked={this.switchAuthModeHandler} btnType="Success">
            SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}{" "}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token != null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.autRedirectPath,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Auth);
