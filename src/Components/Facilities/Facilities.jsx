import React, { useState, useEffect } from 'react';
import './Facilities.css';
import { BsPersonPlus, BsBriefcase, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../Navbar/Logo.png';
import { useSession } from "../../Middlewares/ProtectedRoutes"
import { logout } from '../../Middlewares/ProtectedRoutes';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import ModalLogin from '../Navbar/ModalLogin';




const Footer = () => {


  const session = useSession();
  console.log(session);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Verifica la posizione dello scroll rispetto al carosello
      const carouselHeight = 715;
      const scrollTop = window.scrollY;
      setShowNavbar(scrollTop > carouselHeight);
    };

    // Aggiungi l'event listener per monitorare lo scroll
    window.addEventListener('scroll', handleScroll);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // Refresh della pagina dopo il logout
    window.location.reload();
  }

  const handleWritePost = () => {
    if (!session) {
      setShowModalLogin(true);
    } else {
      navigate("/CreatePost"); 
    }
  }

  return  (
    <div className={`navbar-footer ${showNavbar ? 'show' : 'hide'}`}>
      <img src={logo} alt="logo" className="logo-image-facilities" />
      <ul className="ul-footer">
        <Link className="links-style" to={"/login"}>
          <li><BsPersonPlus /> Diventa autore</li>
        </Link>
        <li><BsBriefcase /> Lavora con noi</li>
        <li className="write-post" onClick={handleWritePost}><BsPencilSquare /> Scrivi un articolo</li>
      </ul>
      <hr className="hr-color" />
      {session ? ( // Mostra la sezione solo quando c'è una sessione attiva
        <div className="user-section">
          <em>{session.displayName || session.name + " " + session.surname }</em>
          <img src={session.avatar || session.photos[0].value} className="user-avatar" />
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}

      {/* Mostra la modale se showModalLogin è true */}
      {showModalLogin && (
        <ModalLogin handleClose={() => setShowModalLogin(false)} />
      )}
    </div>
  );
};

export default Footer;

