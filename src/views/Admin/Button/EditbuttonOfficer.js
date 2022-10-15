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

export default function EditbuttonOfficer({ row, rows, setRows, setLoading }) {
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

  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [Email, setemail] = useState("");
  const [departID, setdepartID] = useState("");
  const [id, setID] = useState("");
  const [password, setpassword] = useState("");
  // console.log(rows[row].name)
  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false);
    event.preventDefault();
    var data = {
      officer_id: id,
      name: name,
      surname: surname,
      email: Email,
      depart_id: departID,
    };
    fetch("http://localhost:5000/edit-data-officer", {
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
          setLoading(false);
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          setLoading(false);
          alert("ล้มเหลว");
          console.log(result["error"]);
        }
      });
  };

  const handleClickOpen = () => {
    setname(rows[row].name);
    setsurname(rows[row].surname);
    setemail(rows[row].email);
    setdepartID(rows[row].depart_id);
    setID(rows[row].user_id);
    console.log("eoejm");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "80px" }}>
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
          {"แก้ไขข้อมูลเจ้าหน้าที่"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} justifyContent="center" alignItems={"center"}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ mt: 5 }}
            >
              {/* <Inputnew
                sx={{ width: "450px" }}
                id="email"
                label="E-mail"
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
              /> */}
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
              {/* <Inputnew
                sx={{ width: "450px" }}
                label="รหัสสาขา"
                id="departID"
                defaultValue={departID}
                onChange={(e) => setdepartID(e.target.value)}
              /> */}
              {/* <Inputnew
                sx={{ width: "450px" }}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setpassword(e.target.value)}
              /> */}
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                id="name"
                defaultValue={name}
                label="ชื่อ"
                onChange={(e) => setname(e.target.value)}
              />
            </Stack>
            <Inputnew
              sx={{ width: "450px" }}
              label="นามสกุล"
              defaultValue={surname}
              id="surname"
              onChange={(e) => setsurname(e.target.value)}
            />
            {/* <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                label="รหัสสาขา"
                id="departID"
                onChange={(e) => setdepartID(e.target.value)}
              />
            </Stack> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleSubmit} autoFocus>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
