import Sequelize from 'sequelize';
 
const sequelize = new Sequelize('condopro', 'root', 'Formula18', {//Modifica los datos para conectarte a la Bd
    host: 'localhost',
    dialect: 'mysql', 
    define: {
      timestamps: false 
    }
});
 
const models = {
    propietario: sequelize.import('./propietario'),
    casa: sequelize.import('./casa'),
    condominio: sequelize.import('./condominio')
};
 
models.sequelize = sequelize;
models.Sequelize = Sequelize;
 
module.exports = models;