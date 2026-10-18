# PasswordTester

O PasswordTester é uma aplicação simples para analisar senhas e mostrar alguns fatores que influenciam sua força. Fiz o projeto em uma tarde de domingo para ter algo funcional para apresentar na feira de cursos da escola, já que o tema da minha turma é cibersegurança.

A ideia surgiu como uma alternativa caso o projeto principal não estivesse pronto a tempo. Como também faz parte dos meus projetos, deixei o código no GitHub para manter meu portfólio organizado e ter uma cópia de segurança.

## O que o projeto faz

- Analisa o comprimento e os tipos de caracteres usados na senha.
- Identifica algumas sequências previsíveis e repetições.
- Mostra uma pontuação de 0 a 10 e sugestões para melhorar a senha.
- Apresenta estimativas teóricas de tempo para tentativas online e para um cenário offline com NTLM e uma RTX 4090.
- Permite analisar até cinco senhas por sessão.
- Registra idade e sexo dos participantes no MariaDB.

A análise é feita no navegador. A senha digitada não é enviada para o servidor nem armazenada no banco de dados. O banco guarda somente os dados do formulário de participação.

## Tecnologias

- HTML, CSS e JavaScript
- Node.js e Express
- MariaDB

## Como executar

É necessário ter o Node.js e o MariaDB instalados.

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o banco e a tabela no MariaDB:

   ```sql
   CREATE DATABASE IF NOT EXISTS epa3110;
   USE epa3110;

   CREATE TABLE participantes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       idade INT NOT NULL,
       sexo ENUM('Masculino', 'Feminino', 'Não binário') NOT NULL
   );
   ```

4. Confira as credenciais do banco em `backend/config.js`. A configuração inicial usa o usuário `root`, sem senha, e o banco `epa3110`. Altere os valores para corresponder ao seu ambiente.
5. Inicie o servidor:

   ```bash
   npm start
   ```

6. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Limitações

Este projeto tem finalidade educativa e não substitui uma ferramenta profissional de avaliação de senhas. A pontuação usa critérios simples, e as estimativas de tempo são modelos aproximados: os resultados reais dependem, entre outros fatores, do método de hash, do hardware e dos limites impostos pelo serviço atacado.

O cenário offline apresentado usa uma referência de desempenho para NTLM e RTX 4090. Ele não representa a velocidade de quebra de todos os tipos de hash.

## Uso de IA

Os textos da interface e o CSS foram feitos por IA. A aplicação foi montada para atender à proposta da feira e servir como um projeto demonstrável.

---

Feito por Vixie Neves.
