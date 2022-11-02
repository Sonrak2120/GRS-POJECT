import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CheckButton from "./button/CheckButton";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#02bc77",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: "'Prompt', sans-serif;",
    "&:hover": {
      color: "#02bc77",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#02bc77",
      // backgroundColor: "#2f3337",
      borderRadius: "15px",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function DataStu() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [tab, setTab] = React.useState([]);
  const token = sessionStorage.getItem("token");

  console.log("tab", tab);
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-teacher-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setTab(response.data.data);
      setRows(response.data.data);
    };
    api_();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          style={{
            margin: "auto 0",
            flexGrow: "1",
            fontWeight: 500,
            marginTop :"20px"
          }}
        >
          รายชื่อนิสิตในที่ปรึกษา
        </Typography>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ bgcolor: "#fff", borderRadius: "15px" }}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            {tab.map((row, inx) => (
              <AntTab
                key={inx}
                label={
                  row.department.depart_id + "  " + row.department.depart_name
                }
              />
            ))}
          </AntTabs>
          <TabPanel value={value} index={value}>
            <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      รหัสนิสิต
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      ชื่อ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="left"
                    >
                      นามสกุล
                    </TableCell>

                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tab[value]?.std_in_depart.map((item, inx) => (
                    <TableRow
                      key={inx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#D7EAD9",
                          boxShadow: "0 0 3px 1px #525B53",
                        },
                      }}
                    >
                      <TableCell sx={{ width: "25%" }} align="center">
                        {item.std_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "25%" }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ width: "25%" }} align="left">
                        {item.surname}
                      </TableCell>

                      <TableCell sx={{ width: "25%" }} align="center">
                        <CheckButton
                          row={inx}
                          rows={rows}
                          setRows={setRows}
                          std_id={item.std_id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <Box sx={{ p: 3 }} />
        </Box>
      </Box>
    </div>
  );
}
