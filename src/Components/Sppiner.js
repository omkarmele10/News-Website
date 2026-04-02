import React from "react";
import loading from "./Ajax-loader.gif";

const Sppiner = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center "
      style={{ height: "50vh" }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Sppiner;
