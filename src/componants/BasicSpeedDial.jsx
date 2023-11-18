// import  React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { useContext, useState } from "react";
import { context } from "../App";

export function Color1() {
  return (
    <div
      style={{
        backgroundColor: "#90caf9",
        cursor: "pointer",
        width: "50px",
        height: "40px",
        borderRadius: "50%",
      }}
    ></div>
  );
}

export function Color2() {
  return (
    <div
      style={{
        backgroundColor: "#ce93d8",
        cursor: "pointer",
        width: "50px",
        height: "40px",
        borderRadius: "50%",
      }}
    ></div>
  );
}
export function Color3() {
  return (
    <div
      style={{
        backgroundColor: "#e57373",
        cursor: "pointer",
        width: "50px",
        height: "40px",
        borderRadius: "50%",
      }}
    ></div>
  );
}
export function Color4() {
  return (
    <div
      style={{
        backgroundColor: "#81c784",
        cursor: "pointer",
        width: "50px",
        height: "40px",
        borderRadius: "50%",
      }}
    ></div>
  );
}
const actions = [
  { icon: <Color1 />, name: "#90caf9" },
  { icon: <Color2 />, name: "#ce93d8" },
  { icon: <Color3 />, name: "#e57373" },
  { icon: <Color4 />, name: "#81c784" },
];

export default function BasicSpeedDial() {
  const { color, setColor } = useContext(context);
  return (
    <Box
      sx={{
        position: "absolute",
        height: 10,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 16 }}
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              setColor(action.name);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
