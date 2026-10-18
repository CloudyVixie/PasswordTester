const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("enviar");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const idade = Number(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;

    botao.disabled = true;
    mensagem.textContent = "Registrando dados...";

    try {
        const resposta = await fetch("/api/participantes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idade, sexo })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.mensagem || "Erro ao cadastrar."
            );
        }

        window.location.href = "/html/main.html";
    } catch (erro) {
        mensagem.textContent =
            erro.message || "Erro ao conectar ao servidor.";

        botao.disabled = false;
    }
});
