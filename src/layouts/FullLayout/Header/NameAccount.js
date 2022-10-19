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
  const Account = (
    <div>
      {(() => {
        if (role === "admin") {
          if (lgUp) {
            return (
              <p
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  color: "white",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          }
        } else if (role === "officer") {
          if (lgUp) {
            return (
              <p
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          }
        } else if (role === "teacher") {
          if (lgUp) {
            return (
              <p
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          }
        } else {
          if (lgUp) {
            return (
              <p
                style={{
                  color: "#EEEEEE",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  margin: "10px",
                  marginLeft: "5px",
                  marginRight: "30px",
                  width: "80%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                }}
              >
                {name} {surname}
              </p>
            );
          }
        }
      })()}
    </div>
  );
  return <div>{Account}</div>;
}

export default NameAccount;
