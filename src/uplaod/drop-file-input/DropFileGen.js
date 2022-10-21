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

import "./drop-file-input.css";

import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../../assets/uploadfile/cloud-upload-regular-240.png";

const DropFileGen = (props) => {
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
      reader.readAsDataURL(file);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(file.file);
    a.download = file.file.name;
    a.click();
  };

  const [file, setFile] = useState({});
  const token = sessionStorage.getItem("token");

  const onClickUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file.file);

      setOpen(false);
      const UploadStudent = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/add-general",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });
      alert("อัปโหลด สาขาวิชา สำเร็จแล้ว ");
      window.location.reload("Refresh");
    } catch {
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
        อัปโหลดไฟล์สวิชาศึกษาทั่วไป
      </Button>
      <Dialog
        maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มรายวิชาการศึกษาทั่วไปในสาขาวิชา"}
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
              <p>โปรดเลือกและอัปโหลด ไฟล์ .xlxs</p>
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
                    src={
                      ImageConfig[item.file.type.split("/")[1]] ||
                      ImageConfig["rar"]
                    }
                    alt="Error Input"
                  />
                  <div className="drop-file-preview__item__info">
                    <Button variant="text" onClick={handledownload}>
                      {" "}
                      {item.file.name}
                    </Button>
                    <p>{item.file.size}B</p>
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

              <button
                disabled={fileList.filter((item) => !item.flag).length === 0}
                onClick={onClickUpload}
                className="btn btn-primary"
              >
                อัปโหลดไฟล์
              </button>
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

DropFileGen.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileGen;
