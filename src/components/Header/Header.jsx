import "../../index.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const navItems = [
    {
      name: "Home",
      path: "/home",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Notes",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Notes",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-base-100">
      <nav className="navbar">
        <div className="flex-1">
          <h1
            className="text-4xl text-white font-semibold transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Class Connect
          </h1>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`btn btn-ghost text-white ${
                      location.pathname === item.path ? "btn-active" : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
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
      </nav>
    </header>
  );
}

export default Header;
