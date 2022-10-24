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
import { useForm, Controller } from "react-hook-form";

export default function AlertDialog({ row, rows, setRows, setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [departID, setdepartID] = useState("");
  const [id, setID] = useState("");
  const [newid, setnewID] = useState("");
  const [courseid, setcourse] = useState("");
  const [teacherid, setteacherid] = useState("");
  const [email, setemail] = useState("");

  const [teachert2, setteachert2] = React.useState([]);

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
        url: "http://localhost:5000/get-teacher-info-for-dropdown",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setteachert2(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const [courset2, setcourset2] = React.useState([]);

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-course-info-for-dropdown",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setcourset2(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const handleSubmits = (event) => {
    setOpen(false);
    var data = {
      student_id: id,
      new_id: newid,
      name: name,
      surname: surname,
      depart_id: departID,
      course_id: courseid,
      teacher_id: teacherid,
      email: email,
    };
    fetch("http://localhost:5000/edit-data-student", {
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
          setOpen(false);
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          setOpen(false);
          alert("ล้มเหลว");
          console.log(result["error"]);
        }
      });
  };

  const handleClickOpen = () => {
    setname(rows[row].name);
    setsurname(rows[row].surname);
    setdepartID(rows[row].depart_id);
    setID(rows[row].user_id);
    setcourse(rows[row].course_id);
    setteacherid(rows[row].teacher_id);
    setemail(rows[row].email);
    setOpen(true);
    setnewID(rows[row].user_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    handleSubmits(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">
            {"แก้ไขข้อมูลนิสิต"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} justifyContent="center" alignItems={"center"}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ mt: "20px" }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      label="รหัสนิสิต"
                      defaultValue={id}
                      id="departID"
                      onChange={(e) => setnewID(e.target.value)}
                      required
                    />
                  )}
                  name="departID"
                  control={control}
                  defaultValue=""
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      id="name"
                      defaultValue={name}
                      label="ชื่อ"
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  )}
                  name="name"
                  control={control}
                  defaultValue=""
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      label="นามสกุล"
                      defaultValue={surname}
                      id="surname"
                      onChange={(e) => setsurname(e.target.value)}
                      required
                    />
                  )}
                  name="surname"
                  control={control}
                  defaultValue=""
                />
              </Stack>
              <Controller
                render={({ field: { onChange } }) => (
                  <Inputnew
                    sx={{ width: "450px" }}
                    label="E-mail"
                    defaultValue={email}
                    id="email"
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                )}
                name="email"
                control={control}
                defaultValue=""
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Box sx={{ width: "450px" }}>
                      <FormControl fullWidth>
                        <InputLabel>รหัสหลักสูตร</InputLabel>
                        <Select
                          value={courseid}
                          label="รหัสหลักสูตร"
                          onChange={(e) => setcourse(e.target.value)}
                          defaultValue={courset2}
                          required
                        >
                          {courset2.map((name) => (
                            <MenuItem
                              key={name.coutse_id}
                              value={name.coutse_id}
                            >
                              {name.coutse_id} {name.coutse_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  name="departID"
                  control={control}
                  defaultValue=""
                />

                {/* <Inputnew
                sx={{ width: "450px" }}
                id="courseid"
                defaultValue={courseid}
                label="รหัสหลักสูตร"
                onChange={(e) => setcourse(e.target.value)}
              /> */}
              </Stack>
              <Stack>
                <Controller
                  render={({ field: { onChange } }) => (
                    <Box sx={{ width: "450px" }}>
                      <FormControl fullWidth>
                        <InputLabel>รหัสอาจารย์ที่ปรึกษา</InputLabel>
                        <Select
                          value={teacherid}
                          label="รหัสอาจารย์ที่ปรึกษา"
                          onChange={(e) => setteacherid(e.target.value)}
                          defaultValue={teachert2}
                          required
                        >
                          {teachert2.map((name) => (
                            <MenuItem
                              key={name.teacher_id}
                              value={name.teacher_id}
                            >
                              {name.teacher_id} {name.teacher_name}{" "}
                              {name.teacher_surname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  name="teacherID"
                  control={control}
                  defaultValue=""
                />

                {/* <Inputnew
                sx={{ width: "450px" }}
                id="cteacherid"
                defaultValue={teacherid}
                label="รหัสอาจารย์ที่ปรึกษา"
                onChange={(e) => setteacherid(e.target.value)}
              /> */}
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit" setLoading={setLoading}>
              บันทึก
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
