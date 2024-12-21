import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';

function Home() {
  const images = [
    '/images/home/carrusel-1.avif',
    '/images/home/carrusel-2.avif',
    '/images/home/carrusel-3.avif',
    '/images/home/carrusel-4.avif',
    '/images/home/carrusel-5.avif',
    '/images/home/carrusel-6.avif',
  ];
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");  
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

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
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
          onClick={() => openModal(images[currentIndex])}
          className="carrusel-image"
        />
        <button onClick={goToNext} className="arrow-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={goToPrevious} className="arrow-button">
          <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            onClick={() => openModal(images[currentIndex])}
            className="modal-image"
          />
          <button onClick={goToNext} className="arrow-button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
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
          <img src='/images/home/body.jpg'></img>
        </div>
      </div>
      {/* Links con imagenes */}
      <div className='links'>
        <div className='alojamientos'>
          <a href='/accommodations'>
            <img src='/images/home/link-1.jpg'></img>
            <span>Alojamientos</span>
          </a>
        </div>
        <div className='programas'>
          <a href='/programas'>
            <img src='/images/home/link-2.jpg'></img>
            <span>Programas</span>
          </a>
        </div>
        <div className='contacto'>
          <a href='/contacto'>
            <img src='/images/home/link-3.jpg'></img>
            <span>Contacto</span>
          </a>
        </div>
      </div>
      <div className='flyer-container'>
        <a href='https://www.frsr.utn.edu.ar/desarrollo-territorial/'>
          <img className='flyer' src='/images/home/flyer.jpg'></img>
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
