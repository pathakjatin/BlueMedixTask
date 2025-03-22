import { Box, Typography } from "@mui/material";
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function HomePage(){
    return <>
    <section>
        <Box sx={{ width: '100%', maxWidth: 1300 }}>
            <Typography variant="h2" gutterBottom sx={{ marginBottom: 4, marginLeft:4, marginTop:4 }}>
                Frontend Development Task by BlueMedix
            </Typography>
            <List
      sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Website contains the following
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
        <Typography variant="h6">1</Typography>
        </ListItemIcon>
        <ListItemText primary="React Router based routing" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
        <Typography variant="h6">2</Typography>
        </ListItemIcon>
        <ListItemText primary="CRUD operations using Fake store api" />
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
        <Typography variant="h6">3</Typography>
        </ListItemIcon>
        <ListItemText primary="A dashboard" />
      </ListItemButton>
    </List>
        </Box>
    </section>
    </>
}