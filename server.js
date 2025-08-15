import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";

const app = express();
// app.use(cors());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use(express.json());

const PORT = 5000;

// Mock company list (can later come from DB)
const companies = [
  { name: "Infosys", symbol: "INFY.NS" },
  { name: "Tata Consultancy Services", symbol: "TCS.NS" },
  { name: "Reliance Industries", symbol: "RELIANCE.NS" },
  { name: "HDFC Bank", symbol: "HDFCBANK.NS" },
  { name: "ICICI Bank", symbol: "ICICIBANK.NS" },
  { name: "State Bank of India", symbol: "SBIN.NS" },
  { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK.NS" },
  { name: "Axis Bank", symbol: "AXISBANK.NS" },
  { name: "Adani Enterprises", symbol: "ADANIENT.NS" },
  { name: "Adani Ports", symbol: "ADANIPORTS.NS" },
  { name: "Bajaj Finance", symbol: "BAJFINANCE.NS" },
  { name: "Bajaj Finserv", symbol: "BAJAJFINSV.NS" },
  { name: "ITC Limited", symbol: "ITC.NS" },
  { name: "Larsen & Toubro", symbol: "LT.NS" },
  { name: "Mahindra & Mahindra", symbol: "M&M.NS" },
  { name: "Maruti Suzuki", symbol: "MARUTI.NS" },
  { name: "Hindustan Unilever", symbol: "HINDUNILVR.NS" },
  { name: "Asian Paints", symbol: "ASIANPAINT.NS" },
  { name: "UltraTech Cement", symbol: "ULTRACEMCO.NS" },
  { name: "Power Grid Corporation", symbol: "POWERGRID.NS" },
  { name: "Tata Steel", symbol: "TATASTEEL.NS" },
  { name: "JSW Steel", symbol: "JSWSTEEL.NS" },
  { name: "Coal India", symbol: "COALINDIA.NS" },
  { name: "NTPC Limited", symbol: "NTPC.NS" },
  { name: "Oil and Natural Gas Corp", symbol: "ONGC.NS" },
  { name: "Bharti Airtel", symbol: "BHARTIARTL.NS" },
  { name: "Vodafone Idea", symbol: "IDEA.NS" },
  { name: "Paytm", symbol: "PAYTM.NS" },
  { name: "Policybazaar", symbol: "POLICYBZR.NS" }
];


// Get company list
app.get("/companies", (req, res) => {
  res.json(companies);
});




// app.get("/stock/:symbol", async (req, res) => {
//   try {
//     console.log("Entered into the function");
//     const symbol = req.params.symbol;
//     const queryOptions = { period1: "2024-01-01", interval: "1d" };

//     const historical = await yahooFinance.historical(symbol, queryOptions);

//     const chartData = historical.map(item => ({
//       date: item.date.toISOString().split("T")[0],
//       open: item.open,
//       high: item.high,
//       low: item.low,
//       close: item.close
//     }));



//     const last52Weeks = historical.slice(-252);
//     const high52 = Math.max(...last52Weeks.map(d => d.close));
//     const low52 = Math.min(...last52Weeks.map(d => d.close));
//     const avgVolume = Math.round(
//       last52Weeks.reduce((sum, d) => sum + (d.volume || 0), 0) / last52Weeks.length
//     );

//     const responseData = {
//       chart: chartData,
//       stats: {
//         high52,
//         low52,
//         avgVolume
//       },
//       indicators: {}
//     };

//     // 📌 Print to terminal so you can check the data
//     console.log("Stock Data for:", symbol);
//     console.log(JSON.stringify(responseData, null, 2));

//     res.json(responseData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch stock data" });
//   }
// });




// app.get("/stock/:symbol", async (req, res) => {
//   try {
//     const symbol = req.params.symbol;

//     // Current time and 1 day ago (in seconds)
//     const period2 = Math.floor(Date.now() / 1000);
//     const period1 = period2 - 60 * 60 * 24; // 24 hours ago

//     const result = await yahooFinance.chart(symbol, {
//       period1,
//       period2,
//       interval: "1m"
//     });

//     const chartData = result.quotes.map(item => ({
//       date: item.date,
//       open: item.open,
//       high: item.high,
//       low: item.low,
//       close: item.close
//     }));

//     res.json({
//       chart: chartData,
//       meta: result.meta
//     });

//   } catch (error) {
//     console.error("Error fetching minute data:", error);
//     res.status(500).json({ error: "Failed to fetch minute data" });
//   }
// });








// app.get("/stock/:symbol", async (req, res) => {
//   try {
//     const symbol = req.params.symbol;
//     const periodQuery = req.query.period || "1d";

//     let interval = "1d";
//     let period1;
//     const period2 = Math.floor(Date.now() / 1000); // now in seconds

//     switch (periodQuery) {
//       case "1d":
//         interval = "1m"; // minute data
//         period1 = period2 - 60 * 60 * 24;
//         break;
//       case "7d":
//         interval = "1h";
//         period1 = period2 - 60 * 60 * 24 * 7;
//         break;
//       case "1m":
//         interval = "1d";
//         period1 = period2 - 60 * 60 * 24 * 30;
//         break;
//       case "6m":
//         interval = "1d";
//         period1 = period2 - 60 * 60 * 24 * 30 * 6;
//         break;
//       case "1y":
//         interval = "1d";
//         period1 = period2 - 60 * 60 * 24 * 365;
//         break;
//       default:
//         interval = "1d";
//         period1 = period2 - 60 * 60 * 24;
//     }

//     const result = await yahooFinance.chart(symbol, {
//       period1,
//       period2,
//       interval
//     });

//     const chartData = result.quotes.map(item => ({
//       date: item.date,
//       open: item.open,
//       high: item.high,
//       low: item.low,
//       close: item.close
//     }));

//     res.json({ chart: chartData, meta: result.meta });
//   } catch (error) {
//     console.error("Error fetching stock data:", error);
//     res.status(500).json({ error: "Failed to fetch stock data" });
//   }
// });






app.get("/stock/:symbol", async (req, res) => {
  try {
    console.log("Entered into the function");

    const symbol = req.params.symbol;
    const range = req.query.period || "1d"; // default 1 year

    // Set start date and interval based on range
    let period1, interval;
    const today = new Date();

    switch (range) {
      case "7d": {
        const start = new Date();
        start.setDate(today.getDate() - 7);
        period1 = Math.floor(start.getTime() / 1000);
        interval = "1d";
        break;
      }
      case "1m": {
        const start = new Date();
        start.setMonth(today.getMonth() - 1);
        period1 = Math.floor(start.getTime() / 1000);
        interval = "1d";
        break;
      }
      case "6m": {
        const start = new Date();
        start.setMonth(today.getMonth() - 6);
        period1 = Math.floor(start.getTime() / 1000);
        interval = "1d";
        break;
      }
      case "1y":
      default: {
        const start = new Date();
        start.setFullYear(today.getFullYear() - 1);
        period1 = Math.floor(start.getTime() / 1000);
        interval = "1d";
        break;
      }
    }

    const queryOptions = {
      period1,
      period2: Math.floor(today.getTime() / 1000),
      interval
    };

    const historical = await yahooFinance.historical(symbol, queryOptions);

    const chartData = historical.map(item => ({
      date: item.date.toISOString().split("T")[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close
    }));

    // Calculate 52-week stats only if we have enough data
    const last52Weeks = historical.slice(-252);
    const high52 = Math.max(...last52Weeks.map(d => d.close));
    const low52 = Math.min(...last52Weeks.map(d => d.close));
    const avgVolume = Math.round(
      last52Weeks.reduce((sum, d) => sum + (d.volume || 0), 0) / last52Weeks.length
    );

    const responseData = {
      chart: chartData.reverse(), // reverse to oldest first
      stats: { high52, low52, avgVolume },
      indicators: {}
    };

    console.log("Stock Data for:", symbol, "Range:", range);
    res.json(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});





app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
