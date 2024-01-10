import React from "react";

import "./react-ajax-tree-view.css";
import ReactAjaxTreeViewItem from "./ReactAjaxTreeViewItem";

function ReactAjaxTreeview(props) {
  return (
    <div className="react-ajax-tree-view">
      {props.items.map((item, index) => (
        <ReactAjaxTreeViewItem key={index} data={item} level={0} levels={props.levels} children={props.children} click={props.click} />
      ))}
    </div>
  );
}

export default ReactAjaxTreeview;
