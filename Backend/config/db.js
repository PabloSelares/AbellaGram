const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
           `mongodb+srv://${dbUser}:${dbPassword}@cluster0.otyas.mongodb.net/nomeDoBanco?retryWrites=true&w=majority`
        );
        console.log('Conectou ao banco!');
        return dbConn;
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
};

conn();

module.exports = conn;
