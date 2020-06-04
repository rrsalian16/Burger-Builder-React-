import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation:{
          required:true
        },
        valid:true
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZipCode'
        },
        value: '', 
        validation: {
          required: true
        },
        valid: true
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'fastest',
            dispayName: 'Fastest'
          }, {
            value: 'normal',
            dispayName: 'Normal'
          }, ]
        },
        value: 'fastest'
      }
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData={};
    for(let element in this.state.orderForm){
      formData[element]=this.state.orderForm[element].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData:formData
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity=(value,rules)=>{
    if(!rules){
      return true;
    }
    let isValid=false;
    if(rules.required){
      // isValid=value.trim() !=='';
      isValid= value.length>4;
    }

    return isValid;
  }
 
  inputChangedHandler=(event,inputIdentifier)=>{
    const updatedOrderForm={...this.state.orderForm};
    const updatedFormElemtnt={...updatedOrderForm[inputIdentifier]};
    updatedFormElemtnt.value=event.target.value;
    updatedFormElemtnt.valid=this.checkValidity(updatedFormElemtnt.value,updatedFormElemtnt.validation);
    updatedOrderForm[inputIdentifier]=updatedFormElemtnt;
    this.setState({orderForm:updatedOrderForm});

  }

  render() {
    const formElementsArray=[];
    for(let key in this.state.orderForm){
        formElementsArray.push({
          id:key,
          config:this.state.orderForm[key]
        });
    }
    let form = (
        <form onSubmit={this.orderHandler}>
            {
              formElementsArray.map(formElement=>(
                < Input key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                 />
              ))
            }
            <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
