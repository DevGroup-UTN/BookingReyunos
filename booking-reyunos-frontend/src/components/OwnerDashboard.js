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
  const [emails, setEmails] = useState({}); // Mapeo de guestId a email
  const [menuVisible, setMenuVisible] = useState(false); // Controlar visibilidad del menú
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFreeOpen, setIsModalFreeOpen] = useState(false); // Controla la visibilidad del modal
  const [freeStartDate, setFreeStartDate] = useState(''); // Fecha de inicio
  const [freeEndDate, setFreeEndDate] = useState(''); // Fecha de fin
  const [selectedAccommodationId, setSelectedAccommodationId] = useState(null); // ID del alojamiento
  const [currentAction, setCurrentAction] = useState(null); // Estado para la acción actual ("close" o "open")
  // Estados para el modal de crear reserva y sus datos
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [crearReservasStartDate, setCrearReservasStartDate] = useState(null);
const [crearReservasEndDate, setCrearReservasEndDate] = useState(null);
const [newBookingAccommodationId, setNewBookingAccommodationId] = useState(null);
const [newUsernameBooking, setNewUsernameBooking] = useState('');
const [newEmailBooking, setNewEmailBooking] = useState('');

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      const accomData = await axios.get(
        `https://bookingreyunos.onrender.com/accommodations/owner/${user.id}`
      );
      setAccommodations(accomData.data);

      const allBookings = [];
      for (const accommodation of accomData.data) {
        const resData = await axios.get(
          `https://bookingreyunos.onrender.com/booking/accommodation/${accommodation.id}`
        );
        allBookings.push(...resData.data);
      }
      setReservations(allBookings);

      const startDate = new Date();
      const datesArray = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(startDate.getDate() + i);
        return date.toISOString().split('T')[0];
      });
      setDates(datesArray);

      const guestIds = allBookings.map((booking) => booking.guestId);
      const uniqueGuestIds = [...new Set(guestIds)];

      const response = await axios.post(
        'https://bookingreyunos.onrender.com/users/bulk',
        uniqueGuestIds
      );
      const usersMap = response.data.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
      const usersEmails = response.data.reduce((acc, user) => {
        acc[user.id] = user.email;
        return acc;
      }, {});
      setEmails(usersEmails);
      setGuests(usersMap);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setMessage('Error al cargar los datos del dashboard.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // Funciones para enviar correos
  const sendEmail = async (subject, message, guestId) => {
    try {
      console.log('sujeto: ' + subject + 'mensaje' + message + "guestID: " + guestId);
      // Lógica para enviar el correo (suponiendo que tengas un endpoint en el backend para ello)
      await axios.post('https://bookingreyunos.onrender.com/email/send-email', { 
        to: guestId, 
        subject, 
        body: message });
      alert('Correo enviado');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      alert('No se pudo enviar el correo');
    }
  };
  // Función para abrir el modal de crear reserva
const handleOpenCreateModal = (accommodationId) => {
  setNewBookingAccommodationId(accommodationId);
  console.log("abriendo modal" + isCreateModalOpen);
  setIsCreateModalOpen(true);
};

// Función para cerrar el modal de crear reserva
const handleCloseCreateModal = () => {
  setIsCreateModalOpen(false);
  setNewBookingAccommodationId('');
  setNewUsernameBooking('');
  setCrearReservasEndDate('');
  setCrearReservasStartDate('');
};

// Funcion para crear la reserva
const handleCreateReservation = async () => {
  if (!newUsernameBooking) {
    alert('Por favor, ingrese nombre del huésped.');
    return;
  }
  const start = new Date(crearReservasStartDate).toISOString().split('T')[0];
  const end = new Date(crearReservasEndDate).toISOString().split('T')[0];
  console.log("Inicio: " + start + " FIN: " + end);
  try {
    const response = await axios.post('https://bookingreyunos.onrender.com/booking', {
      accommodationId: newBookingAccommodationId,
      checkInDate: start,
      checkOutDate: end,
      guestName: newUsernameBooking,
      guestEmail: newEmailBooking
    });
    console.log(response.data);
    alert('Reserva creada exitosamente.');
    handleCloseCreateModal();
    fetchDashboardData(); // Refresca los datos en el dashboard
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    alert('No se pudo crear la reserva. Por favor, inténtalo de nuevo.');
  }
};

  // Manejador de clic fuera del menú
  const handleClickOutside = () => {
    setMenuVisible(false);
  };

  const handleOpenModalFree = (accommodationId) => {
    setSelectedAccommodationId(accommodationId); // Asigna el ID del alojamiento
    setIsModalFreeOpen(true); // Abre el modal
  };

  const handleCloseModalFree = () => {
    setIsModalFreeOpen(false); // Cierra el modal
    setFreeStartDate(''); // Resetea las fechas
    setFreeEndDate('');
  };
  const handleConfirmOpenDates = async () =>{
    try {
      if (!freeStartDate || !freeEndDate) {
        alert("Por favor, ingrese ambas fechas.");
        return;
      }
      const startDate = new Date(freeStartDate).toISOString().split('T')[0];
      const endDate = new Date(freeEndDate).toISOString().split('T')[0];
      // Envía al backend
      const response = await axios.post('https://bookingreyunos.onrender.com/booking/open-dates', {
        accommodationId: selectedAccommodationId,
        startDate: startDate,
        endDate: endDate,
      });
      alert('Fechas abiertas exitosamente.');
      handleCloseModalFree(); // Cierra el modal después de confirmar
      fetchDashboardData(); // Refrescar los datos
      } catch (error) {
        console.error('Error al abrir las fechas:', error);
        alert('No se pudieron abrir las fechas. Por favor, inténtalo de nuevo.');
      }
  }
  const handleConfirmCloseDates = async () => {
    try {
      let startDate, endDate, accommodationId;
  
      // Determinar el rango de fechas y el accommodationId según el contexto
      if (selectedReservation) {
        console.log(selectedReservation);
        // Si hay una reserva seleccionada
        startDate = selectedReservation.checkInDate;
        endDate = selectedReservation.checkOutDate;
        accommodationId = selectedReservation.accommodationId; // Usar el ID del alojamiento de la reserva
      } else {
        // Si no hay reserva seleccionada, usar las fechas y el ID manuales
        if (!freeStartDate || !freeEndDate) {
          alert("Por favor, ingrese ambas fechas.");
          return;
        }
        startDate = new Date(freeStartDate).toISOString().split('T')[0];
        endDate = new Date(freeEndDate).toISOString().split('T')[0];
        accommodationId = selectedAccommodationId; // Usar el ID seleccionado manualmente
      }
  
      console.log("Datos enviados al backend:", { startDate, endDate, accommodationId });
  
      // Enviar solicitud al backend
      const response = await axios.post('https://bookingreyunos.onrender.com/booking/close-dates', {
        accommodationId: accommodationId,
        startDate: startDate,
        endDate: endDate,
      });
  
      console.log("Respuesta del servidor:", response.data);
      alert("Fechas cerradas exitosamente.");
  
      // Cierra el modal después de confirmar
      handleCloseModalFree();
  
      // Refrescar los datos en el dashboard
      fetchDashboardData();
    } catch (error) {
      console.error("Error al cerrar las fechas:", error);
      alert("No se pudieron cerrar las fechas. Por favor, inténtalo de nuevo.");
    }
  };
  
  
  


  // Función para eliminar la reserva
  const handleEliminarReserva = (booking) => {
    setMenuVisible(false);
    sendEmail('Eliminación de Reserva', 'Saludos estimado usuario. Le informamos por el presente que el propietario a pedido la cancelación de la reserva por motivos personales. Para más información por favor comuníquese con nosotros a nuestro whatsapp: +5492604021708. Disculpe las molestia.', booking.guestId);
  };


  
  const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end); // Usar la fecha proporcionada por el usuario
    const datesArray = [];
  
    while (startDate <= endDate) {
      datesArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1); // Avanza un día
    }
  
    setDates(datesArray); // Actualiza el estado con las fechas generadas
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
  
    generateDateRange(startDate, endDate); // Genera el rango basado en el input
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
    // Restablecer el modal al estado inicial
  const handleResetModal = () => {
    setCurrentAction(null); // Regresa al estado inicial
    setFreeStartDate(''); // Limpia los campos
    setFreeEndDate('');
  };


  const handleCloseReservations = () => {
    setCurrentAction("close"); // Cambiar a cerrar reservas
  };

  const handleOpenReservations = () => {
    setCurrentAction("open"); // Cambiar a abrir reservas
  };

  const renderCellContent = (accommodationId, date) => {
    const formattedDate = new Date(date + 'T00:00:00');
    const reservation = reservations.find(
      (res) =>
        res.accommodationId === accommodationId &&
        new Date(res.checkInDate + 'T00:00:00') <= formattedDate &&
        new Date(res.checkOutDate + 'T23:59:59') >= formattedDate
    );
    if (reservation) {
      const styleClass = reservation.blocked ? 'blocked' : 'pending';
      return (
        <div className={styleClass} onClick={() => handleOpenModal(reservation)}>
          {guests[reservation.guestId] || 'Usuario no disponible'}
        </div>
      );
    }
    if (!reservation){
      return (
        <div className='available' onClick={() => handleOpenCreateModal(accommodationId)}>
          Disponible
        </div>
      )
    }
};
  const groupDates = (accommodationId) => {
    const groups = [];
    let currentGroup = [];
    let currentType = null;
  
    dates.forEach((date) => {
      const formattedDate = new Date(date + "T00:00:00");
      const reservation = reservations.find(
        (res) =>
          res.accommodationId === accommodationId &&
          new Date(res.checkInDate + "T00:00:00") <= formattedDate &&
          new Date(res.checkOutDate + "T23:59:59") >= formattedDate
      );
  
      const type = reservation
        ? reservation.blocked
          ? "blocked"
          : "pending"
        : "available";
  
      if (type === currentType) {
        currentGroup.push(date);
      } else {
        if (currentGroup.length > 0) {
          groups.push({ type: currentType, dates: currentGroup });
        }
        currentGroup = [date];
        currentType = type;
      }
    });
  
    if (currentGroup.length > 0) {
      groups.push({ type: currentType, dates: currentGroup });
    }
  
    return groups;
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
        <div className="calendar-table-owner">
        <table >
          <thead className='thead-owner'>
            <tr>
              <th className='th-1'>Alojamiento</th>
              {dates.map((date) => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
            <tbody>
            {accommodations.map((accommodation) => {
              const groupedDates = groupDates(accommodation.id);
              return (
                <tr key={accommodation.id}>
                  <td className="dashboard-td">
                    <div
                      className="accomodation-cell"
                      onClick={() => handleOpenModalFree(accommodation.id)}
                    >
                      {accommodation.name}
                    </div>
                  </td>
                  {groupedDates.map((group, index) => (
                     <td
                     key={`${accommodation.id}-${index}`}
                     className='celdas-contenedoras'
                     colSpan={group.dates.length}
                     onClick={() => {
                       if (group.type === "pending" || group.type === "blocked") {
                         const reservation = reservations.find(
                           (res) =>
                             res.accommodationId === accommodation.id &&
                             new Date(res.checkInDate + "T00:00:00") <=
                               new Date(group.dates[0] + "T00:00:00") &&
                             new Date(res.checkOutDate + "T23:59:59") >=
                               new Date(group.dates[0] + "T23:59:59")
                         );
                         handleOpenModal(reservation);
                       }
                       else if (group.type === "available") {
                         handleOpenCreateModal(accommodation.id);
                       }
                     }}
                   >
                      <div className={group.type}>{group.type === "available"
                        ? "Disponible"
                        : guests[
                            reservations.find(
                              (res) =>
                                res.accommodationId === accommodation.id &&
                                new Date(res.checkInDate + "T00:00:00") <=
                                  new Date(group.dates[0] + "T00:00:00") &&
                                new Date(res.checkOutDate + "T23:59:59") >=
                                  new Date(group.dates[0] + "T23:59:59")
                            )?.guestId
                          ] || "Desconocido"}
                        </div>
                      
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
      {isModalOpen && selectedReservation && (
        <div className="modal-overlay">
          <div className="modal-content-owner">
            <h3>Detalles de la Reserva</h3>
            <p className='owner-p'><strong>Usuario:</strong> {guests[selectedReservation.guestId] || 'Desconocido'}</p>
            <p className='owner-p'><strong>Correo:</strong> {emails[selectedReservation.guestId] || 'Desconocido'}</p>
            <p className='owner-p'><strong>Check-In:</strong> {selectedReservation.checkInDate}</p>
            <p className='owner-p'><strong>Check-Out:</strong> {selectedReservation.checkOutDate}</p>
            <p className='owner-p'><strong>Estado:</strong> {' '}
              {selectedReservation.blocked === true
                ? 'Cerrada'
                : selectedReservation.blocked === false
                ? 'Abierta'
                : 'Estado desconocido'}</p>
            <p className='owner-p'><strong>Alojamiento:</strong> {selectedReservation.accommodationId}</p>
            <button onClick={() => {
              handleEliminarReserva(selectedReservation);
              handleCloseModal();
            }}>
              Eliminar Reserva
            </button>
            <button onClick={handleConfirmCloseDates}>Fijar Reserva</button>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
      {/* Modal para crear reservas */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-createBooking">
            <h3>Crear Reserva</h3>
            <p><strong>Alojamiento:</strong> {newBookingAccommodationId}</p>
              <div className='label-createBooking'>
              <label>Fecha Inicio:</label>
              <input
                className="input-alojamiento-1"
                type="date"
                value={crearReservasStartDate}
                onChange={(e) => setCrearReservasStartDate(e.target.value)}
              />
            </div>
            <div className='label-createBooking'>
              <label>Fecha Fin:</label>
              <input
                type="date"
                className="input-alojamiento-2"
                value={crearReservasEndDate}
                onChange={(e) => setCrearReservasEndDate(e.target.value)}
              />
            </div>
            <div className="label-createBooking">
              <label>
                Nombre del huésped:
                <input
                  type="text"
                  value={newUsernameBooking}
                  onChange={(e) => setNewUsernameBooking(e.target.value)}
                />
              </label>
            </div>
            <div className="label-createBooking">
              <label>
                Email del huésped:
                <input
                type='email'
                value={newEmailBooking}
                onChange={(e) => setNewEmailBooking(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleCreateReservation}>Crear</button>
              <button onClick={handleCloseCreateModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {isModalFreeOpen && (
      <div className="modal-overlay">
        <div className="modal-content-owner">
          {/* Estado inicial con los botones */}
          {currentAction === null && (
            <div className="modal-buttons">
              <button onClick={handleCloseReservations}>
                Cerrar Reservas
              </button>
              <button onClick={handleOpenReservations}>
                Abrir Reservas
              </button>
              <button onClick={handleCloseModalFree}>Cancelar</button>
            </div>
          )}
      {/* Formulario para cerrar reservas */}
      {currentAction === "close" && (
        <div className="cerrar-reservas">
          <h3 className="modal-h3-owner-dashboard">Cerrar Fechas para el Alojamiento</h3>
          <div className="modal-field-owner">
            <label>Fecha Inicio:</label>
            <input
              className="input-alojamiento-1"
              type="date"
              value={freeStartDate}
              onChange={(e) => setFreeStartDate(e.target.value)}
            />
          </div>
          <div className="modal-field-owner">
            <label>Fecha Fin:</label>
            <input
              type="date"
              className="input-alojamiento-2"
              value={freeEndDate}
              onChange={(e) => setFreeEndDate(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button onClick={handleConfirmCloseDates}>Confirmar</button>
            <button onClick={handleResetModal}>Regresar</button>
          </div>
        </div>
      )}
      {/* Formulario para abrir reservas */}
      {currentAction === "open" && (
        <div className="abrir-reservas">
          <h3 className="modal-h3-owner-dashboard">Abrir Fechas para el Alojamiento</h3>
          <div className="modal-field-owner">
            <label>Fecha Inicio:</label>
            <input
              className="input-alojamiento-1"
              type="date"
              value={freeStartDate}
              onChange={(e) => setFreeStartDate(e.target.value)}
            />
          </div>
          <div className="modal-field-owner">
            <label>Fecha Fin:</label>
            <input
              type="date"
              className="input-alojamiento-2"
              value={freeEndDate}
              onChange={(e) => setFreeEndDate(e.target.value)}
            />
          </div>
          <div className="modal-buttons-owner">
            <button onClick={handleConfirmOpenDates}>Confirmar</button>
            <button onClick={handleResetModal}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  </div>
  )}
  

    </div>
  );
};

export default OwnerDashboard;
