import React from "react";
export default function scoreBoard(props: any) {
  function handleClick() {
    props.resetTimer();
    props.setTime("");
    props.setMenu(true);
    props.setScoreMenu(false);
  }

  return (
    <div
      style={{
        width: "20%",
        minWidth: "450px",
        height: "40vh",
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
          gap: "5px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Score</h3>
        <div
          style={{
            overflowY: "scroll",
            width: "30vw",
            height: "27vh",
            fontFamily: "sans-serif",
            fontWeight: "600",
            fontSize: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          {Object.entries(props.scoreBoard).map((score: any, index) => {
            return (
              <div>
                {index +
                  1 +
                  " : " +
                  score[1]["name"] +
                  " : " +
                  score[1]["time"]}
              </div>
            );
          })}
        </div>
        <button onClick={handleClick}>Go back</button>
      </div>
    </div>
  );
}
