import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/MyBooking.css';

const MyBooking = () => {
    const { user } = useAuth(); // Obtener el usuario desde el contexto
    const [ bookings, setBookings ] = useState([]);
    const [ message, setMessage] = useState(''); // Para mostrar mensajes de error

    useEffect(() => {
        if (user && user.id) {
          const token = user.token;
          if (!token) {
            console.error('No token found, please log in again');
            return;
          }
    
          axios
            .get(`https://bookingreyunos-production.up.railway.app/accommodations/owner/${user.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.data.length === 0) {
                setMessage('No tienes reservas disponibles.');
              } else {
                setBookings(response.data);
              }
            })
            .catch((error) => {
              console.error('Error al obtener reservas:', error);
              setMessage('Error al obtener las reservass.');
            });
        }
      }, [user]);

      return (
        <div>
            <div className='myBooking-container'>
                <h3 className='myBooking_title'>Mis Reservas</h3>
            </div>
        </div>
      );
};

export default MyBooking;