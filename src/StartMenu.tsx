import React from "react";
import logo from "../public/logo.png";
export default function StartMenu(props: any) {
  function handleClick() {
    if (props.nickname == "") window.alert("please specify a nickname");
    else {
      props.setBlur("");
      props.setMenu(false);
    }
  }

  function handleScore() {
    props.setScoreMenu(true);
    props.setMenu(false);
  }
  function handleChange(e: any) {
    if (e.target.value.length < 20) {
      props.setNickname(e.target.value);
    }
  }
  return (
    <div
      style={{
        width: "30%",
        minWidth: "450px",
        height: "50vh",
        outline: "4px solid black",
        borderRadius: "5px",
        boxShadow: "2px 2px #888888",
        position: "absolute",
        zIndex: 1,
        left: props.width,
        top: props.height,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${logo})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionX: "60%",
        backgroundPositionY: "1500%",
      }}
    >
      <div style={{ display: "flex", gap: "30px", marginTop: "30px" }}>
        <button onClick={handleScore}> ScoreBoard </button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <h3>Enter Nickname</h3>

        <input
          style={{ marginRight: "30px", marginLeft: "100px" }}
          type="text"
          value={props.nickname || ""}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Start!</button>
      </div>
    </div>
  );
}
