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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-base-100">
      <nav className="navbar">
        <div className="flex-1">
          <button
            className="btn btn-ghost text-3xl text-white"
            onClick={() => navigate("/")}
          >
            Class Connect
          </button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4">
            {navItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.name}>
                  <button
                    className={`btn btn-ghost text-white ${
                      location.pathname === item.slug ? "btn-active" : ""
                    }`}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
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
