import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false
}

const addIngredient=(state,action)=>{
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
}

const removeIngredient=(state,action)=>{
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
};

const setIngredient=(state,action)=>{
     return {
         ...state,
         ingredients: action.ingredients,
         error: false,
         totalPrice: 4
     }
}

const fetchIngredientFail=(state,action)=>{
    return {
        ...state,
        error: true
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:removeIngredient(state,action);
        case actionTypes.SET_INGREDIENT:setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENT_FAIL:fetchIngredientFail(state,action);
        default: return state;
    }
};

export default reducer;