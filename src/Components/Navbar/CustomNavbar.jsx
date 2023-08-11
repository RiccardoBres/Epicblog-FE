import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar} from 'react-bootstrap';
import ModalLogin from './ModalLogin';
import { Link } from 'react-router-dom';
import './ModalNav.css';
import logo from './Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '../../Middlewares/ProtectedRoutes';


const CustomNavbar = () => {
  
  const session = useSession();

  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postState.posts);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary nav-style">
        <Container>
          <Navbar.Brand href="#home">
            <div className='d-flex justify-content-center align-items-center'>
              <img src={logo} alt="logo" className="logo-image" />
              <em className='Title'>EpicBlog</em>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className='links-style' to={"/"}>
                <Nav.Link href="#home">Home</Nav.Link>
              </Link>
              <Nav.Link onClick={handleLoginClick}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && <ModalLogin handleClose={handleCloseModal} />}
    </>
  )
}

export default CustomNavbar 
