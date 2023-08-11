import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
  } from '@fortawesome/free-solid-svg-icons';
  import { faLinkedin } from '@fortawesome/free-solid-svg-icons';



const Footer = () => {
    return (
        <footer className="dark-footer">
            <p>EpicBlog &copy; 2023</p>
            <ul>
                <li>
                    <FontAwesomeIcon 
                    className='mx-2'
                    icon={faPhone} />
                    +351 913 436 264
                </li>
                <li>
                    <FontAwesomeIcon 
                    icon={faMapMarkerAlt}
                    className='mx-2' />
                    Via delle Primule 86, Milano, MI</li>
                <li>
                    <FontAwesomeIcon 
                    icon={faEnvelope}
                    className='mx-2' />
                    riccardobresolin97@libero.it
                </li>
            </ul>
        </footer>
    )
}

export default Footer
