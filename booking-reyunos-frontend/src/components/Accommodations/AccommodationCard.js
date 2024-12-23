import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReservationCalendar from './ReservationCalendar'; // Importar el componente del calendario

function AccommodationCard({ accommodation, user }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar/ocultar el calendario

  const images = accommodation.imageUrl || []; // imágenes del backend

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleReservationConfirm = (selectedDates) => {
    const [startDate, endDate] = selectedDates;
    const checkInDate = startDate.toISOString().split('T')[0];
    const checkOutDate = endDate.toISOString().split('T')[0];

    axios
      .post('https://bookingreyunos.onrender.com/booking', {
        accommodationId: accommodation.id,
        guestId: user.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      })
      .then(() => {
        alert(
          `¡Reserva creada correctamente! 
    
Para confirmar su reserva, comuníquese a nuestro WhatsApp: +5492604021708 o haga clic en el ícono en la esquina inferior derecha.
Tenga en cuenta que su reserva *NO ES SEGURA* , ya que se priorizan las actividades educativas. En caso de cambios en su reserva se le comunicará
¡Muchas gracias!.`
        );
        setShowCalendar(false);
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        alert('Hubo un error al procesar su reserva. Por favor, inténtelo nuevamente.');
      });
  };

  return (
    <div className="accommodation">
      <div className="image-container-accommodation">
        {images.length > 0 ? (
          <>
            <button onClick={prevImage} className="arrow-button-accommodation">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <img
              src={images[currentImageIndex]}
              alt={accommodation.name}
              className="accommodation-image"
            />
            <button onClick={nextImage} className="arrow-button-accommodation">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>
      <div className="accommodation-details">
        <h3>{accommodation.name}</h3>
        <p className='accommodation-description'>Descripción: {accommodation.description}</p>
        {user?.role === 'GUEST' && (
          <>
            <button onClick={() => setShowCalendar(!showCalendar)} className="reserve-button">
              {showCalendar ? 'Cerrar Calendario' : 'Reservar'}
            </button>
            {showCalendar && (
              <ReservationCalendar
                accommodationId={accommodation.id}
                onConfirm={handleReservationConfirm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AccommodationCard;