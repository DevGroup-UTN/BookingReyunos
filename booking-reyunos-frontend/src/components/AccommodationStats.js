import { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/accommodationStats.css";

function AccommodationStats() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  const fetchData = async () => {
    try {
      const start = new Date(startDate).toISOString().split("T")[0];
      const end = new Date(endDate).toISOString().split("T")[0];
      const response = await axios.get(
        "https://bookingreyunos.onrender.com/booking/accommodation-stats",
        {
          params: {
            checkInDate: start,
            checkOutDate: end,
          },
        }
      );
      const data = response.data;
      setChartData({
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "Reservas por Alojamiento",
            data: data.map((item) => item.count),
            backgroundColor: [
              "#FF1334",
              "#1682EB",
              "#FFCE36",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            hoverBackgroundColor: [
              "#FF4364",
              "#36B2EB",
              "#FFFE96",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
        rawData: data,
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchReservationDetails = async (reservationId) => {
    try {
      const response = await axios.get(
        `https://bookingreyunos.onrender.com/booking/${reservationId}`
      );
      setReservationDetails(response.data);
    } catch (error) {
      console.error("Error fetching reservation details", error);
    }
  };

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => {
      if (prevShowDetails) {
        setReservationDetails(null); // Limpia los detalles si ocultamos la tabla
      }
      return !prevShowDetails;
    });
  };

  return (
    <div>
      <h2>Estadísticas de Reservas</h2>
      <form
        className="accommodation-stats_date-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Consultar</button>
      </form>
      {chartData && (
        <>
          <div className="grafico">
            <Pie
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 14,
                        family: "Arial",
                        weight: "bold",
                      },
                      color: "#fff",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#222",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    callbacks: {
                      label: function (tooltipItem) {
                        const label = tooltipItem.label || "";
                        const value = tooltipItem.raw;
                        return `${label}: ${value} reservas`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <button className="boton-detalles" onClick={toggleDetails}>
            {showDetails ? "Ocultar Detalles" : "Más Detalles"}
          </button>
          {showDetails && (
            <div className="tabla-detalles">
              <div className="titulo-detalles">
                <h3>Detalles de Reservas</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Alojamiento</th>
                    <th>Ids de Reservas</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.rawData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        {item.bookingIds.split(",").map((bookingId) => (
                          <span
                            key={bookingId}
                            className="reserva"
                            onClick={() => fetchReservationDetails(bookingId)}
                          >
                            {bookingId}, 
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {reservationDetails && (
        <div className="reservation-details">
          <h3>Detalles de la Reserva</h3>
          <div className="reservation-table-div">
            {reservationDetails && (
            <table className="reservation-table">
              <tbody>
                {Object.entries(reservationDetails).map(([key, value]) => (
                  <tr key={key}>
                    <td className="key-column">{key}</td>
                    <td className="value-column">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
      </div>
      )}
    </div>
  );
}

export default AccommodationStats;
