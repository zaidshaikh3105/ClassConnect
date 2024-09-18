import "../../index.css";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div className="navbar bg-base-100">
      <Container>
        <div className="navbar bg-base-100">
          <Link to="/" className="btn btn-ghost text-xl">
            Class Connect
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className="btn">
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Header;
