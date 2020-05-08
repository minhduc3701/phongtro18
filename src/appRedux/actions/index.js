import firebase from "../../firebase";
import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
  GET_ROOM_LIST_START,
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_ERROR,
  GET_IMAGE_LIST_START,
  GET_IMAGE_LIST_SUCCESS,
  GET_IMAGE_LIST_ERROR,
  GET_USER_DETAIL_START,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR,
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
          if (doc.data().permission !== "admin") {
            userList.push({
              id: doc.id,
              name: doc.data().name,
            });
          }
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
export const getRoomList = () => {
  return (dispatch) => {
    dispatch({ type: GET_ROOM_LIST_START });
    firebase
      .firestore()
      .collection("rooms")
      .where("status", "==", "hired")
      .get()
      .then((res) => {
        let roomList = [];
        res.forEach((doc) => {
          roomList.push({
            id: doc.id,
            name: doc.data().name,
            water: doc.data().water,
            electrict: doc.data().electrict,
            price: doc.data().price,
            people: doc.data().people,
            userId: doc.data().userId,
            internet: doc.data().internet,
            motoElec: doc.data().motoElec,
          });
        });
        dispatch({
          type: GET_ROOM_LIST_SUCCESS,
          payload: roomList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_ROOM_LIST_ERROR, payload: err });
      });
  };
};
export const getUserById = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_DETAIL_START });
    firebase
      .firestore()
      .collection("users")
      .where("rId", "==", id)
      .get()
      .then((res) => {
        let userList = null;
        res.forEach((doc) => {
          userList = {
            id: doc.id,
            name: doc.data().name,
            district: doc.data().district,
            phone: doc.data().phone,
            avatar: doc.data().avatar,
            address: doc.data().address,
          };
        });
        dispatch({
          type: GET_USER_DETAIL_SUCCESS,
          payload: userList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_USER_DETAIL_ERROR, payload: err });
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
          deposit: res.data().deposit,
          electrict: res.data().electrict,
          people: res.data().people,
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

export const getImageList = () => {
  return (dispatch) => {
    dispatch({ type: GET_IMAGE_LIST_START });
    firebase
      .firestore()
      .collection("rooms")
      .get()
      .then((res) => {
        let imageList = [];
        res.forEach((doc) => {
          imageList.push({
            id: doc.id,
            image: doc.data().image,
          });
        });
        dispatch({
          type: GET_IMAGE_LIST_SUCCESS,
          payload: imageList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_IMAGE_LIST_ERROR, payload: err });
      });
  };
};
export const getRoomAllList = () => {
  return (dispatch) => {
    dispatch({ type: GET_ROOM_LIST_START });
    firebase
      .firestore()
      .collection("rooms")
      .get()
      .then((res) => {
        let roomList = [];
        res.forEach((doc) => {
          roomList.push({
            id: doc.id,
            name: doc.data().name,
            people: doc.data().people,
            image: doc.data().image,
            detail: doc.data().detail,
            status: doc.data().status,
          });
        });
        dispatch({
          type: GET_ROOM_LIST_SUCCESS,
          payload: roomList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_ROOM_LIST_ERROR, payload: err });
      });
  };
};
