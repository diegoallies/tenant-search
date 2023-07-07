'use client'

import React, { useState, useEffect } from "react";
import Sidebar from '../sidebar';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import mockRouter from 'next-router-mock';
import DialogActions from "@mui/material/DialogActions";

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
  const [currentTenantIndex, setCurrentTenantIndex] = useState(paramId);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({});

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
    setChecked((prevChecked) => {
      const newChecked = {
        ...prevChecked,
        [`${section}-${source}`]: event.target.checked,
      };

      setSelectedData((prevSelectedData) => {
        const newSelectedData = { ...prevSelectedData };
        if (event.target.checked) {
          newSelectedData[`${section}-${source}`] = currentTenantData[section][source];
        } else {
          delete newSelectedData[`${section}-${source}`];
        }
        return newSelectedData;
      });

      return newChecked;
    });
  };

  const handleSave = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    const selectedCount = Object.keys(selectedData).length;

    // Always use a fixed key, e.g., 'tenantData'
    let tenantData = JSON.parse(localStorage.getItem('tenantData') || '{}');

    // Get the tenant ID from the tenantIds array
    let tenantId = tenantIds[paramId];
    
    // Store selectedCount as the value for each tenantId
    tenantData[tenantId] = selectedCount;
    
    localStorage.setItem('tenantData', JSON.stringify(tenantData));

    setOpenDialog(false);
};



  return (
    <div className="layout">
       <Sidebar />
      <div className="header">
        <Button
          variant="contained"
          color="primary"
          disabled={paramId === 0}
          onClick={handlePrev}
          className="header-button"
        >
          <span className="buttonIcon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="buttonText">Prev</span>
        </Button>
        <div className="headerContainer">
          <div className="headerName">{getTenantName(currentTenantData)}</div>
          <div className="headerID">
            Tenant ID: {tenantIds[currentTenantIndex]}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={paramId === tenantIds.length - 1}
          onClick={handleNext}
          className="header-button"
        >
          <span className="buttonText">Next</span>
          <span className="buttonIcon">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          className="header-button"
        >
          Save
        </Button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm your selection"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.entries(selectedData).map(([key, value], index) => (
              <p key={index} className="dialog-content-text">{`${key}: ${value}`}</p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
