import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ReqDownload({ row, rows, setRows, setLoading }) {
  const [open, setOpen] = React.useState(false);
  const [genID, setgenID] = useState("");
  const [pdfname, setxlxname] = useState("");

  const handleClickOpen = () => {
    setgenID(rows[row].gen_id);
    setxlxname(rows[row].filename);
    setOpen(true);
  };

  console.log("first---------", rows);

  const handleClose = () => {
    setOpen(false);
  };

  const handledownload = async () => {
    setOpen(false);
    fetch("http://localhost:5000/download-gen-excel", {
      method: "GET",
      headers: {
        id: genID,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `general${genID}.xlsx`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="text">
        อัปโหลดสำเร็จ <br />({rows[row].filename})
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ fontSize: "21px", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
          ดาวโหลด
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ต้องการดาวน์โหลด หรือไม่
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"danger"}>
            ยกเลิก
          </Button>
          <Button onClick={handledownload} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
