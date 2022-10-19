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
      style={{
        marginTop: "50px",
        marginBottom: "80px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Progess load={loading} />
      <h5></h5>
      <Stack direction="row" spacing={5}>
        <Box>
          <AccT setLoading={setLoading} />
        </Box>
        <AccOff setLoading={setLoading} />
      </Stack>
      {/* <Stack direction="row" spacing={50} justifyContent="center" marginTop={5}>
        <AddPage />
        <OfficerAddPage />
      </Stack> */}
    </div>
  );
}

export default Home;
