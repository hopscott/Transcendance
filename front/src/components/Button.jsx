import React from "react";

export default function button({name, className, clickAction}) {
  return (
    <div className={className}
        onClick={clickAction}>
      {name}
    </div>
  )
}