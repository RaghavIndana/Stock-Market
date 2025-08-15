import { useEffect, useState } from "react";
import "./StockChart.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function StockChart({ symbol, companyName }) {
  const [stockData, setStockData] = useState([]);
  const [period, setPeriod] = useState("1d");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        // const res = await fetch(`https://stock-market-production-b089.up.railway.app/stock/${symbol}?period=${period}`);
        const res = await fetch(`https://stock-market-production-b089.up.railway.app/stock/${symbol}?period=${period}`);
        const data = await res.json();
        setStockData(data.chart || []);
      } catch (err) {
        console.error(err);
        setStockData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, period]);

  // Live update only for 1-day chart
  useEffect(() => {
    if (!symbol || period !== "1d") return;

    const intervalId = setInterval(() => {
      fetch(`https://stock-market-production-b089.up.railway.app/stock/${symbol}?period=1d`)
        .then(res => res.json())
        .then(data => setStockData(data.chart || []))
        .catch(err => console.error(err));
    }, 60 * 1000); // every 60 seconds

    return () => clearInterval(intervalId); // cleanup
  }, [symbol, period]);


  if (!symbol) return <p>Select a company to view its stock chart.</p>;
  if (loading) return <p>Loading...</p>;
  if (!stockData || stockData.length === 0) return <p>No data available for this period.</p>;

  const chartData = {
    labels: stockData.map(d => d.date instanceof Date ? d.date : new Date(d.date)),
    datasets: [
      {
        label: companyName,
        data: stockData.map(d => d.close),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 2
      }
    ]
  };

  const options = {
    plugins: { legend: { display: true }, tooltip: { mode: "index", intersect: false } },
    scales: {
      x: { type: "time", time: { unit: period === "1d" ? "hour" : "day" } },
      y: { display: true }
    }
  };

  return (
    <div>


      {/* Chart */}
      <Line key={period} data={chartData} options={options} />
      {/* Period buttons */}
      <div className="period-buttons">
        {["1d", "7d", "1m", "6m", "1y"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`period-btn ${period === p ? "active" : ""}`}
          >
            {p === "1d" ? "1 Day" : p === "7d" ? "7 Days" : p === "1m" ? "1 Month" : p === "6m" ? "6 Months" : "1 Year"}
          </button>
        ))}
      </div>


    </div>

  );
}
