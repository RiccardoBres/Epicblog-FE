import React,  { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './MyHero.css';
import { createAuthor } from '../../States/authorState';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';




const MyHeroLogPage = () => {


    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [modalAuthorSaved, setModalAuthorSaved] = useState(false);
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [avatar, setAvatar] = useState('');

    const payload = {
        nome: nome,
        cognome: cognome,
        email: email,
        password: password,
        data: data,
        avatar: avatar
    }
    const closeModal = () => {
        setModalAuthorSaved(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(payload);
            dispatch(createAuthor(payload));
            setModalAuthorSaved(true);
            resetValue(); 
            setValidated(false);
        }
        setValidated(true);
    };

    const resetValue = ()=> {
        setNome(" ");
        setCognome(" ");
        setPassword(" ");
        setEmail(" ");
        setData(" ");
        setAvatar(" ");
    }

   




    return (
        <Container className="container-hero">
            <Row>
                <Col lg={12} md={10} sm={8} className='title-size'>
                    <Container fluid>
                        <Form noValidate 
                        validated={validated}
                        enctype="multipart/form-data"
                        onSubmit={handleSubmit}
                        >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={(e) => setNome(e.target.value)}
                                        type="text"
                                        placeholder=""
                                        name="nome"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setCognome(e.target.value)}
                                        type="text"
                                        required
                                        placeholder=" "
                                        name="cognome"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="text"
                                            placeholder=""
                                            name="email"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a username.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        name="password"
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationCustom04">
                                    <Form.Label>Data di nascita</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setData(e.target.value)}
                                        type="text"
                                        data="data"
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationCustom05">
                                    <Form.Label>Immagine (URL)</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setAvatar(e.target.files[0])}
                                        type="file"
                                        name="avatar"
                                        placeholder="Enter image URL"
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid URL.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    label="Accetto i Termini & Condizioni del servizio"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Button type="submit">Invia</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
            <Modal 
            show={modalAuthorSaved} 
            onHide={closeModal}
            centered
            keyboard={false}
            backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Autore Registrato con Successo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    L'autore è stato registrato con successo!
                </Modal.Body>
                <Modal.Footer>
                <Link className='links-style' to={"/"}>
                    <Button variant="secondary">
                        Vai alla HomePage
                    </Button>
                </Link>
                    <Button variant="secondary" onClick={closeModal}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default MyHeroLogPage