import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

import AccT from "./AccT";
import AccOff from "./AccOff";

function Home() {
  const [loading, setLoading] = React.useState(false);
  return (
    <div
    // style={{
    //   marginTop: "50px",
    //   marginBottom: "80px",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   display: "flex",
    // }}
    >
      <Progess load={loading} />
      <AccOff setLoading={setLoading} />
    </div>
  );
}

export default Home;
