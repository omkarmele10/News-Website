import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("bsTheme") || "dark");
  const resolveTheme = (theme) => {
    if (theme !== "auto") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  useEffect(() => {
    const resolvedTheme = resolveTheme(theme)
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    const resolvedTheme = resolveTheme(newTheme)
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
    localStorage.setItem("bsTheme", newTheme);
    setTheme(newTheme);
  };

  const getThemeLabel = () => {
    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "Auto";
  };

  const renderThemeIcon = (theme) => {
    if (theme === "dark") {
      return <span className="theme-toggle-icon">🌙</span>;
    }

    if (theme === "auto") {
      return <span className="theme-toggle-icon theme-toggle-icon-auto">◐</span>;
    }

    return <span className="theme-toggle-icon">☀</span>;
  };
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
              aria-label={`Current theme: ${getThemeLabel()}`}
            >
              {renderThemeIcon(theme)}
              <span className="small fw-semibold">{getThemeLabel()}</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="bd-theme">
              <li>
                <button
                  type="button"
                  className={`dropdown-item d-flex align-items-center justify-content-between ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <span className="d-flex align-items-center gap-2">
                    {renderThemeIcon("light")}
                    Light
                  </span>
                  {theme === "light" && <span>✓</span>}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`dropdown-item d-flex align-items-center justify-content-between ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <span className="d-flex align-items-center gap-2">
                    {renderThemeIcon("dark")}
                    Dark
                  </span>
                  {theme === "dark" && <span>✓</span>}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`dropdown-item d-flex align-items-center justify-content-between ${theme === "auto" ? "active" : ""}`}
                  onClick={() => handleThemeChange("auto")}
                >
                  <span className="d-flex align-items-center gap-2">
                    {renderThemeIcon("auto")}
                    Auto
                  </span>
                  {theme === "auto" && <span>✓</span>}
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

export default Navbar;
