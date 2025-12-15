import React, { useEffect, useState } from "react";
import api from "../api";

function Buku() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [editId, setEditId] = useState(null);

  // LOAD DATA
  const load = async () => {
    const res = await api.get("/buku");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // TAMBAH / UPDATE
  const submit = async () => {
    if (!nama.trim()) return alert("Nama buku wajib diisi");

    if (editId) {
      await api.put(`/buku/${editId}`, { nama_buku: nama });
      setEditId(null);
    } else {
      await api.post("/buku", { nama_buku: nama });
    }

    setNama("");
    load();
  };

  // EDIT
  const edit = (item) => {
    setEditId(item.id);
    setNama(item.nama_buku);
  };

  // HAPUS
  const hapus = async (id) => {
    if (window.confirm("Yakin hapus buku?")) {
      await api.delete(`/buku/${id}`);
      load();
    }
  };

  return React.createElement(
    "div",
    { style: card },

    React.createElement("h3", null, "📘 Buku"),

    React.createElement("input", {
      style: input,
      value: nama,
      placeholder: "Nama Buku",
      onChange: (e) => setNama(e.target.value)
    }),

    React.createElement(
      "button",
      { style: button, onClick: submit },
      editId ? "Update" : "Tambah"
    ),

    React.createElement(
      "ul",
      { style: list },
      data.map((b) =>
        React.createElement(
          "li",
          { key: b.id, style: item },

          React.createElement("span", null, b.nama_buku),

          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { style: btnEdit, onClick: () => edit(b) },
              "Edit"
            ),
            React.createElement(
              "button",
              { style: btnDelete, onClick: () => hapus(b.id) },
              "Hapus"
            )
          )
        )
      )
    )
  );
}

export default Buku;

/* ================= STYLE ================= */

const card = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 10px 20px rgba(0,0,0,.1)"
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 8
};

const button = {
  width: "100%",
  padding: 8,
  cursor: "pointer",
  marginBottom: 10
};

const list = {
  listStyle: "none",
  padding: 0
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  borderBottom: "1px solid #eee"
};

const btnEdit = {
  marginRight: 5,
  padding: "4px 8px",
  cursor: "pointer"
};

const btnDelete = {
  padding: "4px 8px",
  cursor: "pointer",
  background: "red",
  color: "white",
  border: "none"
};
