import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
} from "../../constants/ActionType";

let initialState = {
  userList: null,
  loadUser: true,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        userList: action.payload,
        loadUser: false,
      };
    }

    case GET_USER_LIST_START: {
      return { ...state, loadUser: true };
    }

    default:
      return state;
  }
};

export default cart;
