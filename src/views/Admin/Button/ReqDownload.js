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
  const [couseID, setcouseID] = useState("");
  const [pdfname, setpdfname] = useState("");

  const handleClickOpen = () => {
    setcouseID(rows[row].course_id);
    setpdfname(rows[row].pdf_name);
    setOpen(true);
  };

  console.log("first---------", couseID);

  const handleClose = () => {
    setOpen(false);
  };

  const handledownload = async () => {
    setOpen(false);
    fetch("http://localhost:5000/download-course-pdf", {
      method: "GET",
      headers: {
        id: couseID,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `course.pdf`);

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
        อัปโหลดสำเร็จ <br />({rows[row].pdf_name})
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
