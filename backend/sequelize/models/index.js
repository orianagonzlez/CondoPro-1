import Sequelize from 'sequelize';
 
const sequelize = new Sequelize('condopro', 'root', 'Gu1ll3rm0.', {//Modifica los datos para conectarte a la Bd
    host: 'localhost',
    dialect: 'mysql'
});
 
const models = {
    propietario: sequelize.import('./propietario'),
    apartamento: sequelize.import('./apartamento'),
};
 
models.sequelize = sequelize;
models.Sequelize = Sequelize;
 
module.exports = models;