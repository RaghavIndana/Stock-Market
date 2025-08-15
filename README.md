# Stock Market Dashboard [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/stockmarket) [![made-with-nodejs](https://img.shields.io/badge/Made%20with-Node.js-1f425f.svg)](https://nodejs.org/) [![React](https://img.shields.io/badge/Frontend-ReactJS-blue.svg)](https://reactjs.org/) [![Chart.js](https://img.shields.io/badge/Charts-Chart.js-orange.svg)](https://www.chartjs.org/) [![Docker](https://img.shields.io/badge/Docker-Compatible-blue.svg)](https://www.docker.com/) [![License](https://img.shields.io/github/license/yourusername/stockmarket.svg)](LICENSE)

A responsive **Stock Market Dashboard** web application for tracking company stock prices, historical trends, and key statistics.  
Features include interactive charts, company selection panel, and real-time updates for 1-day view.  
52-week high and low values are calculated using **closing prices** to maintain consistency and avoid discrepancies from intraday price fluctuations.

---

## 📌 Features
- **Clean, responsive UI** with a left panel for selecting companies and a main chart display area
- **Real-time 1-day updates** (auto-refresh every 60 seconds)
- **Multiple time ranges**: 1 Day, 7 Days, 1 Month, 6 Months, 1 Year
- **Stock statistics**:
  - 52-week high (based on closing price)
  - 52-week low (based on closing price)
  - Average trading volume over the past 52 weeks
- **Backend API** to fetch live data from Yahoo Finance
- **Docker-ready** for easy deployment

---

## 🛠 Technologies Used
- **Frontend**: ReactJS, Chart.js, chartjs-adapter-date-fns
- **Backend**: Node.js, Express, Yahoo Finance API
- **Styling**: CSS (custom styles)
- **Deployment**: Docker
- **Data Source**: Yahoo Finance (via `yahoo-finance2` npm package)

---

## 🚀 How to Get Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/stockmarket.git
cd stockmarket


2. Install dependencies
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd frontend
npm install
3. Run locally
Backend
bash
Copy
Edit
npm start
Frontend
bash
Copy
Edit
npm start
🐳 Docker-Ready
Build and run using Docker:

bash
Copy
Edit
docker build -t stockmarket-app .
docker run -p 5000:5000 stockmarket-app
📊 API Endpoints
Endpoint	Method	Description
/companies	GET	Get list of companies
/stock/:symbol?period=1m	GET	Get stock data for a symbol and time period

Available periods:

1d = 1 Day (1-minute interval)

7d = 7 Days (1-hour interval)

1m = 1 Month (1-day interval)

6m = 6 Months (1-day interval)

1y = 1 Year (1-week interval)

📈 Example Chart
When a company is selected, the chart displays historical price trends.
The backend calculates:

52-week high (closing price)

52-week low (closing price)

Average trading volume (last 52 weeks)

🤝 Contribution
This project is open source and contributions are welcome!

📜 License
This project is licensed under the MIT License – see the LICENSE file for details.

📌 Note
Future enhancements may include:

Technical indicators (RSI, MACD, Moving Averages, etc.)

AI-based stock price prediction

Multi-market support (BSE/NSE/NYSE/NASDAQ)