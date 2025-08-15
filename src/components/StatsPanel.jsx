import React from "react";

export default function StatsPanel({ selected, stats, todayPrice }) {
  if (!stats || !selected) return null;

  // Function to calculate today's price position in the bar
  const getPricePosition = () => {
    if (!stats.low52 || !stats.high52 || !todayPrice) return 0;
    const range = stats.high52 - stats.low52;
    if (range <= 0) return 0;
    return ((todayPrice - stats.low52) / range) * 100;
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold mb-3">
        {selected?.name} — 52 Week Range
      </h5>
      <br />
      <br />

      {/* Horizontal Price Bar with Labels */}
      <div className="position-relative" style={{ height: "70px" }}>

        {/* Low Price Label */}
        <div
          className="position-absolute start-0 small fw-bold text-primary"
          style={{ transform: "translateY(-100%)" }}
        >
          52 Week Low<br />₹{stats.low52?.toFixed(2)}
        </div>

        {/* High Price Label */}
        <div
          className="position-absolute end-0 small fw-bold text-danger"
          style={{ transform: "translateY(-100%)" }}
        >
          52 Week High<br />₹{stats.high52?.toFixed(2)}
        </div>

        {/* Bar Background */}
        <div
          className="w-100 rounded-pill"
          style={{
            height: "10px",
            marginTop: "25px",
            background: "linear-gradient(to right, #dc3545, #ffc107, #28a745)"
          }}
        ></div>


        {/* Today's Price Marker */}
        <div
          className="position-absolute text-center"
          style={{
            left: `${getPricePosition()}%`,
            top: "32px",
            transform: "translateX(-50%)",
          }}
        >
          {/* Arrow */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "12px solid blue",
              margin: "0 auto",
            }}
          ></div>

          {/* Text */}
          <div className="small mt-1 fw-bold">
            Today<br />₹{todayPrice?.toFixed(2)}
          </div>
        </div>

      </div>

      {/* Average Volume */}
      <div className="mt-4">
        <p className="mb-0">
          <strong>Average Volume:</strong> {stats.avgVolume?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
