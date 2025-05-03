import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const location = useLocation();

  return (
    <div className="nav-bar">
      <Link to="/" className="logo">
        <img 
          src={logo} 
          alt="Apna PG" 
          className="logo-img"
          onError={(e) => {
            e.target.src = "fallback-logo.png";
          }}
        />
      </Link>

      <div className="nav-links">
        <Link to="/">
          <button className={location.pathname === "/" ? "active" : ""}>
            Home
          </button>
        </Link>
        <Link to="/explore">
          <button className={location.pathname === "/explore" ? "active" : ""}>
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
