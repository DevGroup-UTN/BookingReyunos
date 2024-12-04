import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/footer.css';

function Footer() {
  return (
    <footer>
      <div className='footer-div-1'>
        <a className='footer-a' href="https://api.whatsapp.com/send?phone=5492604021708" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPhone} className="icon-margin" /> +54 260 442 1078
        </a>
        <a className='footer-a' href="https://www.google.com/maps/search/CTDR+UTN+Reyunos,+ruta+150,+Los+Reyunos,+Villa+25+de+Mayo,+San+Rafael+Mendoza+-+Argentina/@-34.5745603,-68.6276423,4746m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-margin" /> Ruta 150, Los Reyunos, Villa 25 de Mayo, San Rafael
        </a>
        <a className='footer-a' href="mailto:reservas@reyunos.utn.edu.ar" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="icon-margin" /> reservas@reyunos.utn.edu.ar
        </a>
      </div>
      <div className='footer-div'>
        <img className='footer-img' src='/images/logo-utn.png' alt="Logo" />
      </div>
      <div className='footer-div socials'> {/* Asegúrate de que esta clase se aplique aquí */}
        <a 
          href="https://www.facebook.com/utnlosreyunos" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/utn_los_reyunos/" target="_blank" 
          rel="noopener noreferrer" className="social-icon"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <div className='footer-div-4'>
        <div>Al utilizar este sitio web, acepta el uso de cookies. </div>
        <div>
        <a target="_blank" rel="nofollow" href="/cookies" className="footer_link">Política de cookies</a> 
        | 
        <a target="_blank" rel="nofollow" href="/terminos" className="footer_link">Términos y condiciones</a>
        |
        <a target="_blank" rel="nofollow" href="/privacidad" className="footer_link">Política de privacidad</a>
        </div>
        <span className="framework_f">Tag: <span className="tag_cookie">devgroupreyunos</span> </span>
      </div>
    </footer>
  );
}

export default Footer;
