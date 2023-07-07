"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import "./styles.css";
import Sidebar from './sidebar'; // adjust the path based on your project structure

const orderedSources = [
    "Illion",
    "Source1",
    "Source2",
    "Source3",
    "Google",
    "ZoomInfo",
];

const getTenantName = (tenantData) => {
  if (!tenantData) {
    console.error("Invalid tenant data!");
    return "Unknown Tenant";
  }

  for (const source of orderedSources) {
    if (tenantData["Tenant Name"][source] !== "") {
      return tenantData["Tenant Name"][source];
    }
  }
  return "Unknown Tenant";
};

export default function TenantPage() {
    const [tenantData, setTenantData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
      const cardsData = require("./api/tenant.json");
      setTenantData(cardsData);
    }, []);

    useEffect(() => {
        let results = Object.keys(tenantData).filter((tenantId) => {
          const tenantName = getTenantName(tenantData[tenantId]);
          return tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || tenantId.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Filtering logic based on the filter state
        if(filter === "In Progress"){
          results = results.filter(tenantId => localStorage.getItem('tenantData') && JSON.parse(localStorage.getItem('tenantData'))[tenantId] < 5);
        } else if(filter === "Completed"){
          results = results.filter(tenantId => localStorage.getItem('tenantData') && JSON.parse(localStorage.getItem('tenantData'))[tenantId] >= 5);
        }

        setSearchResults(results);
      }, [searchTerm, tenantData, filter]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
    };

    return (
        <div className="container">
          <Sidebar handleFilter={handleFilter} />
          <h1 className="title">All Tenants</h1>
          <input 
            className="input"
            type="text" 
            placeholder="Search Tenants" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <div className="grid-container">
            {searchResults.map((tenantId, index) => (
              <div key={index} className="card">
                <div>
                  <h2 className="card-title">{getTenantName(tenantData[tenantId])}</h2>
                  <p className="card-id">ID: {tenantId}</p>
                </div>
                <div>
                  <Link legacyBehavior  href={`/Tenant/${tenantId}`}>
                    <a className="card-link">Details</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}
