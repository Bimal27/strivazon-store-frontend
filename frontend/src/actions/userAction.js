import axios from "axios";

export const LOGIN_REQUEST = " LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_USER_REQUEST= 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS='REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL='REGISTER_USER_FAIL';

export const LOAD_USER_REQUEST = " LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const ALL_USERS_REQUEST = "ALL_USERS_REQUEST";
export const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
export const ALL_USERS_FAIL = "ALL_USERS_FAIL";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_RESET = "UPDATE_USER_RESET";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
export const DELETE_USER_RESET = "DELETE_USER_RESET";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
 export const UPDATE_PASSWORD_RESET = " UPDATE_PASSWORD_RESET";

export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

export const CLEAR_ERRORS  = "CLEAR_ERRORS";
  
// const { REACT_APP_BACKEND_URL } = process.env;

// Login
export const login = (email, password) => async (dispatch, getState) => {
         try {
           dispatch({ type: LOGIN_REQUEST });

           const config = { headers: { "Content-Type": "application/json" },  withCredentials:true};

           const { data } = await axios.post(`https://strivazon-ecommerce-store.herokuapp.com/login`, { email, password }, config);

           dispatch({ type: LOGIN_SUCCESS, payload: data.user });
         } catch (error) {
           dispatch({
             type: LOGIN_FAIL,
             payload: error.response.data.message
           });
         }
        
       };

// REGISTER
export const register = userData => async dispatch => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`https://strivazon-ecommerce-store.herokuapp.com/register`, userData, {withCredentials:true}, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    });
  }
};


// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`https://strivazon-ecommerce-store.herokuapp.com/me`,{withCredentials:true});

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: true });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`https://strivazon-ecommerce-store.herokuapp.com/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// updating profile

export const updateProfile = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(`https://strivazon-ecommerce-store.herokuapp.com/me/${id}`, userData, {withCredentials:true});

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    
  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: true
    });
  }
};



// Update Password
export const updatePassword = passwords => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `https://strivazon-ecommerce-store.herokuapp.com/password/update`,passwords, {withCredentials:true});

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`https://strivazon-ecommerce-store.herokuapp.com/admin/users`,{withCredentials:true});

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`https://strivazon-ecommerce-store.herokuapp.com/admin/user/${id}`,{withCredentials:true});

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.put(
      `https://strivazon-ecommerce-store.herokuapp.com/admin/user/${id}`,
      userData,
      {withCredentials:true}
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`https://strivazon-ecommerce-store.herokuapp.com/admin/user/${id}`,{withCredentials:true});

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
