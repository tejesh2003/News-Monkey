import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { mode, toggleMode, country, setCountry,search,setSearch } = props;
  const handleClick = (countryName) => {
    setCountry(countryName);
  };
  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            NewsMonkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to={`/`}
                >
                  Home
                </Link>
              </li>
              {/*
                <li className="nav-item">
                  <Link className={`${mode==="dark"?"nav-link":"nav-link text-white"} `}to="/about">
                    About
                  </Link>
                </li>
    */}
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/business`}
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/entertainment`}
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/general`}
                >
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/health`}
                >
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/science`}
                >
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/sports`}
                >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  } `}
                  to={`/${country}/technology`}
                >
                  Technology
                </Link>
              </li>

              <div className="dropdown nav_link" style={{ marginTop: "0px" }}>
                <button
                  className={`btn btn-${
                    mode === "dark" ? "secondary" : "primary"
                  } dropdown-toggle ${
                    mode === "dark" ? "nav-link" : "nav-link text-white"
                  }`}
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ paddingRight: "10px" }} // Add padding to the right of the button's text
                >
                  Country
                  <span className="caret"></span>{" "}
                  {/* Adding the dropdown symbol */}
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-${
                    mode === "dark" ? "dark" : "white"
                  }`}
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    {/* eslint-disable-next-line*/}
                    <Link
                      className="dropdown-item "
                      to="/"
                      onClick={() => handleClick("in")}
                    >
                      India
                    </Link>
                  </li>
                  <li>
                    {/* eslint-disable-next-line*/}
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => handleClick("us")}
                    >
                      US
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
            <div>
              <form
                className="d-flex form-inline my-2 my-lg-0 mr-auto align-items-center"
                style={{ marginRight: "30px" }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search News"
                  aria-label="Search"
                  style={{ height: "32px", marginRight: "15px", width:"25rem",marginTop: "2px"}}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/*
                <button
                  className={`btn btn-${
                    mode === "dark" ? "secondary" : "primary"
                  }`}
                  type="submit"
                  style={{
                    height: "35px",
                    border: `${mode === "primary" ? "1px solid #fff" : "none"}`,
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                >
                  Search
                </button>
                */}
              </form>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                defaultChecked={mode === "dark"}
                onClick={toggleMode}
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexSwitchCheckDefault"
              >
                Enable DarkMode
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
