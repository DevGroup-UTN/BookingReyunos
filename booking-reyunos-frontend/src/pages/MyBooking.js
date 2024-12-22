import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/MyBooking.css';

const MyBooking = () => {
  const { user } = useAuth(); // Obtener el usuario desde el contexto
  const [bookings, setBookings] = useState([]); // Lista de reservas con alojamientos
  const [message, setMessage] = useState(''); // Para mostrar mensajes de error

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.id) {
        const token = user.token;
        if (!token) {
          console.error('No token found, please log in again');
          setMessage('Debes iniciar sesión nuevamente.');
          return;
        }

        try {
          // Obtener las reservas del usuario
          const bookingResponse = await axios.get(
            `https://bookingreyunos.onrender.com/booking/guest/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const bookingData = bookingResponse.data;

          if (bookingData.length === 0) {
            setMessage('No tienes ninguna reserva actualmente.');
            return;
          }

          // Obtener la información de los alojamientos para cada reserva
          const bookingsWithAccommodation = await Promise.all(
            bookingData.map(async (booking) => {
              try {
                const accommodationResponse = await axios.get(
                  `https://bookingreyunos.onrender.com/accommodations/${booking.accommodationId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                return {
                  ...booking,
                  accommodation: accommodationResponse.data, // Añadir info del alojamiento
                };
              } catch (error) {
                console.error(`Error al obtener alojamiento para booking ${booking.id}:`, error);
                return { ...booking, accommodation: null }; // Manejar alojamientos no encontrados
              }
            })
          );

          setBookings(bookingsWithAccommodation);
        } catch (error) {
          console.error('Error al obtener reservas:', error);
          setMessage('Error al obtener las reservas.');
        }
      }
    };

    fetchBookings();
  }, [user]);
  // Eliminar reserva
  const handleEliminarReserva = async (bookingId) => {
    const token = user?.token;
    if (!token) {
      console.error('No token found, please log in again');
      setMessage('Debes iniciar sesión nuevamente.');
      return;
    }

    try {
      await axios.delete(
        `https://bookingreyunos.onrender.com/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filtrar la reserva eliminada de la lista
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      setMessage('Reserva eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      setMessage('No se pudo eliminar la reserva.');
    }
  };

  return (
    <div className="myBooking_container">
      <div className="myBooking-container">
        <h3 className="myBooking_title">Mis Reservas</h3>
        {message && <p className="myBooking_message">{message}</p>}
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="my-booking">
              <div className="booking-details">
                <p>CheckIn: {booking.checkInDate}</p>
                <p>CheckOut: {booking.checkOutDate}</p>
                <p>Total: ${booking.totalPrice}</p>
                {booking.accommodation ? (
                  <>
                    <p>Alojamiento: {booking.accommodation.name}</p>
                  </>
                ) : (
                  <p>No se encontró información del alojamiento.</p>
                )}
                <button onClick={() => handleEliminarReserva(booking.id)}>
                    Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;