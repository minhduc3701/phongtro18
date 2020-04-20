import firebase from "../../firebase";
import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
  GET_ROOM_DETAIL_LIST_START,
  GET_ROOM_DETAIL_LIST_SUCCESS,
  GET_ROOM_DETAIL_LIST_ERROR,
} from "../../constants/ActionType";

export const getUser = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_LIST_START });
    firebase
      .firestore()
      .collection("users")
      .limit(10)
      .get()
      .then((res) => {
        let userList = [];
        res.forEach((doc) => {
          userList.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
        dispatch({
          type: GET_USER_LIST_SUCCESS,
          payload: userList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_USER_LIST_ERROR, payload: err });
      });
  };
};

export const getRoomDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_ROOM_DETAIL_LIST_START });
    firebase
      .firestore()
      .collection("rooms")
      .doc(id)
      .get()
      .then((res) => {
        let roomDetail = null;
        roomDetail = {
          id: res.id,
          name: res.data().name,
          toilet: res.data().toilet,
          item: res.data().item,
          image: res.data().image,
          status: res.data().status,
          detail: res.data().detail,
          createdAt: res.data().createdAt,
          userId: res.data().userId,
          price: res.data().price,
          acreage: res.data().acreage,
          motoElec: res.data().motoElec,
          water: res.data().water,
          internet: res.data().internet,
        };
        dispatch({
          type: GET_ROOM_DETAIL_LIST_SUCCESS,
          payload: roomDetail,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_ROOM_DETAIL_LIST_ERROR, payload: err });
      });
  };
};
