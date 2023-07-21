import React from "react";

export default function button({name, clickAction}) {
  return (
    <div className={name.toLowerCase().replace(/ /g,"-") + "-button"}
        onClick={clickAction}>
      {name}
    </div>
  )
}