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
      .post('https://bookingreyunos-production.up.railway.app/booking', {
        accommodationId: accommodation.id,
        guestId: user.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      })
      .then(() => {
        alert(
          `Su reserva se ha creado correctamente. Para confirmarla, por favor comuníquese a nuestro WhatsApp: +5492604021708, o haga clic en el ícono que se encuentra en la esquina inferior derecha. Muchas Gracias!`
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
        <p>Descripción: {accommodation.description}</p>
        <p>Precio: $ {accommodation.pricePerNight} / noche</p>
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