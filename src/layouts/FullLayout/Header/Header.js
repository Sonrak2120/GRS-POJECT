import React from "react";
//import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";

import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
import Logout from "@material-ui/icons/Logout";

import NameAccount from "./NameAccount";

import Typography from "@mui/material/Typography";

import userimg from "../../../assets/images/users/user.jpg";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Stack,
  useMediaQuery,
  Paper,
} from "@material-ui/core";

const onClickLogout = async () => {
  sessionStorage.clear();
  window.location.assign("/");
};

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const headerContent = (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={props.toggleMobileSidebar}
        sx={{
          display: {
            lg: "none",
            xs: "inline",
          },
        }}
      >
        <MenuOutlinedIcon width="20" height="20" />
      </IconButton>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ position: "absolute", left: "36%" }}
      >
        <Typography variant="h3" align="center" m="auto" alignItems={"center"}>
          Graduation Requirements System
        </Typography>
        <Typography variant="h4">ระบบตรวจสอบการจบการศึกษา</Typography>
      </Stack>
      <Box flexGrow={1} />
      {/* <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <NotificationsNoneOutlinedIcon width="20" height="20" />
        </IconButton> */}
      {/* <NameAccount /> */}
      {/* ------------------------------------------- */}
      {/* End Notifications Dropdown */}
      {/* ------------------------------------------- */}
      {/* ------------------------------------------- */}
      {/* Profile Dropdown */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          width: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          height: "25px",
          ml: 1,
        }}
      ></Box>

      {(() => {
        if (lgUp) {
          return (
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  // src={userimg}
                  // alt={userimg}
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: "5px",
                  }}
                />
                <NameAccount />
              </Box>
            </Button>
          );
        } else {
          return (
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  // src={userimg}
                  // alt={userimg}
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: "5px",
                  }}
                />
              </Box>
            </Button>
          );
        }
      })()}

      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
            right: 0,
            top: "70px !important",
            backgroundColor: "#e2e0e0",
            borderBlockColor: "black",
          },
        }}
      >
        <MenuItem
          onClick={handleClose4}
          sx={{
            backgroundColor: "#2f3337",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          <Avatar
            sx={{
              width: "35px",
              height: "35px",
            }}
          />
          <Box
            sx={{
              ml: 2,
            }}
          >
            <NameAccount />
          </Box>
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose4}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={onClickLogout}
          sx={{
            "&:hover": {
              backgroundColor: "#F65C5C",
              boxShadow: "0 0 3px 1px #525B53",
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Toolbar>
  );
  if (lgUp) {
    return (
      <AppBar sx={props.sx} elevation={0}>
        {headerContent}
      </AppBar>
    );
  }
  return (
    <AppBar sx={props.sx} elevation={0}>
      {headerContent}
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "#85888e",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderRadius: "0",
        }}
      >
        <NameAccount />
      </Paper>
    </AppBar>
  );
};

export default Header;
