import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
  GET_ROOM_DETAIL_LIST_START,
  GET_ROOM_DETAIL_LIST_SUCCESS,
  GET_ROOM_DETAIL_LIST_ERROR,
  GET_USER_DETAIL_START,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR,
} from "../../constants/ActionType";

let initialState = {
  userList: null,
  loadUser: true,
  roomDetail: null,
  loadRoomDetail: true,
  userDetail: null,
  loadUserDetail: true,
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
    case GET_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetail: action.payload,
        loadUserDetail: false,
      };
    }

    case GET_USER_DETAIL_START: {
      return { ...state, loadUserDetail: true };
    }

    case GET_ROOM_DETAIL_LIST_SUCCESS: {
      return {
        ...state,
        roomDetail: action.payload,
        loadRoomDetail: false,
      };
    }

    case GET_ROOM_DETAIL_LIST_START: {
      return { ...state, loadRoomDetail: true };
    }

    default:
      return state;
  }
};

export default cart;
