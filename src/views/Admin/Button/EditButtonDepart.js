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

export default function EditButtonDepart({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [departID, setdepartID] = useState("");
  const [department, setdepartment] = useState("");
  const [newid, setnewID] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmits = (event) => {
    setOpen(false);
    var data = {
      new_id: newid,
      depart_id: departID,
      department: department,
    };
    fetch("http://localhost:5000/edit-department", {
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
          console.log(result["message"]);
        }
      });
  };

  const handleClickOpen = () => {
    setdepartID(rows[row].depart_id);
    setdepartment(rows[row].department);
    setnewID(rows[row].depart_id);
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
            {"แก้ไขข้อมูลสาขาวิชา"}
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
                      label="รหัสสาขา"
                      defaultValue={departID}
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
                      defaultValue={department}
                      label="สาขา"
                      onChange={(e) => setdepartment(e.target.value)}
                      required
                    />
                  )}
                  name="department"
                  control={control}
                  defaultValue=""
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit">บันทึก</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
