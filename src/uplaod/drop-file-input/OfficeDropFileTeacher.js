import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

import "./drop-file-input.css";

import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../../assets/uploadfile/cloud-upload-regular-240.png";

const OfficeDropFileTeacher = (props) => {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile({ file, id: fileList.length, flag: false });
      };
      console.log("file", file);
      console.log("file2", { file, id: 1 });
      // console.log("customFile", customFile);

      const updatedList = [
        ...fileList,
        { file, id: fileList.length, flag: false },
      ];
      setFileList(updatedList);
      props.onFileChange(updatedList);
      props.setLoading(updatedList);
      reader.readAsDataURL(file);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
    props.setLoading(updatedList);
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(file.file);
    a.download = file.file.name;
    a.click();
  };

  const [file, setFile] = useState({});
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("token");

  const onClickUpload = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const formData = new FormData();
      formData.append("file", file.file);

      const UploadStudent = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/create-many-teacher-info-for-officer",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });

      if (UploadStudent.data.message == "success") {
        setLoading(false);
        alert("อัปโหลด สาขาวิชา สำเร็จแล้ว ");
        window.location.reload("Refresh");
      } else if (UploadStudent.data.message == "depaertment not match") {
        setLoading(false);
        alert("สาขาไม่ถูกต้อง");
        window.location.reload("Refresh");
      } else {
        setLoading(false);
        alert("ผิดพลาด");
        console.log("ผิดพลาด", UploadStudent.data.message);
        window.location.reload("Refresh");
      }
    } catch {
      setLoading(false);
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };
  console.log("fileList", fileList);
  console.log("fileList", !(fileList.length === 0));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        อัปโหลดไฟล์รายชื่ออาจารย์ที่ปรึกษา
      </Button>
      <Dialog
        // maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มอาจารย์ที่ปรึกษา"}
        </DialogTitle>
        <DialogContent>
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <p>โปรดเลือกและอัปโหลด ไฟล์ .xlsx</p>
            </div>
            <input
              disabled={
                !(fileList.length === 0) &&
                !(fileList.filter((item) => !item.flag).length === 0)
              }
              type="file"
              value=""
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ID="fileSelect"
              runat="server"
              onChange={onFileDrop}
            />
          </div>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              <p className="drop-file-preview__title">ไฟล์ที่อัปโหลด</p>
              {fileList.map((item, index) => (
                <div
                  key={index.toString()}
                  className="drop-file-preview__item"
                  style={
                    item?.flag ? { backgroundColor: "rgb(0,128,0,0.7)	" } : {}
                  }
                >
                  <img
                    style={{ width: "15%" }}
                    src={
                      ImageConfig[item.file.type.split("/")[1]] ||
                      ImageConfig["xlsx"]
                    }
                    alt="Error Input"
                  />

                  <div className="drop-file-preview__item__info">
                    <Button onClick={handledownload} variant="outlined">
                      {"ตรวจสอบไฟล์ : "}
                      {item.file.name}
                    </Button>
                    <p style={{ marginTop: "8px" }}>
                      {" "}
                      {"เวลาแก้ไขไฟล์ล่าสุด : "}
                      {item.file.lastModifiedDate.toString().substring(0, 25)}
                    </p>
                  </div>

                  {!item.flag && (
                    <span className="drop-file-preview__item__del">
                      <HighlightOffIcon onClick={() => fileRemove(item)} />
                    </span>
                  )}
                </div>
              ))}

              {console.log(
                "------",
                fileList.filter((item) => !item.flag)
              )}
              <Box
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Button
                  minWidth="100%"
                  variant="contained"
                  component="label"
                  disabled={fileList.filter((item) => !item.flag).length === 0}
                  onClick={onClickUpload}
                >
                  อัปโหลดไฟล์
                </Button>
              </Box>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

OfficeDropFileTeacher.propTypes = {
  onFileChange: PropTypes.func,
  setLoading: PropTypes.func,
};

export default OfficeDropFileTeacher;
