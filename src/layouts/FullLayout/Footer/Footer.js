import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", my: "20px" }}>
      <Typography>
        © 2022 All rights reserved by{" "}
        <Link href="https://thaipbs-world.s3.ap-southeast-1.amazonaws.com/thaipbsworld/wp-content/uploads/2019/12/29110958/Thailand-Prayut-Chan-ocha-Twitter-900x540.jpg">
          Sathita & Sonrak
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
