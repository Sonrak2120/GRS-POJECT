import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import {
  AppBar,
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
} from "@material-ui/core";

function NameAccount() {
  const token = sessionStorage.getItem("token");
  const [name, setName] = React.useState([]);
  const [surname, setSurname] = React.useState([]);
  const [role, setrole] = React.useState([]);
  const [id, setid] = React.useState([]);
  const [depart, setdepart] = React.useState([]);

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
      setdepart(response.data.depart_id);
      // console.log(response.data);
    };
    api_();
  }, []);
  const Account = (
    <div>
      {(() => {
        if (role === "admin") {
          if (lgUp) {
            return (
              <div>
                <Typography
                  style={{
                    color: "#EEEEEE",
                    fontSize: "20px",
                    margin: "10px",
                    marginLeft: "15px",
                    marginRight: "30px",
                    width: "80%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    wordWrap: "break-word",
                  }}
                >
                  {name} {surname}
                </Typography>
                {/* <Typography style={{backgroundColor:"pink",borderRadius:"20px",color:"black",alignItems:"center",textAlign:"center",justifyContent:"center"}}>ผู้ดูแลระบบ</Typography> */}
              </div>
            );
          } else {
            return (
              <Typography
                style={{
                  color: "white",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          }
        } else if (role === "officer") {
          if (lgUp) {
            return (
              <Typography
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          } else {
            return (
              <Typography
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          }
        } else if (role === "teacher") {
          if (lgUp) {
            return (
              <Typography
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          } else {
            return (
              <Typography
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          }
        } else {
          if (lgUp) {
            return (
              <Typography
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </Typography>
            );
          } else {
            return (
              <Typography
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "15px",
                  marginRight: "30px",
                  width: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                  // backgroundColor: "pink",
                }}
              >
                {name} {surname}
              </Typography>
            );
          }
        }
      })()}
    </div>
  );
  return <div>{Account}</div>;
}

export default NameAccount;
