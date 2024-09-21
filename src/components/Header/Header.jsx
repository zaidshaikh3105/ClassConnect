import "../../index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Notes", slug: "/all-notes", active: authStatus },
    { name: "Add Notes", slug: "/add-notes", active: authStatus },
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
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="btn text-white btn-ghost"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
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
