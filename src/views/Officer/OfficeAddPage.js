import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Inputnew from "../../components/Inputnew";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";

export default function OfficeAddPage({ setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  const [rows, setrows] = React.useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleSubmits = (event) => {
    // setLoading(true);
    setOpen(false);
    var data = {
      teacher_id: teacherID,
      name: name,
      surname: surname,
      email: email,
      depart_id: departID,
    };
    fetch("http://localhost:5000/create-teacher-info-for-officer", {
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
          // setLoading(false);
          alert("กรุณาแจ้งผู้ใช้ให้ยืนยันตัวตนที่หน้าเข้าสู่ระบบ");
          window.location.reload("Refresh");
        } else {
          // setLoading(false);
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
  const [teacherID, setteacherID] = useState("");
  // const [password, setpassword] = useState("");

  const onSubmit = (data) => {
    handleSubmits(data);
  };

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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">
            {"เพิ่มบัญชีผู้ใช้ของอาจารย์"}
          </DialogTitle>
          <DialogContent>
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems={"center"}
              mt={"20px"}
            >
              <Controller
                render={({ field: { onChange } }) => (
                  <Inputnew
                    sx={{ width: "450px" }}
                    id="name"
                    label="ชื่อ"
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                )}
                name="name"
                control={control}
                defaultValue=""
              />

              <Controller
                render={({ field: { onChange } }) => (
                  <Inputnew
                    sx={{ width: "450px" }}
                    label="นามสกุล"
                    id="surname"
                    onChange={(e) => setsurname(e.target.value)}
                    required
                  />
                )}
                name="surname"
                control={control}
                defaultValue=""
              />

              <Controller
                render={({ field: { onChange } }) => (
                  <Inputnew
                    sx={{ width: "450px" }}
                    id="email"
                    label="E-mail"
                    autoComplete="email"
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                )}
                name="email"
                control={control}
                defaultValue=""
              />

              <Controller
                render={({ field: { onChange } }) => (
                  <Inputnew
                    sx={{ width: "450px" }}
                    id="teacherID"
                    label="รหัสอาจารย์"
                    onChange={(e) => setteacherID(e.target.value)}
                    required
                  />
                )}
                name="teacherID"
                control={control}
                defaultValue=""
              />
              {/* <Controller
                render={({ field: { onChange } }) => (
                  <Box sx={{ width: "450px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        รหัสสาขา
                      </InputLabel>
                      <Select
                        // id="departID"
                        label="รหัสสาขา"
                        onChange={(e) => setdepartID(e.target.value.dept_id)}
                        required
                      >
                        {rows.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name.dept_id}
                            {"-"}
                            {name.dept_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}
                name="departID"
                control={control}
                defaultValue=""
              /> */}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit">เพิ่ม</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
