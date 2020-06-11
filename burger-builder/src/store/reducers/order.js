import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    loading:false,
    purchased:false
}

const orderReducer=(state=initialState, action)=>{
   switch (action.type) {
       case actionTypes.PURCHASE_INIT:
           return{
            ...state,
            purchased:false
           }
       case actionTypes.PURCHASE_BURGER_START:
           return{
               ...state,
               loading:true
           }
       case actionTypes.PURCHASE_BURGER_SUCCESS:
           const newOrder={
               ...action.orderData,
               id:action.id
           }
           return{
               ...state,
               loading:false,
                purchased: true,
               orders:state.orders.concat(newOrder)
           };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return{
                ...state,
                loading:false
            };
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                orders:action.orders,
                loading:false
            }
        case actionTypes.FETCH_ORDER_FAILURE:
            return{
                ...state,
                loading:false
            }
       default:
           return state;
   }
}

export default orderReducer;