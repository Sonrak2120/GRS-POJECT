import React, { useState, useEffect } from "react";
import "./Upload.css";

import DropFileDepart from "./drop-file-input/DropFileDepart";
import Progess from "../layouts/FullLayout/Sidebar/Progess";

function UploadHtmlNew() {
  const [loading, setLoading] = React.useState(false);
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <div className="box">
      <Progess load={loading} />
      <h2 className="header">อัปเดตผลการเรียนนิสิต</h2>
      <div>
        <DropFileDepart
          onFileChange={(files) => onFileChange(files)}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default UploadHtmlNew;
