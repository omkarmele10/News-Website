import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    const theme = localStorage.getItem("bsTheme") || "dark";
    this.state = {
      theme
    };
  }
  resolveTheme = (theme) => {
    if (theme !== "auto") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  componentDidMount() {
    const resolvedTheme = this.resolveTheme(this.state.theme)
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
  }

  setTheme = (theme) => {
    const resolvedTheme = this.resolveTheme(theme)
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
    localStorage.setItem("bsTheme", theme);
    this.setState({ theme });
  };

  getThemeLabel = () => {
    const { theme } = this.state;

    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "Auto";
  };

  renderThemeIcon = (theme) => {
    if (theme === "dark") {
      return <span className="theme-toggle-icon">🌙</span>;
    }

    if (theme === "auto") {
      return <span className="theme-toggle-icon theme-toggle-icon-auto">◐</span>;
    }

    return <span className="theme-toggle-icon">☀</span>;
  };

  render() {
    const categories = [
      { name: "General", path: "/" },
      { name: "Business", path: "/business" },
      { name: "Entertainment", path: "/entertainment" },
      { name: "Health", path: "/health" },
      { name: "Science", path: "/science" },
      { name: "Sports", path: "/sports" },
      { name: "Technology", path: "/technology" }
    ];
    return (
      <div className="bg-body-tertiary pb-2 fixed-top">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="">
              Keep Updated
            </NavLink>
            <div className="dropdown ms-auto">
              <button
                className="btn theme-toggle-btn dropdown-toggle d-flex align-items-center gap-2"
                id="bd-theme"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
                aria-label={`Current theme: ${this.getThemeLabel()}`}
              >
                {this.renderThemeIcon(this.state.theme)}
                <span className="small fw-semibold">{this.getThemeLabel()}</span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="bd-theme">
                <li>
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center justify-content-between ${this.state.theme === "light" ? "active" : ""}`}
                    onClick={() => this.setTheme("light")}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {this.renderThemeIcon("light")}
                      Light
                    </span>
                    {this.state.theme === "light" && <span>✓</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center justify-content-between ${this.state.theme === "dark" ? "active" : ""}`}
                    onClick={() => this.setTheme("dark")}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {this.renderThemeIcon("dark")}
                      Dark
                    </span>
                    {this.state.theme === "dark" && <span>✓</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center justify-content-between ${this.state.theme === "auto" ? "active" : ""}`}
                    onClick={() => this.setTheme("auto")}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {this.renderThemeIcon("auto")}
                      Auto
                    </span>
                    {this.state.theme === "auto" && <span>✓</span>}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className=" mx-3 d-flex justify-content-start justify-content-md-center align-items-center overflow-x-auto hide-scrollbar   gap-3">
          {categories.map((category, key) => (
            <NavLink
              key={category.path}
              className={({ isActive }) => isActive ? "nav-link active fw-bold text-danger" : "nav-link"}
              to={category.path}
            >{category.name}
            </NavLink>
          ))}
        </div>
      </div>


    );
  }
}
