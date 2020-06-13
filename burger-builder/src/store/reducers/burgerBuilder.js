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
    error:false,
    building:false
}

const addIngredient=(state,action)=>{
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    };
}

const removeIngredient=(state,action)=>{
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: state.totalPrice>4
    };
};

const setIngredient=(state,action)=>{
     return {
         ...state,
         ingredients: action.ingredients,
         error: false,
         totalPrice: 4,
         building:false
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
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAIL: return fetchIngredientFail(state, action);
        default: return state;
    }
};

export default reducer;