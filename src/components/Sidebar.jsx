import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ companies, selected, onSelect }) {
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="col-3 sidebar">
      {/* Header */}
      <div className="sidebar-header p-3 border-bottom">
        <h5 className="fw-bold mb-3">Companies</h5>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Company List */}
      <div className="company-list">
        {filteredCompanies.map((company, idx) => (
          <div
            key={idx}
            className={`sidebar-item ${selected?.symbol === company.symbol ? "active" : ""}`}
            onClick={() => onSelect(company)}
          >
            <div className="company-name">{company.name}</div>
            {/* <div className="company-symbol">{company.symbol}</div> */}
          </div>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="p-3 text-muted small">No results found</div>
        )}
      </div>
    </div>
  );
}
