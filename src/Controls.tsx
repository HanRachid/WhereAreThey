import React from "react";
import Time from "./Time";
import Wanted from "./Wanted";

export default function Controls(props: any) {
  function handleClick() {
    props.setBlur("blur(8px)");
    props.setMenu(true);
    props.resetTimer();
    props.setTime("");
  }
  return (
    <div
      style={{
        outline: "3px solid #1d1d1d",
        borderRadius: "3px",
        width: "500px",
        height: "50px",
        left: props.width,
        top: "12px",
        zIndex: 1,
        position: "absolute",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <button onClick={handleClick}>Give up</button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Wanted:
        <Wanted
          setSelected={props.setSelected}
          selected={props.selected}
        ></Wanted>
      </div>
      <div>{props.time} </div>
    </div>
  );
}
