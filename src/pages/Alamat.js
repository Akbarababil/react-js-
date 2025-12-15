import React, { useEffect, useState } from "react";
import api from "../api";

function Alamat() {
  const [data, setData] = useState([]);
  const [alamat, setAlamat] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get("/alamat");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!alamat.trim()) return alert("Alamat wajib diisi");

    const payload = { alamat_lengkap: alamat };

    if (editId) {
      await api.put(`/alamat/${editId}`, payload);
      setEditId(null);
    } else {
      await api.post("/alamat", payload);
    }

    setAlamat("");
    load();
  };

  const edit = (item) => {
    setEditId(item.id);
    setAlamat(item.alamat_lengkap);
  };

  const hapus = async (id) => {
    if (window.confirm("Hapus alamat?")) {
      await api.delete(`/alamat/${id}`);
      load();
    }
  };

  return React.createElement(
    "div",
    { style: card },

    React.createElement("h3", null, "🏠 Alamat"),

    React.createElement("textarea", {
      style: input,
      placeholder: "Alamat Lengkap",
      value: alamat,
      onChange: (e) => setAlamat(e.target.value)
    }),

    React.createElement(
      "button",
      { style: button, onClick: submit },
      editId ? "Update" : "Tambah"
    ),

    React.createElement(
      "ul",
      { style: list },
      data.map((a) =>
        React.createElement(
          "li",
          { key: a.id, style: item },

          React.createElement("span", null, a.alamat_lengkap),

          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { style: editBtn, onClick: () => edit(a) },
              "Edit"
            ),
            React.createElement(
              "button",
              { style: delBtn, onClick: () => hapus(a.id) },
              "Hapus"
            )
          )
        )
      )
    )
  );
}

export default Alamat;

/* STYLE */
const card = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 10px 20px rgba(0,0,0,.1)"
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 8,
  minHeight: 60
};

const button = {
  width: "100%",
  padding: 8,
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
  borderBottom: "1px solid #eee",
  padding: "6px 0"
};

const editBtn = { marginRight: 5 };
const delBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "4px 8px"
};
