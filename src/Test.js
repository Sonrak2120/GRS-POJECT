import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./uplaod/drop-file-input/drop-file-input.css";

import { ImageConfig } from "./uplaod/config/ImageConfig";
import uploadImg from "./assets/uploadfile/cloud-upload-regular-240.png";

const DropFileInputHTML = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedList = [...fileList, file];
      const reader = new FileReader();
      setFileList(updatedList);
      reader.onloadend = () => {
        setFile(file);
      };
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

  const [file, setFile] = useState({});
  const token = sessionStorage.getItem("token");

  const onClickUpload = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadHTML = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/upload-zip",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });
      console.log("=====", uploadHTML.data.message);
      console.log("=====", uploadHTML.data.error);
      if (uploadHTML.data.message === "upload fail") {
        alert("บันทึกข้อมูลไม่สำเร็จ");
        // window.location.reload("Refresh");
      } else {
        alert("บันทึกข้อมูลแล้ว");
        window.location.assign("/admin/addstudent");
      }
    } catch {
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };

  return (
    <div>
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
          <p>โปรดเลือกและอัปโหลด ครั้งละ 1 ไฟล์ .rar/.zip</p>
        </div>
        <input
          type="file"
          value=""
          accept=".rar"
          ID="fileSelect"
          runat="server"
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt="Error Input"
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
          <button onClick={onClickUpload} className="btn btn-primary">
            อัปโหลดไฟล์
          </button>
        </div>
      ) : null}
    </div>
  );
};

DropFileInputHTML.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInputHTML;
