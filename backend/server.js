
const express = require("express");
const path = require("path");

const app = express();
const porta = 3000;

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "../frontend")
));

app.use("/api/participantes", require("./api/participantes"));

app.get("/", (req, res) => {
    res.redirect("/html/formulario.html");
});

app.listen(porta, () => {
    console.log(`Servidor aberto em http://localhost:${porta}`);
});
