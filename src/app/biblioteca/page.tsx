"use client";

import { useState } from "react";

export default function Biblioteca() {
    const [termo, setTermo] = useState("");
    const [resultado, setResultado] = useState("");

    const buscar = async () => {
        try {
            const res = await fetch(`/api/biblia?busca=${termo}`);
            const data = await res.json();

            if (data.verses && data.verses.length > 0) {
                setResultado(data.verses[0].text);
            } else {
                setResultado("Nenhum resultado encontrado");
            }
        } catch (error) {
            setResultado("Erro de conexão com API");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>📖 Biblioteca Bíblica</h1>

            <input
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Digite João 3:16"
                style={{ padding: 10, width: "300px" }}
            />

            <button onClick={buscar} style={{ marginLeft: 10 }}>
                Pesquisar
            </button>

            <p style={{ marginTop: 20 }}>{resultado}</p>
        </div>
    );
}