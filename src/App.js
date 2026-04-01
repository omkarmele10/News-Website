import React, { Component } from "react";
import News from "./Components/News";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  // the progress state is used for top bar for my web app & i will pass it to children/ all category so that it can change progress
  state = {
    progress: 0
  }
  setProgress = (value) => {
    this.setState({ progress: value })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color="#f11946"
            // height={2}
            progress={this.state.progress}
          // onLoaderFinished={() => this.setProgress(this.state.progress)}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={6}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={6}
                  country="us"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={6}
                  country="us"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={6}
                  country="us"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={6}
                  country="us"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={6}
                  country="us"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={6}
                  country="us"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
