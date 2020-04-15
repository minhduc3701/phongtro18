import { combineReducers } from "redux";
import room from "./room";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const appReducers = combineReducers({
  room,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducers;
