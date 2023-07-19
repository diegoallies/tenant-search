"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? value : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, state);
    } catch (e) {
      console.log(e);
    }
  }, [state, key]);

  return [state, setState];
}

export default function TenantPage() {
  const [tenantData, setTenantData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useLocalStorage(
    "userFilter",
    "All"
  );

  const handleChange = (nextValue) => {
    setSearchTerm(nextValue);
    setCurrentPage(1);
  };
  const debouncedSave = useCallback(debounce(handleChange, 1000), []);

  const handleNext = useCallback(() => setCurrentPage((prev) => prev + 1), []);
  const handlePrevious = useCallback(
    () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1)),
    []
  );

  useEffect(() => {
    const cardsData = require("./api/new-tenant111.json");
    setTenantData(cardsData);
  }, []);

  const filteredTenants = useMemo(() => {
    return Object.keys(tenantData)
      .filter((key) => {
        if (selectedOption === "To Do") {
          console.log("to do");
          return true;
        } else if (selectedOption === "In Progress") {
          // Filter logic for In Progress
          console.log("to prog");
        } else if (selectedOption === "Completed") {
          // Filter logic for Completed
        } else {
          return true; // If selectedOption is "All"
        }
      })
      .filter((tenantId) => {
        const tenantName = getTenantName(tenantData[tenantId]);
        return (
          tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tenantId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [tenantData, searchTerm, selectedOption]);

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
            <div className="cardTitleBlock">
              <h2 className="card-title">
                {getTenantName(tenantData[tenantId])}
              </h2>
            </div>

            <p className="card-id">ID: {tenantId}</p>
            <Link legacyBehavior href={`/Tenant/${tenantId}`}>
              <a className="card-link">Details</a>
            </Link>
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
