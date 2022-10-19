import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Inputnew from "../../../components/Inputnew";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function EditButtonCouse({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [departID, setdepartID] = useState("");

  const [newid, setnewID] = useState("");

  const [couseID, setcouseID] = useState("");
  const [cousename, setcousename] = useState("");

  const [dept, setdept] = React.useState([]);

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-department-info-for-dropdown",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setdept(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const [filepdf, setfilepdf] = useState({});
  const [filecourse, setfilecourse] = useState({});

  const handleSubmit = (event) => {
    setOpen(false);
    event.preventDefault();
    var data = {
      new_id: newid,
      course_id: couseID,
      course_name: cousename,
      depart_id: departID,
      file_pdf: filepdf,
      file_course: filecourse,
    };
    fetch("http://localhost:5000/edit-upload-course-pdf", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          alert("ล้มเหลว");
          console.log(result["error"]);
        }
      });
  };

  const handleClickOpen = () => {
    setdepartID(rows[row].depart_id);
    setnewID(rows[row].user_id);
    setcouseID(rows[row].course_id);
    setcousename(rows[row].course_name);
    setfilepdf(rows[row].file_pdf);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "80px" }}>
      {dept !== [] && (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            แก้ไข
          </Button>
          <Dialog
            maxWidth="30"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // sx={{  minWidth:"100vh",minHeight: "100vh",backgroundColor: 'primary.dark',}}
          >
            <DialogTitle id="alert-dialog-title">
              {"แก้ไขข้อมูลอาจารย์"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} justifyContent="center" alignItems={"center"}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                  sx={{ mt: "20px" }}
                ></Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Inputnew
                    sx={{ width: "450px" }}
                    id="couseID"
                    defaultValue={couseID}
                    label="รหัสหลักสูตร"
                    onChange={(e) => setnewID(e.target.value)}
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Inputnew
                    sx={{ width: "450px" }}
                    label="cousename"
                    defaultValue={cousename}
                    id="หลักสูตร"
                    onChange={(e) => setcousename(e.target.value)}
                  />
                </Stack>
                <Box sx={{ width: "450px" }}>
                  <FormControl fullWidth>
                    <InputLabel>รหัสสาขา</InputLabel>
                    {console.log("dept=", dept, "depart=", departID)}
                    <Select
                      value={departID}
                      label="รหัสสาขา"
                      onChange={(e) => {
                        setdepartID(e.target.value);
                      }}
                      defaultValue={dept}
                    >
                      {dept.map((name) => (
                        <MenuItem key={name.dept_id} value={name.dept_id}>
                          {name.dept_id} {name.dept_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ยกเลิก</Button>
              <Button onClick={handleSubmit} autoFocus>
                บันทึก
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
