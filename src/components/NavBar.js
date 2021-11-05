import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
  return (
    <div>
      <AppBar position="relative" stye={{ backgroundColor: "purple" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Word App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
