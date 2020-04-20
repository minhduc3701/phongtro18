import React from "react";
import loader from "../../assets/Infinity-1.4s-200px.svg";

const CircularProgress = ({ className }) => (
  <div className={`loader ${className}`}>
    <img src={loader} alt="loader" />
  </div>
);
export default CircularProgress;
