import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // const interviewListClass = classNames(`interviewers__item", ${
  //   props.selected ? "interviewers__item--selected" : ""  
  // }`);

  const interviewListClass = classNames("interviewers__item", {
    "interviewers__item--selected ": props.selected,
  });

  return (
    <li className={interviewListClass} onCLick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}
