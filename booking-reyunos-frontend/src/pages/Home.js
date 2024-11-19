import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';

function Home() {
  const images = [
    'https://images.pxsol.com/1472/Reyunos/Homepage/5c49f5cb0b935.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=204c513db12a0fb98df8f0eb736ead74',
    'https://images.pxsol.com/1472/Reyunos/Homepage/5c49f5cab0328.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=77c5b09343ed74164565a28182a3b2b1',
    'https://images.pxsol.com/1472/Reyunos/Homepage/5c49f5cab0932.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=86eb1f133e3534444883244f6d5d9cb3',
    'https://images.pxsol.com/1472/company/library/user/13010516480f5f6acf4ba53580795b64272fb5e26a4.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=bde7d65866bf0eba0213c2bb07925dad',
    'https://images.pxsol.com/1472/company/library/user/13010491000cfb076bf2005a8441fed7e41eb09d515.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=c73e970d4e0bb42d4c525bf5eb713ea5',
    'https://images.pxsol.com/1472/Reyunos/Homepage/5c49f5cae12e7.jpg?auto=format&browser=Chrome&h=900&ixlib=php-3.3.0&w=1900&s=39ec2588c3b316a2f7e4dd6e7f17fca6',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="home-container">
      {/* Carrusel de imágenes */}
      <div className="carrusel">
        <button onClick={goToPrevious} className="arrow-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carrusel-image"
        />
        <button onClick={goToNext} className="arrow-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Texto descriptivo */}
      <div className="main-container">
        <div className="CTDR-container">
          <h3 className='bienvenida'>Bienvenido a</h3>
          <h2 className="titulo-home">CTDR UTN Reyunos</h2>
          <h4 className='h4-home'>MENDOZA-ARGENTINA</h4>
          <p className='p-home'>
            Las instalaciones principales del Centro "Los Reyunos", fueron inauguradas el 24 de octubre de 2004 en su edificio central con la presencia del rector Ing. Héctor Carlos Brotto y varios decanos que incluye al anfitrión, junto al Sr. Gobernador de Mendoza, Ing. Julio C. Cobos, el Sr. Intendente de San Rafael, Omar Felix y otras autoridades nacionales y provinciales para fijar el concepto de la Academia al servicio de la Cosa Pública.
          </p>
          <p className='p-home'>
            Existe un renovado interés acerca de las indudables vinculaciones entre territorialidad, instituciones, cultura y economía. Si bien el estudio de tales relaciones tiene larga data, no puede dejar de señalarse aspectos relevantes que hacen al impulso para constituir un Centro de estudios referido a tal materia.De manera creciente, el mundo académico y político ha ido construyendo visiones diferentes y plurales, no obstante hoy muchos centros académicos de alta calidad, ofrecen formación en la materia o concentran información para el análisis y la difusión.La revalorización de la construcción de una territorialidad compleja como espacio del desarrollo, vuelve a poner en el centro de la escena la formación de una masa crítica de recursos humanos que puedan leer y operar sobre tal complejidad.
          </p>
          <p className='p-home'>
            Agentes, gerentes y decisores en general que cuenten con las herramientas teóricas necesarias para decidir de manera eficiente y eficaz sobre materias tan diversas como gestión presupuestaria, impacto de infraestructuras, calidad de la producción, redes sociales, etc. En algún sentido, implica también la revalorización de la formación transdisciplinar.
          </p>
        </div>
        <div className='imagen-reyunos'>
          <img src='https://picsv3.pxsol.com/1472/company/library/user/258544286403b9a6f8aadb37860f349819a256dbece.jpg?ixlib=js-2.3.2&s=573a3dde50e2075f34d63a0c513e0ef9'></img>
        </div>
      </div>
      {/* Links con imagenes */}
      <div className='links'>
        <div className='alojamientos'>
          <a href='/accommodations'>
            <img src='https://picsv3.pxsol.com/1472/company/library/user/80795410155a226e97415dc7d4f5750d658a6cd775.jpg?ixlib=js-2.3.2&s=6f01e022102587fc47034a4a8cb363c1'></img>
            <span>Alojamientos</span>
          </a>
        </div>
        <div className='programas'>
          <a href='/programas'>
            <img src='https://picsv3.pxsol.com/1472/company/library/user/2262271484232ae9e7d0c78d30cc19e80e28a22ab89.jpg?ixlib=js-2.3.2&s=ce433aca27e793f1173ccd6e0b968478'></img>
            <span>Programas</span>
          </a>
        </div>
        <div className='contacto'>
          <a href='/contacto'>
            <img src='https://picsv3.pxsol.com/1472/company/library/user/19390898436cc9d9a8a976c594388dfa7301c02d68d.jpg?ixlib=js-2.3.2&s=df2a7105407b1536bb3f55a81995b8a1'></img>
            <span>Contacto</span>
          </a>
        </div>
      </div>
      <div className='flyer-container'>
        <a href='https://www.frsr.utn.edu.ar/desarrollo-territorial/'>
          <img className='flyer' src='https://picsv3.pxsol.com/1472/company/library/user/9936621264e117bfc35d1de23e14d657994efc4895.jpg?ixlib=js-2.3.2&s=46a1e9c0c724dd4159aafa807532eaa2'></img>
        </a>
      </div>
      {/* Mapa de Google */}
      <div className="mapa_google">
        <iframe
          className="google_map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6568.637855826389!2d-68.642394!3d-34.596096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x28e87ee99f8e2789!2sUTN%20-%20Los%20Reyunos!5e0!3m2!1ses!2sar!4v1615907804207!5m2!1ses!2sar"
          title="Mapa de UTN Los Reyunos"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Home;
