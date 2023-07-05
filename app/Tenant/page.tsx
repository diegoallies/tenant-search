"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import "./styles.css";

const orderedSources = [
    "Illion",
    "Source1",
    "Source2",
    "Source3",
    "Google",
    "ZoomInfo",
  ];

const getTenantName = (tenantData: any): string => {
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
  
    useEffect(() => {
      const cardsData = require("./api/tenant.json");
      setTenantData(cardsData);
    }, []);
  
    useEffect(() => {
        const results = Object.keys(tenantData).filter((tenantId) => {
          const tenantName = getTenantName(tenantData[tenantId]);
          return tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || tenantId.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(results);
      }, [searchTerm, tenantData]);
  
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
  
   
    return (
        <div className="container">
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
                  {/* <p className="card-details">{getTenantName(tenantData[tenantId])}</p> */}
                </div>
                
                <div>
                  <Link legacyBehavior href={`/Tenant/${index}`}>
                    <a className="card-link">Details</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
   );
  }
  