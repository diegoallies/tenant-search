"use client";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import "./styles.css";

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

export default function aboutparams({ params }: any) {
  const router = useRouter();

  // return (
  //     <div>
  //         <h1>
  //             test page params : { params.id }
  //         </h1>
  //     </div>
  // )

  const paramId = params.id;

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
  //   const [currentTenantIndex, setCurrentTenantIndex] = useState({paramId}); // Initialize with the first tenant
  const [currentTenantIndex, setCurrentTenantIndex] = useState(paramId);

  const handlePrev = () => {
    if (paramId < Number(tenantIds.length) - 1) {
      router.push(`/Tenant/${Number(paramId) - 1}`);
    }
  };
  const handleNext = () => {
    if (paramId < Number(tenantIds.length) - 1) {
      router.push(`/Tenant/${Number(paramId) + 1}`);
    }
  };

  const handleHome = () => {
    router.push(`/Tenant/`);
  };

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
        <Button variant="contained" color="primary" onClick={handleHome}>
          Home
        </Button>

        <div className="headerContainer">
          <div className="headerName">{getTenantName(currentTenantData)}</div>
          <div className="headerID">
            Tenant ID: {tenantIds[currentTenantIndex]}
          </div>
        </div>

        <div className="headerButtons">
          <Button
            variant="contained"
            color="primary"
            disabled={paramId == 0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            disabled={paramId == tenantIds.length - 1}
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
              <div className="table-cell stickyCell">{section}</div>
              {orderedSources.map((source, sourceIndex) => (
                <div className="table-cell" key={sourceIndex}>
                  <Checkbox
                    checked={checked[`${section}-${source}`]}
                    onChange={(event) =>
                      handleCheckboxChange(event, section, source)
                    }
                  />
                  {currentTenantData &&
                  currentTenantData[section] &&
                  currentTenantData[section][source]
                    ? currentTenantData[section][source]
                    : "N/A"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
