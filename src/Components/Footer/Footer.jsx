import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <footer className="dark-footer">
            <Container>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <p>EpicBlog &copy; 2023</p>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <ul className="footer-list">
                            <li>
                                <FontAwesomeIcon className="mx-2" icon={faPhone} />
                                +351 913 436 264
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" />
                                Via delle Primule 86, Milano, MI
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="mx-2" />
                                riccardobresolin97@libero.it
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <ul className="social-icons">
                            <li>
                                <img src="https://www.qualitasinformatica.com/wp-content/uploads/2022/04/logo-linkedin-icon-4096.png" alt="Linkedin" className='logo-linkedin' />
                            </li>           
                         </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
