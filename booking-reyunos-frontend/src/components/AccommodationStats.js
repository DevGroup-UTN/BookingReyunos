import { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Importación para gráficos con Chart.js
import '../styles/accommodationStats.css';

function AccommodationStats() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const start = new Date(startDate).toISOString().split('T')[0];
      const end = new Date(endDate).toISOString().split('T')[0];
      const response = await axios.get("https://bookingreyunos.onrender.com/booking/accommodation-stats", {
        params : {
          checkInDate : start,
          checkOutDate : end
        }
        
      });
      console.log(response.data);
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
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
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
        <div className="grafico">
          <h3>Gráfico de Reservas</h3>
          <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14, // Tamaño de la fuente de la leyenda
                    family: 'Arial', // Familia de la fuente
                    weight: 'bold', // Peso de la fuente
                  },
                  color: '#fff', // Color del texto de la leyenda
                },
              },
              tooltip: {
                backgroundColor: '#222', // Fondo del tooltip
                titleColor: '#fff', // Color del título del tooltip
                bodyColor: '#fff', // Color del cuerpo del tooltip
                callbacks: {
                  label: function (tooltipItem) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw;
                    return `${label}: ${value} reservas`; // Texto del tooltip
                  },
                },
              },
            },
          }}
        />
        </div>
      )}
    </div>
  );
}

export default AccommodationStats;
