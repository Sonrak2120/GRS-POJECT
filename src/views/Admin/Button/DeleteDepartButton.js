import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { pink } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DeleteDepartButton({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [id, setID] = useState("");
  const handleSubmit = async () => {
    const headerlist = {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    };
    const bodylist = {
      depart_id: id,
    };
    try {
      const delt = await axios({
        method: "put",
        url: "http://127.0.0.1:5000/del-department",
        data: bodylist,
        headers: headerlist,
      });

      const temp = rows;
      // console.log(temp.filter((v,i)=>i!=row))
      setRows([...temp.filter((v, i) => i != row)]);
      setOpen(false);
      console.log(delt.data);
    } catch {}
  };

  const handleClickOpen = () => {
    setID(rows[row].depart_id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        sx={{ m: "2px auto", width: 50 }}
      >
        ลบ
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle
          onClose={handleClose}
          sx={{
            backgroundColor: "#F65C5C",
            color: "#fff",
            fontFamily: "Kanit",
            textAlign: "center",
            fontSize: "26px",
            height: "65px",
          }}
        ></BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{ width: "500px!important", height: "150px!important" }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item sx={{ m: "auto" }}>
              <PriorityHighIcon sx={{ fontSize: 70, color: pink[500] }} />
            </Grid>
          </Grid>
          <Typography align="center" color="error" sx={{ fontFamily: "Kanit" }}>
            ต้องการลบข้อมูลสาขาหรือไม่?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#D7D7D7" }}>
          <Button
            autoFocus
            color="error"
            variant="contained"
            onClick={handleSubmit}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
