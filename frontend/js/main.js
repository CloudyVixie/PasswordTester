
const senha = document.getElementById("senha");
const testar = document.getElementById("testar");
const restantes = document.getElementById("restantes");
const resultado = document.getElementById("resultado");

const mostrarSenha = document.getElementById("mostrarSenha");
const recomendacoes = document.getElementById("recomendacoes");
const listaRecomendacoes = document.getElementById("listarecomendacoes");

const erroSenha = document.getElementById("erroSenha");
const conclusao = document.getElementById("modalFinal");

let tentativasRestantes = 5;

mostrarSenha.addEventListener("click", function() {
    const mostrar = senha.type === "password";

    senha.type = mostrar ? "text" : "password";
    mostrarSenha.textContent = mostrar ? "Ocultar" : "Mostrar";
    mostrarSenha.setAttribute("aria-pressed", String(mostrar));
});


recomendacoes.addEventListener("click", function() {
    listaRecomendacoes.hidden = !listaRecomendacoes.hidden;

    recomendacoes.textContent = listaRecomendacoes.hidden
        ? "Ver dicas de segurança"
        : "Esconder dicas";
});

function analisarSenha(texto) {
    let pontos = 0;
    let tamanhoConjunto = 0;
    const dicas = [];

    if (/[a-z]/.test(texto)) {
        pontos++;
        tamanhoConjunto += 26;
    } else {
        dicas.push("Inclua letras minúsculas.");
    }

    if (/[A-Z]/.test(texto)) {
        pontos++;
        tamanhoConjunto += 26;
    } else {
        dicas.push("Inclua letras maiúsculas.");
    }

    if (/[0-9]/.test(texto)) {
        pontos++;
        tamanhoConjunto += 10;
    } else {
        dicas.push("Inclua números.");
    }

    if (/[^a-zA-Z0-9]/.test(texto)) {
        pontos++;
        tamanhoConjunto += 32;
    } else {
        dicas.push("Inclua símbolos, como !, @ ou #.");
    }

    if (texto.length >= 8) {
        pontos += 2;
    } else {
        dicas.push("Use pelo menos 8 caracteres.");
    }

    if (texto.length >= 12) {
        pontos += 2;
    } else {
        dicas.push("Prefira 12 caracteres ou mais.");
    }

    if (texto.length >= 16) {
        pontos++;
    }

    if (texto.length >= 20) {
        pontos++;
    } else {
        dicas.push("Use 20 caracteres ou mais para atingir o critério máximo de comprimento.");
    }

    if (/(.)\1{2,}/.test(texto)) {
        pontos -= 2;
        dicas.push("Evite repetir o mesmo caractere muitas vezes.");
    }

    if (/1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwerty/i.test(texto)) {
        pontos -= 2;
        dicas.push("Evite sequências fáceis de prever.");
    }

    pontos = Math.max(0, Math.min(10, pontos));

    if (dicas.length === 0) {
        dicas.push(
            "A senha atende aos critérios avaliados. Evite reutilizá-la."
        );
    }


    const combinacoes =
        BigInt(tamanhoConjunto) ** BigInt(texto.length);

    const media = combinacoes / 2n;

    return {
        pontos,
        combinacoes,
        media,
        dicas
    };
}

function explicarNota(texto, pontos) {
    if (pontos !== 9) {
        return "";
    }

    const motivos = [];

    if (!/[a-z]/.test(texto)) {
        motivos.push("faltam letras minúsculas");
    }

    if (!/[A-Z]/.test(texto)) {
        motivos.push("faltam letras maiúsculas");
    }

    if (!/[0-9]/.test(texto)) {
        motivos.push("faltam números");
    }

    if (!/[^a-zA-Z0-9]/.test(texto)) {
        motivos.push("faltam símbolos");
    }

    if (texto.length < 20) {
        motivos.push("a senha tem menos de 20 caracteres");
    }

    if (/(.)\1{2,}/.test(texto)) {
        motivos.push("há caracteres repetidos em sequência");
    }

    if (/1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwerty/i.test(texto)) {
        motivos.push("há uma sequência previsível");
    }

    if (motivos.length === 0) {
        return "A pontuação foi afetada pela combinação dos critérios avaliados.";
    }

    return "Por que não chegou a 10? " + motivos.join("; ") + ".";
}

function formatarNumero(numero) {
    return numero.toLocaleString("pt-BR");
}

function formatarTempo(segundos) {
    if (segundos <= 0n) {
        return "menos de 1 segundo";
    }

    const minuto = 60n;
    const hora = 60n * minuto;
    const dia = 24n * hora;
    const ano = 365n * dia;

    if (segundos < minuto) {
        return `${segundos} segundos`;
    }

    if (segundos < hora) {
        return `${(Number(segundos) / 60).toLocaleString("pt-BR", {
            maximumFractionDigits: 1
        })} minutos`;
    }

    if (segundos < dia) {
        return `${(Number(segundos) / 3600).toLocaleString("pt-BR", {
            maximumFractionDigits: 1
        })} horas`;
    }

    if (segundos < ano) {
        return `${(Number(segundos) / Number(dia)).toLocaleString("pt-BR", {
            maximumFractionDigits: 1
        })} dias`;
    }

    const anos = segundos / ano;

    if (anos < 1000000n) {
        return `${formatarNumero(anos)} anos`;
    }

    return "Mais de 1 milhão de anos";
}

testar.addEventListener("click", function() {
    if (tentativasRestantes <= 0) {
        return;
    }

    if (senha.value.length === 0) {
        erroSenha.hidden = false;
        senha.focus();
        return;
    }

    erroSenha.hidden = true;

    const senhaAnalisada = senha.value;
    const analise = analisarSenha(senhaAnalisada);

    document.getElementById("nota").textContent =
        `Pontuação: ${analise.pontos}/10`;

    document.getElementById("motivoNota").textContent =
        explicarNota(senhaAnalisada, analise.pontos);

    document.getElementById("motivoNota").hidden =
        analise.pontos !== 9;

    document.getElementById("barraSeguranca").style.width =
        `${analise.pontos * 10}%`;

    document.getElementById("progresso").setAttribute(
        "aria-valuenow",
        analise.pontos
    );

    const situacao = document.getElementById("situacao");
    const explicacao = document.getElementById("explicacao");

    if (analise.pontos <= 3) {
        situacao.textContent = "Senha fraca";
        explicacao.textContent =
            "Pode ser mais fácil de adivinhar. Aumente o tamanho e evite padrões comuns.";
    } else if (analise.pontos <= 6) {
        situacao.textContent = "Senha razoável";
        explicacao.textContent =
            "Ela tem alguns pontos positivos, mas ainda pode ficar mais forte.";
    } else if (analise.pontos <= 8) {
        situacao.textContent = "Senha boa";
        explicacao.textContent =
            "Ela atende a vários critérios. Evite padrões previsíveis e reutilização.";
    } else {
        situacao.textContent = "Pontuação alta";
        explicacao.textContent =
            "Ela atende aos critérios avaliados, mas a pontuação não garante segurança.";
    }

    document.getElementById("qtdtentativas").textContent =
        `Combinações estimadas: ${formatarNumero(analise.combinacoes)}.`;


    const velocidadeOnline = 10n;


    const velocidadeOfflineNTLM = 271900000000n;

    const tempoOnline = analise.media / velocidadeOnline;
    const tempoOffline = analise.media / velocidadeOfflineNTLM;

    document.getElementById("tempoOnline").textContent =
        `Cenário online (10 tentativas/s): ${formatarTempo(tempoOnline)}.`;

    document.getElementById("tempoOffline").textContent =
        `Cenário offline NTLM + RTX 4090: ${formatarTempo(tempoOffline)}.`;

    const listaDicas = document.getElementById("dicas");
    listaDicas.replaceChildren();

    analise.dicas.forEach(function(dica) {
        const item = document.createElement("li");
        item.textContent = dica;
        listaDicas.appendChild(item);
    });

    resultado.hidden = false;


    senha.value = "";
    senha.type = "password";
    mostrarSenha.textContent = "Mostrar";
    mostrarSenha.setAttribute("aria-pressed", "false");

    tentativasRestantes--;
    restantes.textContent = tentativasRestantes;

    if (tentativasRestantes === 0) {
        testar.disabled = true;
        senha.disabled = true;
        mostrarSenha.disabled = true;


        conclusao.hidden = false;
    }
});

document.getElementById("confirmarModal").addEventListener("click", function() {
    window.location.href = "/html/formulario.html";
});
