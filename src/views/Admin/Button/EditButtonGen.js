import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Typography } from "@mui/material";

export default function EditButtonGen({ row, rows, setRows, setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [genID, setgenID] = useState("");
  const [genname, setdgenname] = useState("");
  const [exlname, setexlname] = useState("");
  const [id, setid] = useState("");

  const [filecourse, setfilecourse] = useState("");
  const handleUploadxlxs = (e) => {
    const filecourse = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilecourse(filecourse);
    };
    reader.readAsDataURL(filecourse);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmits = async (event) => {
    setLoading(true);
    setOpen(false);
    let headersList = {
      Accept: "*/*",
    };
    let bodyContent = new FormData();
    bodyContent.append("gen_name", genname);
    bodyContent.append("gen_id", genID);
    bodyContent.append("file_course", filecourse);
    bodyContent.append("id", id);

    let response = await fetch("http://localhost:5000/edit-general", {
      method: "PUT",
      headers: headersList,
      body: bodyContent,
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
        }
      });
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filecourse);
    a.download = filecourse.name;
    a.click();
  };

  const handleClickOpen = () => {
    setgenID(rows[row].gen_id);
    setdgenname(rows[row].gen_name);
    setid(rows[row].id);

    setexlname(rows[row].filename);
    setOpen(true);
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
            {"แก้ไขข้อมูลรายวิชา"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ mt: "20px" }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      label="รหัสเล่มศึกษาทั่วไป"
                      defaultValue={genID}
                      id="genID"
                      onChange={(e) => setgenID(e.target.value)}
                      required
                    />
                  )}
                  name="genID"
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
                      id="genname"
                      defaultValue={genname}
                      label="ชื่อเล่มศึกษาทั่วไป"
                      onChange={(e) => setdgenname(e.target.value)}
                      required
                    />
                  )}
                  name="genname"
                  control={control}
                  defaultValue=""
                />
              </Stack>

              <Box className="box2">
                <p style={{ color: "red" }}>*ไฟล์ xlxs เพื่อเพิ่มหลักสูตร</p>

                <Button
                  style={{ minWidth: "100%", marginTop: "16px" }}
                  variant="contained"
                  component="label"
                >
                  เลือกไฟล์
                  <input
                    hidden
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    multiple
                    type="file"
                    onChange={handleUploadxlxs}
                  />
                </Button>
                <div style={{ display: "flex" }}>
                  {(() => {
                    if (filecourse == "") {
                      return (
                        <div
                          style={{
                            display: "flex",
                            color: "red",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "auto",
                            marginTop: "16px",
                          }}
                        >
                          <Typography
                            style={{
                              color: "green",
                              fontSize: "15px",
                              marginTop: "2px",
                            }}
                          >
                            ( ไฟล์ล่าสุด : {exlname} )
                          </Typography>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          style={{
                            // display: "flex",
                            color: "green",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "auto",
                            marginTop: "16px",
                          }}
                        >
                          {" "}
                          {filecourse && (
                            <div
                              style={{
                                // display: "flex",
                                color: "green",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                                marginTop: "16px",
                              }}
                            >
                              <Button
                                onClick={handledownload}
                                variant="outlined"
                              >
                                {"ตรวจสอบไฟล์ : "}
                                {filecourse.name}
                              </Button>
                              <Typography style={{ marginTop: "16px" }}>
                                {" "}
                                {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                {filecourse.lastModifiedDate
                                  .toString()
                                  .substring(0, 25)}
                              </Typography>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })()}
                </div>
              </Box>

              <br />
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
