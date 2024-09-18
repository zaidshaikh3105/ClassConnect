import "../index.css";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-3xl">ClassConnect</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="btn btn-ghost text-xl" to="/home">
              Home
            </Link>
          </li>
          <li>
            <button className="btn btn-ghost text-xl">Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
