import api from "./shared/api";

import ReactAjaxTreeView from "./ReactAjaxTreeView/ReactAjaxTreeView";

function App() {
  return (
    <div>
      <h1>React AJAX TreeView Component</h1>
      <div>
        <ReactAjaxTreeView
          levels={6}
          items={[
            { id: "root-" + 1, text: "Products", level: 0, expanded: false },
            { id: "root-" + 2, text: "Todos", level: 0, expanded: false },
          ]}
          children={async (itemLevel, itemData) => {
            const result = [];

            if (itemLevel == 0 && itemData.id == "root-1") {
              await api.get("products").then((data) => {
                data.products.forEach((record) => {
                  result.push({ id: "product-" + record.id, text: record.title });
                });
              });
            } else if (itemLevel == 0 && itemData.id == "root-2") {
              await api.get("todos").then((data) => {
                data.todos.forEach((record) => {
                  result.push({ id: "todo-" + record.id, text: record.todo });
                });
              });
            } else {
              await api.get("comments").then((data) => {
                data.comments.forEach((record) => {
                  result.push({ id: "comment-" + record.id, text: record.body });
                });
              });
            }

            return result;
          }}
          click={(event, level, data) => {
            console.log("DATA=>" + JSON.stringify(data), "LEVEL=>" + level);
          }}
        />
      </div>
    </div>
  );
}

export default App;
