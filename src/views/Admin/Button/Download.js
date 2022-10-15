import React from "react";
import { Button, Stack } from "@mui/material";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "ตัวอย่างแบบฟอร์มรายชื่อนิสิต",
    imgPath: "/Pic/1.png",
  },
  {
    label: "ตัวอย่างแบบฟอร์มรายวิชา",
    imgPath: "/Pic/2.png",
  },
  {
    label: "ตัวอย่างแบบฟอร์มโครงสร้างหลักสูตร",
    imgPath: "/Pic/3.png",
  },
  {
    label: "ตัวอย่างแบบฟอร์ม prerequisite",
    imgPath: "/Pic/4.png",
  },
];

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
      link.setAttribute("download", `student_example.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};
const onDownload2 = () => {
  fetch("http://localhost:5000/download-add-subject-form", {
    method: "GET",
    headers: {
      "Content-Type": "./form/subject_form.xlsx",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `student_example.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
};
const Download = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      {/* <Box
        sx={{
          maxWidth: "100%",
          minHeight: "80vh",
          flexGrow: 1,
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography
            sx={{
              fontWeight: 1000,
              fontSize: 20,
            }}
          >
            {images[activeStep].label}
          </Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 620,
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    // width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box> */}
      <Stack
        style={{
          alignItem: "center",
          display: "flex",
          justifyContent: "center",
        }}
        direction="row"
        spacing={2}
      >
        <Button onClick={onDownload1} variant="contained" color="primary">
          โหลด ฟอร์มเพื่อเพิ่มรายชื่อนิสิต
        </Button>
        <Button onClick={onDownload2} variant="contained" color="primary">
          โหลด ฟอร์มเพื่อเพิ่มรายวิชาและหลักสูตร
        </Button>
      </Stack>
    </div>
  );
};

export default Download;
