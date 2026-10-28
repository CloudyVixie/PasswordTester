# PasswordTester

O PasswordTester é uma aplicação educativa que analisa características de uma senha e apresenta uma pontuação acompanhada de sugestões para torná-la menos previsível. O projeto foi desenvolvido para demonstrar conceitos de cibersegurança.

## O que o projeto faz

- Analisa o comprimento e os tipos de caracteres usados na senha.
- Identifica algumas sequências previsíveis e repetições.
- Mostra uma pontuação de 0 a 10 e sugestões para melhorar a senha.
- Apresenta estimativas teóricas de tempo para tentativas online e para um cenário offline com NTLM e uma RTX 4090.
- Permite analisar até cinco senhas por sessão.
- Registra idade e sexo dos participantes no MariaDB.

A análise da senha é feita no navegador. A senha digitada não é enviada ao servidor nem armazenada no banco de dados. O banco guarda somente os dados informados no formulário de participação.

## Tecnologias

- HTML, CSS e JavaScript
- Node.js e Express
- MariaDB

## Como executar

É necessário ter Node.js e MariaDB instalados.

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

4. Confira as credenciais em `backend/config.js` e ajuste-as ao seu ambiente.
5. Inicie o servidor:

   ```bash
   npm start
   ```

6. Acesse [http://localhost:3000](http://localhost:3000).

## Limitações

O PasswordTester tem finalidade educativa e não substitui uma ferramenta profissional de avaliação de senhas. A pontuação usa critérios simples, e as estimativas são modelos aproximados. Os resultados reais dependem do método de hash, do hardware e de outros fatores.

O cenário offline usa uma referência de desempenho para NTLM e RTX 4090; não representa a velocidade de quebra de todos os tipos de hash.

## Uso de IA

Os textos da interface e o CSS foram feitos com auxílio de IA. A aplicação e sua lógica foram organizadas para demonstrar o funcionamento da análise de senhas.
