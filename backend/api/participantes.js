
const express = require("express");
const banco = require("../config");

const rota = express.Router();

rota.post("/", async (req, res) => {
    const { idade, sexo } = req.body;

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        return res.status(400).json({
            mensagem: "Informe uma idade válida."
        });
    }

    const sexosPermitidos = [
        "Masculino",
        "Feminino",
        "Não binário"
    ];

    if (!sexosPermitidos.includes(sexo)) {
        return res.status(400).json({
            mensagem: "Selecione uma opção válida."
        });
    }

    try {
        await banco.query(
            "INSERT INTO participantes (idade, sexo) VALUES (?, ?)",
            [idade, sexo]
        );

        res.status(201).json({
            mensagem: "Cadastro realizado!"
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Não foi possível realizar o cadastro."
        });
    }
});

module.exports = rota;
