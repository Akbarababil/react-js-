import React, { useEffect, useState } from "react";
import api from "../api";

function Telepon() {
  const [data, setData] = useState([]);
  const [nomor, setNomor] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get("/telepon");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!nomor) return alert("Nomor wajib diisi");

    if (editId) {
      await api.put(`/telepon/${editId}`, { nomor });
      setEditId(null);
    } else {
      await api.post("/telepon", { nomor });
    }

    setNomor("");
    load();
  };

  const edit = (item) => {
    setEditId(item.id);
    setNomor(item.nomor);
  };

  const hapus = async (id) => {
    if (window.confirm("Hapus data?")) {
      await api.delete(`/telepon/${id}`);
      load();
    }
  };

  return React.createElement(
    "div",
    { style: card },
    React.createElement("h3", null, "📞 Telepon"),

    React.createElement("input", {
      style: input,
      placeholder: "Nomor Telepon",
      value: nomor,
      onChange: e => setNomor(e.target.value)
    }),

    React.createElement("button", { style: btn, onClick: submit },
      editId ? "Update" : "Tambah"
    ),

    data.map(t =>
      React.createElement("div", { key: t.id, style: item },
        React.createElement("span", null, t.nomor),
        React.createElement("div", null,
          React.createElement("button", { onClick: () => edit(t) }, "Edit"),
          React.createElement("button", { onClick: () => hapus(t.id) }, "Hapus")
        )
      )
    )
  );
}

export default Telepon;

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 10
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10
};

const btn = {
  width: "100%",
  padding: 8,
  marginBottom: 10
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 5
};
