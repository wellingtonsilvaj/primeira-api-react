const Sequelize = require("sequelize")

const sequelize = new Sequelize('celke1', 'well', '123456',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports ={
    Sequelize: Sequelize,
    sequelize:sequelize
}