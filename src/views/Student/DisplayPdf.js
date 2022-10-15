import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "../../App.css";

export default function DisplayPdf() {
  const token = sessionStorage.getItem("token");
  const [name, setName] = React.useState([]);
  const [surname, setSurname] = React.useState([]);
  const [role, setrole] = React.useState([]);
  const [course, setcourse] = React.useState([]);

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json charset=utf-8",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-current-user-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setName(response.data.name);
      setSurname(response.data.surname);
      setrole(response.data.role);

      let bodyContent = JSON.stringify({
        course_id: response.data.course_id,
      });

      const request = new Request(`http://localhost:5000/check-course-pdf`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: bodyContent,
        mode: "cors",
        cache: "default",
      });

      fetch(request)
        .then((response) => response.blob())
        .then((blob) => {
          const file = window.URL.createObjectURL(blob);
          const iframe = document.querySelector("iframe");
          if (iframe?.src) iframe.src = file;
        })
        .catch((err) => {
          // process error
        });
      console.log(response);
    };
    api_();
  }, []);
  return (
    <iframe
      src=""
      style={{ marginTop: "-20px" }}
      width="100%"
      height="1080px"
    />
  );
}
