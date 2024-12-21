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
      const response = await axios.get("https://bookingreyunos.onrender.com/bookings/accommodation-stats", {
        checkInDate : start,
        checkOutDate : end
      });
      const data = response.data;
      setChartData({
        labels: data.map((item) => item.name),
        datasets: [
          {
            label: "Reservas por Alojamiento",
            data: data.map((item) => item.count),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
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
        <div>
          <h3>Gráfico de Reservas</h3>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default AccommodationStats;
