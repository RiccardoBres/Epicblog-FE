import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './ModalNav.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';




const ModalLogin = () => {

    const [loginFormData, setLoginFormData] = useState({})
    const navigate = useNavigate()

    const [show, setShow] = useState(true);

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, loginFormData)
            .then((res) =>
                localStorage.setItem('userLoggedIn', JSON.stringify(res.data.token))
            )
            .then(res => navigate('/'))
        setShow(false);
    }

    const handleHide = () => {
        setShow(false);
    };


    const handleLoginWithGitHub = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
    }
    return (
        <>
            <Modal show={show} onHide={handleHide}>
                <Modal.Header closeButton className='modal-login-header'>
                    <em className='modal-title'>Login Autore</em>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setLoginFormData({
                                    ...loginFormData,
                                    email: e.target.value
                                })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setLoginFormData({
                                    ...loginFormData,
                                    password: e.target.value
                                })}
                            />
                        </Form.Group>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Container fluid>
                        <Row>
                            <Col xs={6} className="text-end">
                                <div className="d-flex gap-2 align-items-center">
                                    <Button
                                        className='modal-buttons-color'
                                        type='submit'
                                        onClick={onSubmit}
                                    >
                                        Accedi
                                    </Button>
                                    <Button
                                        className='mx-2 modal-buttons-color'
                                        onClick={handleHide}>
                                        Chiudi
                                    </Button>
                                    <Button
                                        className='bg-black text-white'
                                        type='submit'
                                        variant="primary"
                                        onClick={handleLoginWithGitHub}
                                    >
                                        <div>
                                            <FontAwesomeIcon 
                                            icon={faGithub} 
                                            alt="GITHUB"
                                            className="modal-github-image"
                                            type='submit'
                                            variant="primary"
                                            onClick={handleLoginWithGitHub}/>
                                            <em>Login con GITHUB</em>
                                        </div>

                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Link className="links-style" to={"/login"}>
                            <p >Diventa Autore</p>
                        </Link>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalLogin;
