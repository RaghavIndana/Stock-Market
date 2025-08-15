import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import StockChart from "../components/StockChart";
import StatsPanel from "../components/StatsPanel";
import "./Dashboard.css";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [indicators, setIndicators] = useState(null);
  const [todayPrice, setTodayPrice] = useState(null);

  useEffect(() => {
    axios.get("https://stock-market-production-b089.up.railway.app/companies")
      .then(res => setCompanies(res.data))
      .catch(err => console.error("companies error:", err));
  }, []);

  const fetchStockData = async (symbol) => {
    try {
      const res = await axios.get(`https://stock-market-production-b089.up.railway.app/stock/${symbol}`);
      if (Array.isArray(res.data)) {
        setChartData(res.data);
        setStats(null);
        setIndicators(null);
        setTodayPrice(null);
      } else {
        setChartData(res.data.chart || null);
        setStats(res.data.stats || null);
        setIndicators(res.data.indicators || null);
        if (res.data.chart?.length) {
          setTodayPrice(res.data.chart[res.data.chart.length - 1].close);
        }
      }
    } catch (err) {
      console.error("stock error:", err);
    }
  };

  const handleSelect = (company) => {
    setSelected(company);
    fetchStockData(company.symbol);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
        <Sidebar
          companies={companies}
          selected={selected}
          onSelect={handleSelect}
        />

      {/* Main Content */}
      <div className="main-section">
        {selected ? (
          <>
            {/* Chart */}
            <div className="chart-section">
              <div className="chart-header">
                <h5>{selected.name}</h5>

              </div>
              <StockChart
                symbol={selected.symbol}
                companyName={selected.name}
              />
            </div>

            {/* Stats */}
            {stats && (
              <StatsPanel
                selected={selected}
                stats={stats}
                todayPrice={todayPrice}
              />
            )}
          </>
        ) : (
          <p className="placeholder-text">
            Select a company to view its stock chart.
          </p>
        )}
      </div>
    </div>
  );
}
