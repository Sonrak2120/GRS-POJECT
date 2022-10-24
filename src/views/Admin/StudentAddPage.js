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
import Inputnew from "../../components/Inputnew";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";

export default function StudentAddPage({ setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [rows, setrows] = React.useState([]);
  const [rows2, setrows2] = React.useState([]);
  const [nameT, setnameT] = React.useState([]);
  const [nameST, setnameST] = React.useState([]);
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
      setrows(response.data.data);

      console.log(response.data.data);
    };
    api_();
  }, []);

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
      setrows2(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const handleSubmits = (event) => {
    setLoading(true);
    setOpen(false);
    var data = {
      std_id: stdID,
      name: name,
      surname: surname,
      email: email,
      course_id: courseID,
      coutse_name: coursename,
      teacher_id: teacherID,
      teacher_name: nameT,
      teacher_surname: nameST,
    };
    fetch("http://localhost:5000/create-single-student-info", {
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
  const [coursename, setcoursename] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [courseID, setcourseID] = useState("");
  const [teacherID, setteacherID] = useState("");
  const [stdID, setstdID] = useState("");

  // const [password, setpassword] = useState("");
  console.log(courseID);
  console.log(teacherID);

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
        เพิ่มบัญชีนิสิต
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
            {"เพิ่มบัญชีผู้ใช้ของนิสิต"}
          </DialogTitle>
          <DialogContent>
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems={"center"}
              marginTop={"10px"}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
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
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ mt: 5 }}
              >
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
                      label="รหัสนิสิต"
                      id="stdID"
                      onChange={(e) => setstdID(e.target.value)}
                      required
                    />
                  )}
                  name="stdID"
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
                    <Box sx={{ width: "450px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          อาจารย์ที่ปรึกษา
                        </InputLabel>
                        <Select
                          // id="departID"
                          label="อาจารย์ที่ปรึกษา"
                          onChange={(e) =>
                            setteacherID(e.target.value.teacher_id)
                          }
                          required
                        >
                          {rows2.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name.teacher_id}
                              {"-"}
                              {name.teacher_name} {name.teacher_surname}
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
                id="teacherID"
                label="รหัสอาจารย์"
                onChange={(e) => setteacherID(e.target.value)}
              /> */}
                <Controller
                  render={({ field: { onChange } }) => (
                    <Box sx={{ width: "450px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          รหัสหลักสูตร
                        </InputLabel>
                        <Select
                          // id="departID"
                          label="รหัสหลักสูตร"
                          onChange={(e) =>
                            setcourseID(e.target.value.coutse_id)
                          }
                          required
                        >
                          {rows.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name.coutse_id}
                              {"-"}
                              {name.coutse_name}
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
                label="รหัสหลักสูตร"
                id="courseID"
                onChange={(e) => setcourseID(e.target.value)}
              /> */}
              </Stack>
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
