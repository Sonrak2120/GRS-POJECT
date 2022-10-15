import "./Upload.css";

import DropFileInput from "./drop-file-input/DropFileInput";

function UploadNew() {
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <div className="box">
      <h2 className="header">อัปเดตหลักสูตร/รายวิชา</h2>
      <div>
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
      </div>
    </div>
  );
}

export default UploadNew;
