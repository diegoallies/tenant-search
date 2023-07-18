"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import "./styles.css";
import Sidebar from "./sidebar";
import debounce from "lodash.debounce";

const ORDERED_SOURCES = [
  "Illion",
  "Google",
  "ZoomInfo",
  "WebScraping",
  "ABNLookup",
];
const TENANTS_PER_PAGE = 21;

function getTenantName(tenantData) {
  const tenantFields = tenantData?.fields?.["Tenant Name"];
  for (const source of ORDERED_SOURCES) {
    if (
      tenantFields[source] &&
      tenantFields[source].length > 0 &&
      tenantFields[source][0] !== ""
    ) {
      return tenantFields[source][0];
    }
  }
  return "No Name Available";
}

export default function TenantPage() {
  const [tenantData, setTenantData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (nextValue) => {
    setSearchTerm(nextValue);
    setCurrentPage(1);
  };
  const debouncedSave = useCallback(
    debounce((nextValue) => handleChange(nextValue), 1000),
    []
  );
  const handleNext = useCallback(() => setCurrentPage((prev) => prev + 1), []);
  const handlePrevious = useCallback(
    () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1)),
    []
  );

  useEffect(() => {
    const cardsData = require("./api/new-tenant111.json");
    setTenantData(cardsData);
  }, []);

  const filteredTenants = Object.keys(tenantData).filter((tenantId) => {
    const tenantName = getTenantName(tenantData[tenantId]);
    return (
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenantId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const tenantsToShow = filteredTenants.slice(
    (currentPage - 1) * TENANTS_PER_PAGE,
    currentPage * TENANTS_PER_PAGE
  );

  return (
    <div className="container">
      <Sidebar />
      <h1 className="title">All Tenants</h1>
      <input
        className="input"
        type="text"
        placeholder="Search Tenants"
        onChange={(e) => debouncedSave(e.target.value)}
      />
      <div className="grid-container">
        {tenantsToShow.map((tenantId, index) => (
          <div key={index} className="card">
            <div>
              <h2 className="card-title">
                {getTenantName(tenantData[tenantId])}
              </h2>
              <p className="card-id">ID: {tenantId}</p>
            </div>
            <div>
              <Link
                legacyBehavior
                prefetch={false}
                href={`/Tenant/${tenantId}`}
              >
                <a className="card-link">Details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={filteredTenants.length <= currentPage * TENANTS_PER_PAGE}
        >
          Next
        </button>
      </div>
    </div>
  );
}
