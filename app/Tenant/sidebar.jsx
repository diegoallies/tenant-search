'use client'

import React from 'react';
import { Drawer, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Sidebar = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer}>Toggle Sidebar</Button>
      <Drawer open={isOpen} onClose={toggleDrawer}>
        <List>
          {['To Do', 'In Progress', 'Completed'].map((text, index) => (
            <ListItem button key={text} onClick={() => handleFilter(text)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
