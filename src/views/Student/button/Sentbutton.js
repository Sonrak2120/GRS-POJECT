import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Pdfbutton from "./Pdfbutton";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography, styled } from "@mui/material";

export default function Sentbutton({ setLoading }) {
  const [open, setOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const [result, setResult] = useState("");
  const [ispass, setispass] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const api = async () => {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({});

      let reqOptions = {
        url: "http://localhost:5000/get-require-status",
        method: "GET",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data.status);
      setispass(response.data.status);
    };
    api();
  }, []);

  const handlesent = async () => {
    try {
      fetch("http://127.0.0.1:5000/require-to-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result["message"] === "success") {
            alert("ส่งข้อมูลไปให้อาจารย์ที่ปรึกษาแล้ว");
            window.location.reload("Refresh");
          } else if (
            result["message"] === "(np)re-send success" ||
            result["message"] === "(p)re-send success"
          ) {
            alert("ส่งคำขอใหม่เรียบร้อย");
            window.location.reload("Refresh");
          } else if (result["message"] === "already sent a requirement") {
            alert("คุณส่งคำขอไปแล้ว");
          }
        });
    } catch {}
  };

  return (
    <Stack direction="row" spacing={2}>
      {(() => {
        if (ispass === "") {
          return (
            <Button
              onClick={handlesent}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              sx={{ width: "150px", display: "flex", flex: 1 }}
            >
              ยื่นตรวจ
            </Button>
          );
        } else if (ispass === "CHECK") {
          return (
            <div
              style={{
                display: "flex",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "green",
                width: 180,
                height: 50,
                borderRadius: 20,
                // webkitTextStroke: "0.5px #fff",
              }}
            >
              <p>รอการตรวจสอบ</p>
            </div>
          );
        } else if (ispass === "NOT PASS") {
          return (
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handlesent}
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                sx={{
                  width: "150px",
                  flex: 1,
                  m: "auto",
                }}
              >
                ยื่นตรวจใหม่
              </Button>
              <div
                style={{
                  display: "flex",
                  color: "red",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p>"ไม่ผ่าน" กรุณาตรวจสอบแล้วยื่นส่งใหม่อีกครั้ง</p>
              </div>
            </div>
          );
        } else {
          return (
            <Box
              style={{
                color: "green",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography style={{ margin: 10 }}>
                ผ่านเเล้ว สามารถรับไฟล์ PDF ได้
              </Typography>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pdfbutton setLoading={setLoading} />
              </Box>
            </Box>
          );
        }
      })()}
    </Stack>
  );
}
