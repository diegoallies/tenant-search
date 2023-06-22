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

const App: React.FC = () => {
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
    <Grid container className="gridContainer">
      <Grid container className="fixed">
        <Grid item xs={12} className="header">
          <div className="headerName">{getTenantName(currentTenantData)}</div>
          <div className="headerID">
            Tenant ID: {tenantIds[currentTenantIndex]}
          </div>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
      <div className="spacetaker"></div>
      <Grid container item>
        <Grid item xs={1} className="stickyCell" /> {/* Change here */}
        {orderedSources.map((source, index) => (
          <Grid item xs={2} className="stickyCell" key={index}>
            {source}
          </Grid>
        ))}
      </Grid>
      {orderedSections.map((section, sectionIndex) => (
        <Grid container item key={sectionIndex}>
          <Grid item xs={1} className="stickyCell">
            {section}
          </Grid>
          {orderedSources.map((source, sourceIndex) => (
            <Grid item xs={2} className="gridCell" key={sourceIndex}>
              <Checkbox
                checked={checked[`${section}-${source}`]}
                onChange={(event) =>
                  handleCheckboxChange(event, section, source)
                }
              />
              {currentTenantData[section][source]}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
