"use client";
import React from "react";
import { Drawer, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/system";

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    zIndex: 'auto',
    width: '280px',
  },
  '& .MuiBackdrop-root': {
     backgroundColor: 'transparent',
  },
});


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
        <StyledDrawer open={isOpen} onClose={toggleSidebar}>
        <List>
          {['To Do', 'In Progress', 'Completed'].map((text, index) => (
            <ListItem button key={text} onClick={toggleSidebar}> {/*Close the Sidebar when an item is clicked*/}
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </StyledDrawer>
    </div>
  );
}

export default Sidebar;