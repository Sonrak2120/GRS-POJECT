import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";

export default function Pdfbutton({ setLoading }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handledownload = () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    fetch("http://127.0.0.1:5000/download-file", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      },
    })
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = "Requirment_Check";
        a.click();
        setLoading(false);
      });
  };

  return (
    <div>
      <IconButton onClick={handledownload}>
        <LocalPrintshopIcon sx={{ height: "25px", width: "25px" }} />
      </IconButton>
    </div>
  );
}
