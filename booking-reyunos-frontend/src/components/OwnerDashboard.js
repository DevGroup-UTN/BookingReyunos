import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OwnerDashboard.css';
import { useAuth } from '../context/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth(); // Obtener el usuario desde el AuthContext
  const [accommodations, setAccommodations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dates, setDates] = useState([]);
  const [message, setMessage] = useState(''); // Para mostrar mensajes al usuario
  const [guests, setGuests] = useState({}); // Mapeo de guestId a username
  const [menuVisible, setMenuVisible] = useState(false); // Controlar visibilidad del menú
  const [selectedGuestId, setSelectedGuestId] = useState(null); // ID del guest seleccionado

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return; // Asegúrate de que el usuario esté definido

      try {
        // Obtener alojamientos del propietario
        const accomData = await axios.get(`https://ctdr-utnreyunos.netlify.app/:8080/accommodations/owner/${user.id}`);
        setAccommodations(accomData.data);

        // Obtener reservas de cada alojamiento
        const allBookings = [];
        for (const accommodation of accomData.data) {
          const resData = await axios.get(`https://ctdr-utnreyunos.netlify.app//booking/accommodation/${accommodation.id}`);
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
        const response = await axios.post('https://ctdr-utnreyunos.netlify.app//users/bulk', uniqueGuestIds);
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

  const eliminarReserva = (bookingId) => axios.delete(`https://ctdr-utnreyunos.netlify.app//booking/${bookingId}`);

  // Funciones para enviar correos
  const sendEmail = async (subject, message, guestId) => {
    try {
      // Lógica para enviar el correo (suponiendo que tengas un endpoint en el backend para ello)
      await axios.post('https://ctdr-utnreyunos.netlify.app/send-email', { subject, message, guestId });
      alert('Correo enviado');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      alert('No se pudo enviar el correo');
    }
  };

  // Manejador de clic en el nombre del usuario
  const handleGuestClick = (guestId) => {
    setSelectedGuestId(guestId);
    setMenuVisible(!menuVisible);
  };

  // Manejador de clic fuera del menú
  const handleClickOutside = () => {
    setMenuVisible(false);
  };

  // Función para eliminar la reserva
  const handleEliminarReserva = (bookingId) => {
    eliminarReserva(bookingId);
    setMenuVisible(false);
    sendEmail('Eliminación de reserva', 'Tu reserva ha sido eliminada', selectedGuestId);
  };

  // Función para modificar la reserva
  const handleModificarReserva = (bookingId) => {
    setMenuVisible(false);
    sendEmail('Modificación de reserva', 'Tu reserva ha sido modificada', selectedGuestId);
  };

  // Función para ver detalles de la reserva
  const handleVerDetalles = (bookingId) => {
    setMenuVisible(false);
    sendEmail('Detalles de reserva', 'Aquí están los detalles de tu reserva', selectedGuestId);
  };

  const renderCellContent = (accommodationId, date) => {
    const formattedDate = new Date(date + 'T00:00:00'); // Convertir la fecha a un formato Date adecuado
    
    const reservation = reservations.find(
      (res) =>
        res.accommodationId === accommodationId &&
        new Date(res.checkInDate + 'T00:00:00') <= formattedDate &&
        new Date(res.checkOutDate + 'T23:59:59') >= formattedDate
    );

    return reservation ? (
      <div className="reserved">
        {/* Verifica si tenemos el username del guest basado en guestId */}
        {guests[reservation.guestId] ? (
          <span onClick={() => handleGuestClick(reservation.guestId)}>
            {guests[reservation.guestId]}
          </span>
        ) : (
          <span>Usuario no disponible</span>
        )}
        {/* Menú desplegable */}
        {menuVisible && selectedGuestId === reservation.guestId && (
          <div className="dropdown-menu">
            <button onClick={() => handleEliminarReserva(reservation.id)}>Eliminar reserva</button>
            <button onClick={() => handleVerDetalles(reservation.id)}>Ver detalles</button>
            <button onClick={() => handleModificarReserva(reservation.id)}>Modificar reserva</button>
          </div>
        )}
      </div>
    ) : (
      <div className="available">Disponible</div>
    );
  };

  return (
    <div className="dashboard-container" onClick={handleClickOutside}>
      <h2>Dashboard del Propietario</h2>
      {message && <p className="error-message">{message}</p>} {/* Mensaje de error */}
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Alojamiento</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => (
            <tr key={accommodation.id}>
              <td>{accommodation.name}</td>
              {dates.map((date) => (
                <td key={`${accommodation.id}-${date}`}>
                  {renderCellContent(accommodation.id, date)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerDashboard;
