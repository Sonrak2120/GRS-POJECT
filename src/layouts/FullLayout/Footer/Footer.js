import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", my: "20px" }}>
      <Typography>
        © 2022 All rights reserved by{" "}
        <Link href="https://comp.flas.kps.ku.ac.th/">
          Sathita & Sonrak
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
