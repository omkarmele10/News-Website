import React, { Component } from "react";
import loading from "./Ajax-loader.gif";

export class Sppiner extends Component {
  render() {
    return (
      <div
        className="container d-flex justify-content-center align-items-center "
        style={{ height: "50vh" }}
      >
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Sppiner;
