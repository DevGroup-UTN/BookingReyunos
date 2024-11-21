import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'; // Biblioteca del calendario
import 'react-calendar/dist/Calendar.css'; // Estilos del calendario
import '../../styles/calendarioReservas.css';

// Función para generar un rango de fechas entre dos días
function generateDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  while (start <= end) {
    dateArray.push(new Date(start).toDateString());
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
}

function ReservationCalendar({ accommodationId, onConfirm }) {
  const [unavailableDates, setUnavailableDates] = useState([]); // Fechas ocupadas
  const [selectedDates, setSelectedDates] = useState(null); // Fechas seleccionadas por el usuario

  useEffect(() => {
    // Obtener las reservas completas desde el backend
    axios
      .get(`https://bookingreyunos-production.up.railway.app/booking/accommodation/${accommodationId}`)
      .then((response) => {
        // Extraer todas las fechas ocupadas de las reservas
        const occupiedDates = response.data.flatMap((booking) =>
          generateDateRange(booking.checkInDate, booking.checkOutDate)
        );
        setUnavailableDates(occupiedDates); // Actualizar el estado
      })
      .catch((error) =>
        console.error('Error fetching availability:', error)
      );
  }, [accommodationId]);

  // Deshabilitar las fechas ocupadas en el calendario
  const tileDisabled = ({ date }) => {
    return unavailableDates.includes(date.toDateString());
  };

  // Manejar la confirmación de la reserva
  const handleConfirm = () => {
    if (!selectedDates || selectedDates.length < 2) {
      alert('Por favor, selecciona un rango de fechas válido.');
      return;
    }

    onConfirm(selectedDates); // Llamar la función de confirmación con las fechas seleccionadas
  };

  // Función para asignar una clase a cada celda del calendario
  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const dateStr = date.toDateString();

    // Comprobar si la fecha ya ha pasado
    if (date < currentDate) {
      return 'past-date'; // Clase para fechas pasadas
    }

    // Comprobar si la fecha está ocupada
    if (unavailableDates.includes(dateStr)) {
      return 'unavailable-date'; // Clase para fechas reservadas
    }

    // Si la fecha está disponible
    return 'available-date'; // Clase para fechas disponibles
  };

  return (
    <div className="reservation-calendar">
      <div className='reservation-calendar-container'>
        <h3 className='h3-calendar'>Selecciona tus Fechas</h3>
        <Calendar
          selectRange // Permitir selección de rango
          onChange={setSelectedDates} // Actualizar fechas seleccionadas
          tileDisabled={tileDisabled} // Deshabilitar fechas ocupadas
          tileClassName={tileClassName} // Aplicar las clases personalizadas
          minDate={new Date()} // No permitir fechas pasadas
        />
        {selectedDates && (
          <p>
            Fechas seleccionadas: {selectedDates[0].toLocaleDateString()} -{' '}
            {selectedDates[1]?.toLocaleDateString() || '...'}
          </p>
        )}
        <button onClick={handleConfirm} className="confirm-button">
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
}

export default ReservationCalendar;
