import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form"; //copy

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Inputnew from "../../../components/Inputnew";
import Stack from "@mui/material/Stack";
import Progess from "../../../layouts/FullLayout/Sidebar/Progess";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import axios from "axios";

export default function AddDepartment({ setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  //copy
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmits = (value) => {
    setLoading(true);
    setOpen(false);

    var data = {
      depart_id: value?.departID,
      department: value?.department,
    };
    fetch("http://localhost:5000/add-department", {
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
          alert("บันทึกเสร็จสิ้น");
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

  //copy
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
        เพิ่มสาขา
      </Button>
      <Dialog
        maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* copy */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">{"เพิ่มสาขาวิชา"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} justifyContent="center" alignItems={"center"}>
              <Stack
                //   direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ mt: 5 }}
              >
                {/* copy แป */}
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextField
                      sx={{ width: "450px" }}
                      id="departID"
                      label="รหัสสาขา"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                    />
                  )}
                  name="departID"
                  control={control}
                  defaultValue=""
                />

                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      id="department"
                      label="สาขา"
                      onChange={(e) => {
                        onChange(e);
                      }}
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
            <Button type="submit">เพิ่ม</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
