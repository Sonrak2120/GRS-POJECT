import React from "react";
import { useState } from "react";
import axios from "axios";
import BackupIcon from "@mui/icons-material/Backup";
import "../../App.css";

function Updatecouse() {
  const [file, setFile] = useState({});
  const token = sessionStorage.getItem("token");
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  const onClickUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const Updatecourse = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/add-subject",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });

      alert("บันทึกข้อมูลแล้ว");
      console.log(Updatecourse);
      // window.location.reload("Refresh");
    } catch {
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };

  return (
    <div>
      <BackupIcon sx={{ fontSize: 100 }} />
      <h3>ทดสอบการอัปโหลดไฟล์ xlsx ผู้ดูแลระบบ/เจ้าหน้าที่</h3>
      <br />
      <input
        type={"file"}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ID="fileSelect"
        runat="server"
        onChange={handleUploadImage}
      />
      <br />
      <button onClick={onClickUpload} className="btn btn-primary">
        อัปโหลดไฟล์
      </button>
    </div>
  );
}

export default Updatecouse;
