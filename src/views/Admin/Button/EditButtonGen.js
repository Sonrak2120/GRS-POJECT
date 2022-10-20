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

export default function EditButtonGen({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [genID, setgenID] = useState("");
  const [genname, setdgenname] = useState("");
  const [newid, setnewID] = useState("");

  const handleSubmit = (event) => {
    setOpen(false);
    event.preventDefault();
    var data = {
      new_id: newid,
      gen_id: genID,
      gen_name: genname,
    };
    fetch("http://localhost:5000/edit-general", {
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
    setgenID(rows[row].gen_id);
    setdgenname(rows[row].gen_name);
    setnewID(rows[row].gen_id);
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
          {"แก้ไขข้อมูลรายวิชา"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} justifyContent="center" alignItems={"center"}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ mt: "20px" }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                label="รหัสเล่มศึกษาทั่วไป"
                defaultValue={genID}
                id="genID"
                onChange={(e) => setnewID(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                id="genname"
                defaultValue={genname}
                label="ชื่อเล่มศึกษาทั่วไป"
                onChange={(e) => setdgenname(e.target.value)}
              />
            </Stack>
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
