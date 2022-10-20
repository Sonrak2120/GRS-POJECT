import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
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

export default function OfficerAddPage({ setLoading }) {
  const [open, setOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");

  const [rows, setrows] = React.useState([]);

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
      setrows(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false);
    event.preventDefault();
    var data = {
      name: name,
      surname: surname,
      email: email,
      depart_id: departID,
    };
    fetch("http://localhost:5000/create-officer-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          setLoading(false);
          alert("กรุณาแจ้งผู้ใช้ให้ยืนยันตัวตนที่หน้าเข้าสู่ระบบ");
          window.location.reload("Refresh");
        } else {
          setLoading(false);
          alert("ผิดพลาด");
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [departID, setdepartID] = useState("");
  // const [password, setpassword] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        textAlign: "center",
      }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        เพิ่มผู้ใช้
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
          {"เพิ่มบัญชีผู้ใช้ของเจ้าหน้าที่/ผู้ดูแล"}
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems={"center"}
            marginTop={"10px"}
          >
            <Inputnew
              sx={{ width: "450px" }}
              id="name"
              label="ชื่อ"
              onChange={(e) => setname(e.target.value)}
            />
            <Inputnew
              sx={{ width: "450px" }}
              label="นามสกุล"
              id="surname"
              onChange={(e) => setsurname(e.target.value)}
            />

            <Inputnew
              sx={{ width: "450px" }}
              id="email"
              label="E-mail"
              autoComplete="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <Box sx={{ width: "450px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">รหัสสาขา</InputLabel>
                <Select
                  // id="departID"
                  label="รหัสสาขา"
                  onChange={(e) => setdepartID(e.target.value.dept_id)}
                >
                  {rows.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name.dept_id} {name.dept_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* <Inputnew
                sx={{ width: "450px" }}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setpassword(e.target.value)}
              /> */}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              {/* <Inputnew
            sx={{ width: "450px" }}
            id="teacherID"
            label="รหัสอาจารย์"
            onChange={(e) => setteacherID(e.target.value)}
          /> */}

              {/* <Inputnew
                sx={{ width: "450px" }}
                label="รหัสสาขา"
                id="departID"
                onChange={(e) => setdepartID(e.target.value)}
              /> */}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleSubmit} autoFocus>
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
