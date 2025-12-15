import React from "react";
import Buku from "./pages/Buku";
import Telepon from "./pages/Telepon";
import Alamat from "./pages/Alamat";

function App() {
  return React.createElement(
    "div",
    { style: container },
    React.createElement("h1", null, "Dashboard CRUD"),
    React.createElement("div", { style: grid },
      React.createElement(Buku),
      React.createElement(Telepon),
      React.createElement(Alamat)
    )
  );
}

export default App;

const container = {
  padding: 30,
  background: "#f4f6f8",
  minHeight: "100vh"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 20
};
