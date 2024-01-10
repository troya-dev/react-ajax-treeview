import React, { useState } from "react";

const ReactAjaxTreeViewItem = (props) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  const allowNewLevel = props.level < props.levels - 1;

  return (
    <div className="item">
      <div
        className="content"
        onClick={async (event) => {
          const childList = [];

          if (!props.data.expanded && props.children) {
            setLoading(true);

            const children = await props.children(props.level, props.data);

            children.forEach((child) => {
              childList.push({
                ...child,
                expanded: false,
                level: props.level + 1,
              });
            });
          }

          setChildren(childList);
          props.data.expanded = !props.data.expanded;

          setLoading(false);
          if (props.click) {
            props.click(event, props.level, props.data);
          }
        }}
      >
        {allowNewLevel ? <div className={loading ? "icon loading" : props.data.expanded ? "icon collapse" : "icon expand"}></div> : <div className={"icon final"}></div>}
        <div className={allowNewLevel ? "text" : "text last"}>{props.data.text}</div>
      </div>
      <div className="children">
        {children.map((child, index) => {
          return allowNewLevel ? <ReactAjaxTreeViewItem key={index} level={child.level} levels={props.levels} data={child} children={props.children} click={props.click} /> : null;
        })}
      </div>
    </div>
  );
};

export default ReactAjaxTreeViewItem;
