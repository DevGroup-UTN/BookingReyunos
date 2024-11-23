import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OwnerDashboard.css';
import { useAuth } from '../context/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth(); // Obtener el usuario desde el AuthContext
  const [accommodations, setAccommodations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(''); // Fecha inicial personalizada
  const [endDate, setEndDate] = useState(''); // Fecha final personalizada
  const [message, setMessage] = useState(''); // Para mostrar mensajes al usuario
  const [guests, setGuests] = useState({}); // Mapeo de guestId a username
  const [menuVisible, setMenuVisible] = useState(false); // Controlar visibilidad del menú
  const [selectedGuestId, setSelectedGuestId] = useState(null); // ID del guest seleccionado
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return; // Asegúrate de que el usuario esté definido

      try {
        // Obtener alojamientos del propietario
        const accomData = await axios.get(`https://bookingreyunos-production.up.railway.app/accommodations/owner/${user.id}`);
        setAccommodations(accomData.data);

        // Obtener reservas de cada alojamiento
        const allBookings = [];
        for (const accommodation of accomData.data) {
          const resData = await axios.get(`https://bookingreyunos-production.up.railway.app/booking/accommodation/${accommodation.id}`);
          allBookings.push(...resData.data);
        }
        setReservations(allBookings);

        // Generar las próximas 7 fechas
        const startDate = new Date();
        const datesArray = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(startDate.getDate() + i);
          return date.toISOString().split('T')[0];
        });
        setDates(datesArray);

        // Obtener todos los guestId de las reservas
        const guestIds = allBookings.map((booking) => booking.guestId);
        const uniqueGuestIds = [...new Set(guestIds)]; // Eliminar duplicados
        // Hacer un POST al backend para obtener los usuarios correspondientes
        const response = await axios.post('https://bookingreyunos-production.up.railway.app/users/bulk', uniqueGuestIds);
        const usersMap = response.data.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setGuests(usersMap);

      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setMessage('Error al cargar los datos del dashboard.');
      }
    };

    fetchDashboardData();
  }, [user]); // Dependencia del usuario

  const eliminarReserva = (bookingId) => axios.delete(`https://bookingreyunos-production.up.railway.app/booking/${bookingId}`);

  // Funciones para enviar correos
  const sendEmail = async (subject, message, guestId) => {
    try {
      // Lógica para enviar el correo (suponiendo que tengas un endpoint en el backend para ello)
      await axios.post('https://bookingreyunos-production.up.railway.app/send-email', { subject, message, guestId });
      alert('Correo enviado');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      alert('No se pudo enviar el correo');
    }
  };

  // Manejador de clic en el nombre del usuario
  const handleGuestClick = (guestId) => {
    setSelectedGuestId(guestId.email);
    setMenuVisible(!menuVisible);
  };

  // Manejador de clic fuera del menú
  const handleClickOutside = () => {
    setMenuVisible(false);
  };

  // Función para eliminar la reserva
  const handleEliminarReserva = (bookingId) => {
    setMenuVisible(false);
    sendEmail('Eliminación de Reserva', 'Saludos estimado usuario. Le informamos por el presente que el propietario a pedido la cancelación de la reserva por motivos personales. Para más información por favor comuníquese con nosotros a nuestro whatsapp: +5492604021708. Disculpe las molestia.', selectedGuestId);
  };

  // Función para modificar la reserva
  const handleModificarReserva = (bookingId) => {
    setMenuVisible(false);
    sendEmail('Modificación de reserva', 'Tu reserva ha sido modificada', selectedGuestId);
  };
  const generateDateRange = (start = new Date(), end = null) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Por defecto, mostrar una semana

    const datesArray = [];
    while (startDate <= endDate) {
      datesArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    setDates(datesArray);
  };
  const handleDateRangeSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('Por favor selecciona ambas fechas.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert('La fecha final debe ser posterior a la inicial.');
      return;
    }

    generateDateRange(startDate, endDate);
  };

  // Función para ver detalles de la reserva
  const handleVerDetalles = (bookingId) => {
    setMenuVisible(false);
    sendEmail('Detalles de reserva', 'Aquí están los detalles de tu reserva', selectedGuestId);
  };
  /* Funcion para abrir un modal con los detalles de la reserva */
  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };
  /* Funcion para cerrar el modal */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };  

  const renderCellContent = (accommodationId, date) => {
    const formattedDate = new Date(date + 'T00:00:00'); 
    
    const reservation = reservations.find(
      (res) =>
        res.accommodationId === accommodationId &&
        new Date(res.checkInDate + 'T00:00:00') <= formattedDate &&
        new Date(res.checkOutDate + 'T23:59:59') >= formattedDate
    );
  
    return reservation ? (
      <div className="reserved" onClick={() => handleOpenModal(reservation)}>
        {guests[reservation.guestId] || 'Usuario no disponible'}
      </div>
    ) : (
      <div className="available">Disponible</div>
    );
  };
  

  return (
    <div className="dashboard-container" onClick={handleClickOutside}>
      <h2 className='dashboard-h2'>Dashboard del Propietario</h2>
      {message && <p className="error-message">{message}</p>} {/* Mensaje de error */}
       {/* Formulario para cambiar el rango de fechas */}
       <form onSubmit={handleDateRangeSubmit} className="date-range-form">
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha Fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Actualizar Fechas</button>
      </form>
      <div className='calendar-table-owner-container' style={{backgroundImage: "url('/images/logo-utn-nav.png')"}}>
        <table className="calendar-table-owner">
          <thead className='thead-owner'>
            <tr>
              <th className='th-1'>Alojamiento</th>
              {dates.map((date) => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accommodations.map((accommodation) => (
              <tr key={accommodation.id}>
                <td className='dashboard-td'>{accommodation.name}</td>
                {dates.map((date) => (
                  <td className='dashboard-td' key={`${accommodation.id}-${date}`}>
                    {renderCellContent(accommodation.id, date)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedReservation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Detalles de la Reserva</h3>
            <p className='owner-p'><strong>Usuario:</strong> {guests[selectedReservation.guestId] || 'Desconocido'}</p>
            <p className='owner-p'><strong>Check-In:</strong> {selectedReservation.checkInDate}</p>
            <p className='owner-p'><strong>Check-Out:</strong> {selectedReservation.checkOutDate}</p>
            <p className='owner-p'><strong>Alojamiento:</strong> {selectedReservation.accommodationId}</p>
            <button onClick={() => {
              handleEliminarReserva(selectedReservation.id);
              handleCloseModal();
            }}>
              Eliminar Reserva
            </button>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OwnerDashboard;
