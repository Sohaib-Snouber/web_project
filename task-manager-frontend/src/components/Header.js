import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const HandleLogout = () => {
        // logout();
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <header className="header-container">
            <div className="header-logo day-logo gb_hd">
                <a href="/" className="day-link">
                    <img className="day-logo" src="/logo.png" alt="CV-Generator" />
                </a>
            </div>
            <div className="links">
                <Link to={"/profile"}>Home</Link>
                <Link to={"/my-cvs"}>My Cvs</Link>
            </div>
            <div>
                {isAuthenticated ? <button className="btn header-btn" onClick={HandleLogout}>
                    Logout
                </button> :
                    <div className="btns">
                        <button className="btn header-btn" onClick={() => navigate("/signin")}>Login /Register</button>
                    </div>
                }            </div>
        </header>
    );
}

export default Header;
