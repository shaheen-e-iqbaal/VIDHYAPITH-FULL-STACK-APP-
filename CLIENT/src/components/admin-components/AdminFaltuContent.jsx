import React from "react";
import { Typography } from "@mui/material";

export default function AdminFaltuContent() {
  return (
    <>
      <div
        style={{
          marginTop: "140px",
          marginLeft: "300px",
        }}
      >
        <div>
          <Typography style={{ color: "white" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            itaque, minima error illum animi libero alias, optio impedit neque
            odio consectetur velit necessitatibus accusantium veniam perferendis
            aliquam qui modi eos nisi ratione iusto sint quia! Obcaecati ipsum
            nam eaque voluptatem libero eius repellendus, fuga voluptatum
            facilis omnis, earum suscipit reprehenderit.
          </Typography>
        </div>
        <br />
        <div>
          <iframe
            width="640"
            height="360"
            src="https://www.youtube.com/embed/wjREjBqgA9U"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
