"use client";

import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/system";

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    zIndex: "auto",
    width: "280px",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
});

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // A new function which is called when a ListItem is clicked
  const onSelectItem = (selectedText) => {
    toggleSidebar();
    window.localStorage.setItem('userFilter', selectedText);  // Set selected filter in local storage
  };

  return (
    <StyledDrawer open={isOpen} onClose={toggleSidebar}>
      <List>
        {["To Do", "In Progress", "Completed"].map((text, index) => (
          <ListItem button key={text} onClick={() => onSelectItem(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
export default Sidebar;