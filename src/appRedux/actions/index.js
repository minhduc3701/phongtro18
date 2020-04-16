import firebase from "../../firebase";
import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
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
