import React, { useState, useEffect } from 'react';
import './Facilities.css';
import { BsPersonPlus, BsBriefcase, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../Navbar/Logo.png';
import { useSession } from "../../Middlewares/ProtectedRoutes";
import { logout } from '../../Middlewares/ProtectedRoutes';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import ModalLogin from '../Navbar/ModalLogin';

const Footer = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [showImageOnly, setShowImageOnly] = useState(true);

  const toggleNavbar = () => {
    if (showImageOnly) {
      setShowImageOnly(false);  
      setNavbarVisible(true);  
    } else {
      setShowImageOnly(true);  
      setNavbarVisible(false);  
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const carouselHeight = 715;
      const scrollTop = window.scrollY;
      setShowNavbar(scrollTop > carouselHeight);

      if (scrollTop <= carouselHeight && !navbarVisible) {
        setShowImageOnly(true); // Nascondi la navbar completa quando lo scroll è sopra l'altezza del carosello
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarVisible]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleWritePost = () => {
    if (!session) {
      setShowModalLogin(true);
    } else {
      navigate("/CreatePost"); 
    }
  };

  return (
    <div className={`navbar-footer ${showNavbar ? 'show' : 'hide'}`}>
      <img
        src={logo}
        alt="logo"
        className="logo-image-facilities"
        onClick={toggleNavbar}
      />
      {showImageOnly ? null : (
        <div className="navbar-full">
          <ul className="ul-footer">
            <Link className="links-style" to={"/login"}>
              <li><BsPersonPlus /> Diventa autore</li>
            </Link>
            <li><BsBriefcase /> Lavora con noi</li>
            <li className="write-post" onClick={handleWritePost}><BsPencilSquare /> Scrivi un articolo</li>
          </ul>
          <hr className="hr-color" />
          {session ? (
            <div className="user-section">
              <em>{session.displayName || session.name + " " + session.surname }</em>
              <img src={session.avatar || session.photos[0].value} className="user-avatar" />
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
          {showModalLogin && (
            <ModalLogin handleClose={() => setShowModalLogin(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Footer;
