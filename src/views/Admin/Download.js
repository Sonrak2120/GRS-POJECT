import React from "react";
import { Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import EmbeddedImage from "../../assets/images/EmbeddedImage.png";

const onDownload1 = () => {
  fetch("http://localhost:5000/download-add-student-form", {
    method: "GET",
    headers: {
      "Content-Type": "./form/student_form.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `student_form.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

const onDownload3 = () => {
  fetch("http://localhost:5000/download-add-student-example-form", {
    method: "GET",
    headers: {
      "Content-Type": "./example/student_example.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `student_form.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

const onDownload2 = () => {
  fetch("http://localhost:5000/download-add-subject-example-form", {
    method: "GET",
    headers: {
      "Content-Type": "./example/subject_example.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `subject_form.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

const onDownload4 = () => {
  fetch("http://localhost:5000/download-add-gen-example-form", {
    method: "GET",
    headers: {
      "Content-Type": "./example/subject_gen64.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `subject_gen64.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};

const Download = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Typography
        sx={{
          alignItem: "center",
          display: "flex",
          justifyContent: "center",
        }}
        color={"rgba(0,102,102,1)"}
        fontSize={"45pt"}
      >
        เอกสาร
      </Typography>
      <Stack
        container
        justifyContent="center"
        marginTop={8}
        direction="row"
        minHeight={"60vh"}
        spacing={"5%"}
      >
        <Box>
          <Box
            component="img"
            src={EmbeddedImage}
            sx={{ width: "100%" }}
            // mt="5rem!important"
            // mb="2rem!important"
          />
        </Box>
        <Grid>
          <Typography color={"rgba(0,102,102,1)"} fontSize={"34pt"}>
            เอกสารสำหรับเจ้าหน้าที่
          </Typography>
          <Typography
            sx={{
              m: "20px",
            }}
            fontSize={"14pt"}
          >
            <strong>ตัวอย่าง</strong> เอกสารสำหรับเจ้าหน้าที่
            เพื่อเป็นแบบอย่างในการกรอกแบบฟอร์มเพื่อเพิ่มรายชื่อนิสิต
          </Typography>
          <Box
            sx={{
              alignItem: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={onDownload3} variant="contained" color="primary">
              ดาวน์โหลด ตัวอย่างเพื่อเพิ่มรายชื่อนิสิต
            </Button>
          </Box>
          <Typography
            sx={{
              m: "20px",
            }}
            fontSize={"14pt"}
          >
            <strong>ตัวอย่าง</strong> เอกสารสำหรับเจ้าหน้าที่
            เพื่อเป็นแบบอย่างในการกรอกแบบฟอร์มเพื่อเพิ่มหลักสูตร
          </Typography>
          <Box
            sx={{
              alignItem: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={onDownload2} variant="contained" color="primary">
              ดาวน์โหลด ตัวอย่างเพื่อเพิ่มหลักสูตร
            </Button>
          </Box>
          <Typography
            sx={{
              m: "20px",
            }}
            fontSize={"14pt"}
          >
            <strong>ตัวอย่าง</strong> เอกสารสำหรับเจ้าหน้าที่
            เพื่อเป็นแบบอย่างในการกรอกแบบฟอร์มเพื่อเพิ่มคู่มือการศึกษาทั่วไป
          </Typography>
          <Box
            sx={{
              alignItem: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={onDownload4} variant="contained" color="primary">
              ดาวน์โหลด ตัวอย่างเพื่อเพิ่มคู่มือการศึกษาทั่วไป
            </Button>
          </Box>
        </Grid>
      </Stack>
    </div>
  );
};

export default Download;
