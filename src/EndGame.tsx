import React from "react";
export default function EndGame(props: any) {
  function handleClick() {
    props.resetTimer();
    props.setTime("");
    props.setMenu(true);
    props.setEndgame(false);
  }

  return (
    <div
      style={{
        width: "20%",
        minWidth: "450px",
        height: "20vh",
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
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Score</h3>
        <div>{props.score}</div>
        <button onClick={handleClick}>Retry!</button>
      </div>
    </div>
  );
}
