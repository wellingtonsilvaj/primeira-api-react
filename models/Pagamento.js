const db = require('./db')

const Pagamento = db.sequelize.define('pagamento', {
    nome: {
        type:db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.DOUBLE
    }
})


// criar a tabela
//Pagamento.sync({force: true})

module.exports = Pagamento