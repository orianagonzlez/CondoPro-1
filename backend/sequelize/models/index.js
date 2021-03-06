import Sequelize from 'sequelize';
 
const sequelize = new Sequelize('db_condopro', 'root', 'go.unimet21', {//Modifica los datos para conectarte a la Bd
    host: 'localhost',
    dialect: 'mysql', 
    define: {
      timestamps: false 
    }
});
 
const models = {
    admin: sequelize.import('./admin'),
    propietario: sequelize.import('./propietario'),
    casa: sequelize.import('./casa'),
    condominio: sequelize.import('./condominio'),
    factura: sequelize.import('./factura'),
    GastoDeFactura: sequelize.import('./gastoDeFactura'),
    gasto: sequelize.import('./gasto'),
    instrumentoDePago: sequelize.import('./instrumentoDePago'),
    pago: sequelize.import('./pago'),
    visitante: sequelize.import('./visitante')
};
 
models.sequelize = sequelize;
models.Sequelize = Sequelize;
 
module.exports = models;