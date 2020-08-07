const database = require('../database/database');

const selectAllUsuarios = () => { 
    const sql = `SELECT * FROM USUARIO;`;
    return database.exeSqlQuery(sql);
}

const selectUsuarioEmail = (email) => {
    const sql = `SELECT * FROM USUARIO WHERE email = ?`;
    return database.exeSqlQuery(sql, [email]);
}

const insertUsuario = (usuario) => {
    const sql = `INSERT INTO USUARIO(nome, email, senha) VALUES (?, ?, ?)`;
    return database.exeSqlQuery(sql, [usuario.name, usuario.email, usuario.password]);
}

module.exports = { selectAllUsuarios, insertUsuario, selectUsuarioEmail }