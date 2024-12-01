import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/MyAccommodation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MyAccommodation = () => {
  const { user } = useAuth();
  const [accommodations, setAccommodations] = useState([]);
  const [message, setMessage] = useState('');
  const [editingAccommodation, setEditingAccommodation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    pricePerNight: '',
    image: '',
  });

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
            setMessage('No tienes alojamientos disponibles.');
          } else {
            const accommodationsWithImages = response.data.map((accommodation) => ({
              ...accommodation,
              currentImageIndex: 0, // Índice inicial para las imágenes
            }));
            setAccommodations(accommodationsWithImages);
          }
        })
        .catch((error) => {
          console.error('Error al obtener alojamientos:', error);
          setMessage('Error al obtener los alojamientos.');
        });
    }
  }, [user]);

  const nextImage = (id) => {
    setAccommodations((prev) =>
      prev.map((accommodation) =>
        accommodation.id === id
          ? {
              ...accommodation,
              currentImageIndex:
                (accommodation.currentImageIndex + 1) % (accommodation.imageUrl.length || 1),
            }
          : accommodation
      )
    );
  };

  const prevImage = (id) => {
    setAccommodations((prev) =>
      prev.map((accommodation) =>
        accommodation.id === id
          ? {
              ...accommodation,
              currentImageIndex:
                (accommodation.currentImageIndex - 1 + (accommodation.imageUrl.length || 1)) %
                (accommodation.imageUrl.length || 1),
            }
          : accommodation
      )
    );
  };

  const handleEditClick = (accommodation) => {
    setEditingAccommodation(accommodation);
    setFormData({
      name: accommodation.name,
      description: accommodation.description,
      location: accommodation.location,
      pricePerNight: accommodation.pricePerNight,
      image: accommodation.image || '',
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;

    if (!token) {
      console.error('No token found, please log in again');
      return;
    }

    try {
      await axios.put(
        `https://bookingreyunos-production.up.railway.app/accommodations/${editingAccommodation.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccommodations((prev) =>
        prev.map((accommodation) =>
          accommodation.id === editingAccommodation.id
            ? { ...accommodation, ...formData }
            : accommodation
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el alojamiento:', error);
      setMessage('Error al actualizar el alojamiento.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="titulo">Mis Alojamientos</h2>
      {message && <p className="error-message">{message}</p>}
      <div className="accommodations-list">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="my-accommodation">
            <div className="image-container-accommodation">
              {accommodation.imageUrl?.length > 0 ? (
                <>
                  <button
                    onClick={() => prevImage(accommodation.id)}
                    className="arrow-button-accommodation"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <img
                    src={accommodation.imageUrl[accommodation.currentImageIndex]}
                    alt={accommodation.name}
                    className="accommodation-image"
                  />
                  <button
                    onClick={() => nextImage(accommodation.id)}
                    className="arrow-button-accommodation"
                  >
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
              <p>Precio por noche: ${accommodation.pricePerNight}</p>
              <button id="boton-editar" onClick={() => handleEditClick(accommodation)}>
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h3>Editar Alojamiento</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Descripción:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Precio por noche:
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Imagen URL:
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </label>
              <button id="boton-guardar" type="submit">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccommodation;
