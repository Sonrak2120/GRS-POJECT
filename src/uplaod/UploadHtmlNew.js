import React, { useState, useEffect } from "react";
import "./Upload.css";

import DropFileInputHTML from "./drop-file-input/DropFileInputHTML";
import Progess from "../layouts/FullLayout/Sidebar/Progess";
import { Button, Typography } from "@mui/material";

function UploadHtmlNew() {
  const [loading, setLoading] = React.useState(false);
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <div className="box">
      <Progess load={loading} />
      <Typography
        className="header"
        variant="h2"
        style={{
          margin: "auto 0",
          marginBottom: "30px",
          fontWeight: 500,
        }}
      >
        อัปเดตผลการเรียนนิสิต
      </Typography>
      <div>
        <DropFileInputHTML
          onFileChange={(files) => onFileChange(files)}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default UploadHtmlNew;
