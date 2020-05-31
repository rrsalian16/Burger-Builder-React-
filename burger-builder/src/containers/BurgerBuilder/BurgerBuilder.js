import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PEICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{

    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4
    }

    addIngredientsHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;

        const priceAddition=INGREDIENT_PEICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
    };

    removeIngredientsHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PEICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
     };
    };

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return(
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemove={this.removeIngredientsHandler}
                disabled={disabledInfo}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;