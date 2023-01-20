import React from "react";
import fry from "../public/fry.jpg";
import zoidberg from "../public/zoidberg.png";
import zapp from "../public/zapp.png";
export default function Wanted(props: any) {
  function select(e: any) {
    const characters: any = document.querySelectorAll(".character");
    characters.forEach((character: any) => {
      character.style.outline = "2px solid black";
      if (character.className === e.target.className) {
        character.style.outline = "2px solid white";
        const selected = character.className.slice(10);
        props.setSelected(selected);
      }
    });
  }

  return (
    <div
      onClick={select}
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={select}
        className="character Fry"
        style={{
          backgroundImage: `url(${fry})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "45px",
          height: "40px",
          width: "40px",
          backgroundPositionY: "70%",
          borderRadius: "25px",
          outline: "2px solid black",
        }}
      ></div>
      <div
        onClick={select}
        className="character Zoidberg"
        style={{
          backgroundImage: `url(${zoidberg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "47px",
          backgroundPositionY: "70%",
          height: "40px",
          width: "40px",
          borderRadius: "25px",
          outline: "2px solid black",
        }}
      ></div>
      <div
        className="character Zapp"
        style={{
          backgroundImage: `url(${zapp})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "47px",
          backgroundPositionY: "70%",
          height: "40px",
          width: "40px",
          borderRadius: "25px",
          outline: "2px solid black",
        }}
      ></div>
    </div>
  );
}
