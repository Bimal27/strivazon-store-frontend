
import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const SAVE_SHIPPING_INFO = "SAVE_SHIPPING_INFO";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://strivazon-ecommerce-store.herokuapp.com/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity, 
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = data => async (dispatch) => {
         dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

         localStorage.setItem("shippingInfo", JSON.stringify(data));
};
