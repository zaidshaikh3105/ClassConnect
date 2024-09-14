import "../index.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ClassConnect</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <a>About</a>
              </Link>{" "}
            </li>
            <li>
              <Link to="/contact">
                <a>Contact us</a>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <a>Login</a>
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
