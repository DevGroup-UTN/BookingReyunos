import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import '../styles/App.css'; 
import '../styles/accommodation.css';
import AccommodationCard from '../components/Accommodations/AccommodationCard'; // Importar el componente AccommodationCard

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const { user } = useAuth(); // Acceder al usuario desde el contexto

  useEffect(() => {
    axios
      .get('https://bookingreyunos-production.up.railway.app/accommodations')
      .then((response) => setAccommodations(response.data))
      .catch((error) => console.error('Error fetching accommodations:', error));
  }, []);

  return (
    <div className='accommodation-container'>
      <h2 className="titulo">Alojamientos Disponibles</h2>
      <div className="accommodations-list">
        {accommodations.map((acc) => (
          <AccommodationCard key={acc.id} accommodation={acc} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
