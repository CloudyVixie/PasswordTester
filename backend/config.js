
const mariadb = require("mariadb");

const banco = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "epa3110",
    connectionLimit: 5
});

module.exports = banco;
