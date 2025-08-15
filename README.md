# Stock Market Dashboard Web Application Documentation

## 1. Introduction

This document provides comprehensive technical documentation for the Stock Market Dashboard Web Application, developed as an internship assignment for JarNox. The application is designed to provide users with a clean, responsive interface to view real-time stock market data and historical trends for various companies. It demonstrates proficiency in full-stack web development, API integration, and data visualization.

## 2. Project Overview

The Stock Market Dashboard is a web-based application that allows users to:

- Browse a list of companies.
- Select a company to view its historical stock price data.
- Visualize stock data using interactive charts.
- Access key stock statistics such as 52-week high/low and average trading volume.

The application is built with a clear separation of concerns, utilizing a ReactJS frontend for dynamic user interaction and a Node.js Express backend for serving stock data.

## 3. Architecture

The application follows a client-server architecture, comprising a frontend and a backend component.

### 3.1 Frontend (Client-Side)

The frontend is a single-page application (SPA) developed using **ReactJS**. It is responsible for:

- Presenting the user interface, including the company list and the stock chart.
- Handling user interactions, such as company selection and time range filtering.
- Making API requests to the backend to fetch stock data.
- Rendering stock data using **Chart.js** for interactive visualizations.
- Ensuring responsiveness across various devices using **Bootstrap** for styling.

Key technologies used in the frontend:
- **ReactJS**: A JavaScript library for building user interfaces.
- **Chart.js**: A flexible JavaScript charting library for displaying data.
- **chartjs-adapter-date-fns**: Adapter for Chart.js to handle date-based data.
- **Axios**: A promise-based HTTP client for making API requests.
- **Bootstrap**: A popular CSS framework for responsive and mobile-first front-end web development.
- **Vite**: A fast build tool for modern web projects.

### 3.2 Backend (Server-Side)

The backend is a **Node.js** application built with the **Express.js** framework. Its primary responsibilities include:

- Exposing RESTful API endpoints for the frontend to consume.
- Fetching real-time and historical stock data from external sources.
- Processing and formatting stock data before sending it to the frontend.
- Providing a list of supported companies.

Key technologies used in the backend:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **yahoo-finance2**: A library for fetching financial data from Yahoo Finance.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### 3.3 Data Flow

1.  The frontend (React app) loads and displays the initial company list by making a GET request to the `/companies` endpoint of the backend.
2.  When a user selects a company from the list, the frontend sends a GET request to the `/stock/:symbol` endpoint, optionally including a `period` query parameter for the desired time range.
3.  The backend receives the request, uses the `yahoo-finance2` library to fetch the corresponding stock data from Yahoo Finance.
4.  The fetched data is processed (e.g., calculating 52-week high/low, average volume) and then sent back to the frontend as a JSON response.
5.  The frontend receives the JSON data and updates the Chart.js visualization and relevant statistics in the main panel.

## 4. Setup and Installation

To set up and run the Stock Market Dashboard locally, follow these steps:

### 4.1 Prerequisites

Ensure you have the following installed on your system:

-   **Node.js** (version 14 or higher recommended)
-   **npm** (Node Package Manager, usually comes with Node.js)
-   **Git** (for cloning the repository)

### 4.2 Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone <repository_url>
cd stockmarket
```

### 4.3 Backend Setup

Navigate into the `backend` directory, install the necessary Node.js dependencies, and start the server:

```bash
cd backend
npm install
npm start
```

The backend server will start and listen on `http://localhost:5000`. You should see a message like `✅ Server running on http://localhost:5000` in your terminal.

### 4.4 Frontend Setup

Open a **new terminal window** (keep the backend server running in the first terminal). Navigate back to the root `stockmarket` directory, install frontend dependencies, and start the development server:

```bash
cd .. # If you are currently in the backend directory
npm install
npm run dev
```

The frontend development server will start, typically on `http://localhost:5173` (the exact port might vary). You should see a message indicating the URL where the application is running.

## 5. Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  On the left side of the dashboard, you will see a scrollable list of company names.
3.  Click on any company name from the list. The main panel will update to display the historical stock price chart for the selected company.
4.  Below the chart, you will find key statistics such as the 52-week high, 52-week low, and average trading volume.
5.  You can select different time ranges (7 Days, 1 Month, 6 Months, 1 Year) to view historical data over various periods.

## 6. API Endpoints

The backend provides the following RESTful API endpoints:

### 6.1 Get Company List

-   **Endpoint:** `/companies`
-   **Method:** `GET`
-   **Description:** Retrieves a list of all supported companies with their names and stock symbols.
-   **Response:**
    ```json
    [
      { "name": "Infosys", "symbol": "INFY.NS" },
      { "name": "Tata Consultancy Services", "symbol": "TCS.NS" },
      // ... more companies
    ]
    ```

### 6.2 Get Stock Data

-   **Endpoint:** `/stock/:symbol`
-   **Method:** `GET`
-   **Description:** Retrieves historical stock data for a specified company symbol.
-   **URL Parameters:**
    -   `symbol`: The stock symbol of the company (e.g., `INFY.NS`).
-   **Query Parameters:**
    -   `period` (Optional): The time range for the historical data. Valid values are `7d` (7 Days), `1m` (1 Month), `6m` (6 Months), `1y` (1 Year). Defaults to `1y` if not provided.
-   **Example Request:**
    ```
    GET /stock/INFY.NS?period=1m
    ```
-   **Response:**
    ```json
    {
      "chart": [
        {
          "date": "YYYY-MM-DD",
          "open": 123.45,
          "high": 125.67,
          "low": 122.10,
          "close": 124.50
        },
        // ... more historical data points
      ],
      "stats": {
        "high52": 150.00,
        "low52": 100.00,
        "avgVolume": 1234567
      },
      "indicators": {}
    }
    ```

## 7. Implementation Details

### 7.1 Frontend Components

-   **`App.jsx`**: The main application component that orchestrates the layout and state management.
-   **`CompanyList.jsx`**: Displays the scrollable list of company names. It handles fetching the company list from the backend and notifying `App.jsx` when a company is selected.
-   **`ChartComponent.jsx`**: Responsible for rendering the stock price chart using Chart.js. It receives stock data as props and updates the chart accordingly.

### 7.2 Backend Logic (`server.js`)

-   **Company List**: The `companies` array in `server.js` serves as a mock database for company names and symbols. In a production environment, this would typically be fetched from a persistent database.
-   **Stock Data Fetching**: The `/stock/:symbol` endpoint uses `yahoo-finance2` to query Yahoo Finance for historical data. It dynamically adjusts the `period1` (start date) and `interval` parameters based on the `period` query parameter received from the frontend.
-   **52-Week Statistics**: The backend calculates the 52-week high, 52-week low, and average trading volume from the fetched historical data before sending it to the frontend. This offloads computation from the client and ensures consistent data processing.

## 8. Future Enhancements

As outlined in the README, several enhancements can be made to this application:

-   **Database Integration**: Replace the mock company list with a persistent database (e.g., PostgreSQL, SQLite) for better data management and scalability.
-   **User Authentication and Watchlists**: Implement user login/registration and allow users to create personalized watchlists.
-   **Advanced Technical Indicators**: Integrate more technical analysis indicators (e.g., RSI, MACD, Moving Averages) into the charts.
-   **AI-based Prediction**: Develop and integrate machine learning models for stock price prediction.
-   **Real-time Data Streaming**: Utilize WebSockets to provide real-time stock price updates instead of periodic polling.
-   **Multi-market Support**: Extend the application to support stock exchanges beyond India (e.g., NYSE, NASDAQ).
-   **Deployment and Dockerization**: Prepare the application for production deployment by containerizing it with Docker and deploying to cloud platforms like Render, Railway, or Vercel.

## 9. Conclusion

This Stock Market Dashboard Web Application successfully fulfills the requirements of the JarNox internship assignment, showcasing a solid understanding of modern web development practices, API integration, and data visualization. The modular design and clear architecture make it extensible and maintainable for future enhancements.

