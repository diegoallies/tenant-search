"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from './page.module.css';
import Sidebar from "./sidebar";
import debounce from "lodash.debounce";

const ORDERED_SOURCES = [
  "Illion",
  "Google",
  "ZoomInfo",
  "WebScraping",
  "ABNLookup",
];
const TENANTS_PER_PAGE = 20;

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
  let parsedValue = defaultValue;
  try {
    if (typeof window !== "undefined" && window.localStorage.getItem(key))
      parsedValue = JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    console.log('useLocalStorage err:', e);
  }

  const [state, setState] = useState(parsedValue);

  // The use of 'useEffect' is causing the loop so we will
  // use 'useCallback' which won't trigger on every rerender
  const safelySetState = useCallback(
    (newValue) => {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(state) : newValue;
        setState(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (e) {
        console.error(`Error setting state with key "${key}" to localStorage.`);
      }
    },
    [key]
  );

  return [state, safelySetState];
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
    <div className={styles.container}>
      <h1 className={styles.title}>All Tenants</h1>
      {/* Other elements... */}
      <div className={styles.pagination}>
        <button
          className={styles['pagination-btn']}
          onClick={handlePrevious}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
  
        <input
          className={styles.input}
          type="text"
          placeholder="Search Tenants"
          onChange={(e) => debouncedSave(e.target.value)}
        /> 
  
        <button
          className={styles['pagination-btn']}
          onClick={handleNext}
          disabled={filteredTenants.length <= currentPage * TENANTS_PER_PAGE}
        >
          Next
        </button>
      </div>
  
      <div className={styles['table-layout']}>
        {tenantsToShow.map((tenantId, index) => (
          <div key={index} className={styles['table-row']}>
            <p className={styles['table-cell']}>{getTenantName(tenantData[tenantId])}</p>
            <p className={styles['table-cell']}>ID: {tenantId}</p>
            <Link legacyBehavior href={`/Tenant/${tenantId}`}>
              <a className={styles['table-cell']}>Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
