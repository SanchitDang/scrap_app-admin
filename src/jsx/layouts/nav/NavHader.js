import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import logo from "../../../images/logo.png";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? (
          <Fragment>
            <img
              src={logo}
              className="logo-abbr"
              width="57"
              height="57"
              alt=""
            />
            <div className="brand-title">
              <h2 className="">
                Recycle<span>Right</span>
              </h2>
              <span className="brand-sub-title">Reduce|Reuse|Recycle</span>					
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <img
              src={logo}
              className="logo-abbr"
              width="57"
              height="57"
              alt=""
            />
            <div className="brand-title">
              <h2 className="">
                Recycle<span>Right</span>
              </h2>
              <span className="brand-sub-title">Reduce|Reuse|Recycle</span>					
            </div>
          </Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
