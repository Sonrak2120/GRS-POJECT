import React, { useEffect } from "react";
import axios from "axios";
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
  const token = sessionStorage.getItem("token");
  const [name, setName] = React.useState([]);
  const [surname, setSurname] = React.useState([]);
  const [role, setrole] = React.useState([]);
  const [id, setid] = React.useState([]);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      };

      let reqOptions = {
        url: "http://localhost:5000/get-current-user-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setName(response.data.name);
      setSurname(response.data.surname);
      setrole(response.data.role);
      setid(response.data.user_id);
      // console.log(response.data);
    };
    api_();
  }, []);

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
            ><Stack>
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
                /><Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              ><Stack><NameAccount />
               {(() => {
        if (role === "admin") {
          return (
            <Typography style={{backgroundColor:"#02BC77",borderRadius:"20px",color:"black",alignItems:"center",textAlign:"center",justifyContent:"center"}}>ผู้ดูแลระบบ</Typography>
          );
        } else if (role === "officer") {
          return (
            <Typography style={{backgroundColor:"#2f3337",borderRadius:"20px",color:"white",alignItems:"center",textAlign:"center",justifyContent:"center"}}>เจ้าหน้าที่</Typography>
          );
        }else if (role === "teacher") {
          return (
            <Typography style={{backgroundColor:"#2f3337",borderRadius:"20px",color:"white",alignItems:"center",textAlign:"center",justifyContent:"center"}}>อาจารย์ที่ปรึกษา</Typography>
          );
        }else if (role === "student") {
          return (
            <Typography style={{backgroundColor:"#2f3337",borderRadius:"20px",color:"white",alignItems:"center",textAlign:"center",justifyContent:"center"}}>นิสิต</Typography>
          );
        }else  {
          return (
            <></>
          );
        }
      })()}</Stack></Box>
                
              </Box>
              
              </Stack>
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
      <div>
      <AppBar sx={props.sx} elevation={0}>
        {headerContent}
      </AppBar>
      
      </div>
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
