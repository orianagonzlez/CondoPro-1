import Sequelize from 'sequelize';
 
const sequelize = new Sequelize('condo', 'root', 'Formula18', {//Modifica los datos para conectarte a la Bd
    host: 'localhost',
    dialect: 'mysql'
});
 
const models = {
    propietario: sequelize.import('./propietario')
};
 
models.sequelize = sequelize;
models.Sequelize = Sequelize;
 
module.exports = models;