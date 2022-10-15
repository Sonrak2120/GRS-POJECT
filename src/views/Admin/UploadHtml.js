import React from "react";
import { useState } from "react";
import axios from "axios";
import BackupIcon from "@mui/icons-material/Backup";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

function UploadHtml() {
  const [file, setFile] = useState({});
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

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

      if (uploadHTML.data.message === "student_id doesn't match") {
        alert("รหัสนิสิตไม่ตรงกัน");
      } else if (uploadHTML.data.message === "upload fail") {
        alert("บันทึกข้อมูลไม่สำเร็จ");
        window.location.reload("Refresh");
      } else {
        alert("บันทึกข้อมูลแล้ว");
        // window.location.reload("Refresh");
      }
    } catch {
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };

  return (
    <div>
      <BackupIcon sx={{ fontSize: 100 }} />
      <h3>กรุณาอัปโหลดไฟล์ ZIP</h3>
      <br />
      <input
        type={"file"}
        accept=".rar"
        ID="fileSelect"
        className="form-control"
        onChange={handleUploadImage}
        placeholder="file"
      />{" "}
      <br />
      <button onClick={onClickUpload} className="btn btn-primary">
        อัปโหลดไฟล์
      </button>
    </div>
  );
}

export default UploadHtml;
