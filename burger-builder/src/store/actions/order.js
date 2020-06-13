import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error,
  };
};

export const purcahseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purcahseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purcahseBurgerStart());
    axios
      .post("/orders.json?auth="+token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailure(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILURE,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrder = (token,userId) => {
  return (dispatch) => {
      dispatch(fetchOrderStart());
      const queryParam='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios
      .get("/orders.json"+queryParam)
      .then((res) => {
        const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrder));
      })
      .catch((error) => {
        dispatch(fetchOrderFailure(error));
      });
  };
};
