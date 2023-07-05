"use client";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import "./globals.css";

interface Item {
  name: string;
  source: string;
}

interface Section {
  title: string;
  items: Item[];
}

interface CardProps {
  header: string;
  sections: Section[];
}


export default function Home() {
  const cardsData = require("../api/tenant.json");


  const orderedSources = [
    "Illion",
    "Source1",
    "Source2",
    "Source3",
    "Google",
    "ZoomInfo",
  ];
  const orderedSections = [
    "Tenant Name",
    "Alternate Tenant Name",
    "Floor / Level Number",
    "Suite Number",
    "Street Address",
    "City",
    "State",
    "Postal Code",
    "Metro Area",
    "Country",
    "Website URL",
    "Email Address",
    "Phone Number",
    "ABN",
    "ACN",
    "SIC Code",
  ];

  const processedData: Record<
    string,
    Record<string, Record<string, string | number>>
  > = {};
  for (const id in cardsData) {
    const itemData = cardsData[id];

    processedData[id] = {};
    for (const section of orderedSections) {
      processedData[id][section] = {};
      for (const source of orderedSources) {
        processedData[id][section][source] = itemData[section][source] || "";
      }
    }
  }

  const tenantIds = Object.keys(processedData);
  const [currentTenantIndex, setCurrentTenantIndex] = useState(0); // Initialize with the first tenant

  const handlePrev = () => {
    setCurrentTenantIndex((oldIndex) => oldIndex - 1);
  };

  const handleNext = () => {
    setCurrentTenantIndex((oldIndex) => oldIndex + 1);
  };

  const getTenantName = (tenantData: any): string => {
    for (const source of orderedSources) {
      if (tenantData["Tenant Name"][source] !== "") {
        return tenantData["Tenant Name"][source];
      }
    }
    return "Unknown Tenant";
  };

  const currentTenantData = processedData[tenantIds[currentTenantIndex]];

  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    orderedSections.forEach((section) => {
      orderedSources.forEach((source) => {
        initialChecked[`${section}-${source}`] = false;
      });
    });
    return initialChecked;
  });

  useEffect(() => {
    const newChecked = { ...checked };
    Object.keys(newChecked).forEach((key) => {
      newChecked[key] = false;
    });
    setChecked(newChecked);
  }, [currentTenantIndex]);

  const handleCheckboxChange = (event, section, source) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [`${section}-${source}`]: event.target.checked,
    }));
  };

  return (
    <div className="layout">
      <div className="header">
        <div className="headerName">{getTenantName(currentTenantData)}</div>
        <div className="headerID">Tenant ID: {tenantIds[currentTenantIndex]}</div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={currentTenantIndex === 0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={currentTenantIndex === tenantIds.length - 1}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>

      
      <div className="content">
        <div className="table">
          <div className="table-row header-row">
            <div className="table-cell"></div>
            {orderedSources.map((source, index) => (
              <div className="table-cell" key={index}>
                {source}
              </div>
            ))}
          </div>
          {orderedSections.map((section, sectionIndex) => (
            <div className="table-row" key={sectionIndex}>
              <div className="table-cell stickyCell">
                {section}
              </div>
              {orderedSources.map((source, sourceIndex) => (
                <div className="table-cell" key={sourceIndex}>
                  <Checkbox
                    checked={checked[`${section}-${source}`]}
                    onChange={(event) =>
                      handleCheckboxChange(event, section, source)
                    }
                  />
                  {currentTenantData[section][source]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};


