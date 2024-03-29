import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Deletebutton from "../Admin/Button/Deletebutton";
import OfficeEditButtonStudent from "./Button/OfficeEditButtonStudent.";
import OfficeStudentAddPage from "./Button/OfficeStudentAddPage";
import OfficeStudentFullAddPage from "./Button/OfficeStudentFullAddPage";
import { Stack } from "@mui/system";
import "../../App.css";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import { Button } from "@mui/material";
import DropFileStu from "../../uplaod/drop-file-input/DropFileStu";
import ReqDownloadHTML from "../Admin/Button/ReqDownloadHTML";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "user_id",
    numeric: false,
    disablePadding: false,
    label: "รหัสนิสิต",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "ชื่อ",
  },
  {
    id: "surname",
    numeric: true,
    disablePadding: false,
    label: "นามสกุล",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "E-Mail",
  },
  {
    id: "id_teacher",
    numeric: true,
    disablePadding: true,
    label: "อาจารย์ที่ปรึกษา",
  },
  {
    id: "mess",
    numeric: true,
    disablePadding: false,
    label: "สถานะ",
  },
  {
    id: "html_status",
    numeric: true,
    disablePadding: false,
    label: "สถานะไฟล์HTML",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "วันที่อัปโหลดไฟล์",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#e3e3e3" }}>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const onDownload3 = () => {
  fetch("http://localhost:5000/download-add-student-example-form", {
    method: "GET",
    headers: {
      "Content-Type": "./example/student_example.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `student_form.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h3"
        id="tableTitle"
        component="div"
        color="black"
      >
        รายชื่อนิสิต
      </Typography>
      <Button
        onClick={onDownload3}
        sx={{ width: "25%", height: "20%" }}
        variant="contained"
        color="primary"
      >
        ดาวน์โหลด ตัวอย่าง excel เพื่อเพิ่มรายชื่อนิสิต
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function OfficeAccStu() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [file, setfile] = useState(null);

  const [loading, setLoading] = React.useState(false);

  const token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-info-for-officer",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows(response.data.data);
      console.log(response.data.data.course_id);
    };
    api_();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Progess load={loading} />
      {console.log("loading", loading)}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.user_id}
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        {row.surname}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.teacher_name} {row.teacher_surname}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ display: "flex" }}>
                          {(() => {
                            if (row.mess === "ยังไม่ยืนยัน") {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "red",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>ยังไม่ยืนยัน</p>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>ยืนยันแล้ว</p>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {/* {row.html_status}
                        <br />({row.html_name}) */}

                        <div style={{ display: "flex" }}>
                          {(() => {
                            if (row.html_status === "ยังไม่อัปโหลด") {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "red",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>ยังไม่อัปโหลด</p>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <ReqDownloadHTML
                                    row={index}
                                    rows={rows}
                                    setRows={setRows}
                                    setLoading={setLoading}
                                  />
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {console.log("first", row.date_html)}
                        <div style={{ display: "flex" }}>
                          {(() => {
                            if (row.date_html === null) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "red",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <p>ยังไม่อัปโหลด</p>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                  }}
                                >
                                  {row.date_html}
                                  <br />
                                  {"เวลา "}
                                  {row.time}
                                  {" น."}
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            color: "green",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          <OfficeEditButtonStudent
                            row={index}
                            rows={rows}
                            setRows={setRows}
                            setLoading={setLoading}
                          />
                          <Deletebutton
                            row={index}
                            rows={rows}
                            setRows={setRows}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .css-vm1wus-MuiToolbar-root-MuiTablePagination-toolbar": {
              color: "black",
            },
          }}
        />{" "}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      <Stack className="layout" direction="row" spacing={5}>
        <OfficeStudentAddPage setLoading={setLoading} />
        <DropFileStu setLoading={setLoading} onFileChange={setfile} />
        {/* <StudentFullAddPage setLoading={setLoading} /> */}
      </Stack>
    </Box>
  );
}
