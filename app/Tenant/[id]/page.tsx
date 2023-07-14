"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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

export default function Tenant({ params }: any) {
  const router = useRouter();

  const paramId = params.id;
  const cardsData = require("../api/new-tenant111.json");

  const orderedSources = [
    "Illion",
    "Google",
    "ZoomInfo",
    "WebScraping",
    "ABNLookup",
    "notes",
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
        processedData[id][section][source] =
          itemData.fields[section] &&
          itemData.fields[section][source] &&
          itemData.fields[section][source].length > 0
            ? itemData.fields[section][source]
            : [""];
      }
    }
  }

  const tenantIds = Object.keys(processedData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handlePrev = () => {
    const prevIdIndex = tenantIds.indexOf(paramId) - 1;
    if (prevIdIndex >= 0) {
      const prevId = tenantIds[prevIdIndex];
      router.push(`/Tenant/${prevId}`);
    }
  };

  const handleNext = () => {
    const nextIdIndex = tenantIds.indexOf(paramId) + 1;
    if (nextIdIndex < tenantIds.length) {
      const nextId = tenantIds[nextIdIndex];
      router.push(`/Tenant/${nextId}`);
    }
  };

  const handleCheckboxChange = (event, section, source, idx) => {
    const key = `${section}-${source}-${idx}`;
    setChecked((prevChecked) => {
      const newChecked = {
        ...prevChecked,
        [key]: event.target.checked,
      };
      setSelectedData((prevSelectedData) => {
        const newSelectedData = { ...prevSelectedData };
        if (event.target.checked) {
          newSelectedData[key] = currentTenantData[section][source][idx];
        } else {
          delete newSelectedData[key];
        }
        return newSelectedData;
      });
      return newChecked;
    });
  };

  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    orderedSections.forEach((section) => {
      orderedSources.forEach((source) => {
        processedData[paramId][section][source].forEach((item, idx) => {
          initialChecked[`${section}-${source}-${idx}`] = false;
        });
      });
    });
    return initialChecked;
  });

  const currentTenantData = processedData[paramId];

  const getTenantName = (tenantData: any): string => {
    if (!tenantData) {
      console.error("Invalid tenant data!");
      return "Unknown Tenant";
    }

    for (const source of orderedSources) {
      if (
        tenantData["Tenant Name"] &&
        tenantData["Tenant Name"][source] !== ""
      ) {
        return tenantData["Tenant Name"][source];
      }
    }
    return "Unknown Tenant";
  };

  useEffect(() => {
    const newChecked = { ...checked };
    Object.keys(newChecked).forEach((key) => {
      newChecked[key] = false;
    });
    setChecked(newChecked);
  }, [paramId]);

  const handleSave = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    let tenantData = JSON.parse(localStorage.getItem("tenantData") || "{}");
    tenantData[paramId] = selectedData;
    localStorage.setItem("tenantData", JSON.stringify(tenantData));
    setOpenDialog(false);
  };
  return (
    <div className="layout">
      <div className="header">
        <Button
          variant="contained"
          color="primary"
          disabled={tenantIds.indexOf(paramId) === 0}
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
          <div className="headerID">Tenant ID: {paramId}</div>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={tenantIds.indexOf(paramId) === tenantIds.length - 1}
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
        <DialogTitle id="alert-dialog-title">
          {"Confirm your selection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.entries(selectedData).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
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
            {Object.keys(currentTenantData[orderedSections[0]]).map(
              (key, index) => (
                <div className="table-cell" key={index}>
                  {key}
                </div>
              )
            )}
          </div>
          {orderedSections.map((section, sectionIndex) => (
            <div className="table-row" key={sectionIndex}>
              <div className="table-cell stickyCell">{section}</div>
              {Object.keys(currentTenantData[section]).map(
                (source, sourceIndex) => (
                  <div className="table-cell" key={sourceIndex}>
                    {currentTenantData[section][source] &&
                      currentTenantData[section][source].map((item, idx) => (
                        <div key={idx}>
                          <Checkbox
                            checked={checked[`${section}-${source}-${idx}`]}
                            onChange={(event) =>
                              handleCheckboxChange(event, section, source, idx)
                            }
                          />
                          {item ? item : "N/A"}
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
