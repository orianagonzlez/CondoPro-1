import Sequelize from 'sequelize';
 
const sequelize = new Sequelize('db_condopro', 'root', 'Formula18', {//Modifica los datos para conectarte a la Bd
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
    gastoDeFactura: sequelize.import('./gastoDeFactura'),
    gasto: sequelize.import('./gasto'),
    instrumentoDePago: sequelize.import('./instrumentoDePago'),
    pago: sequelize.import('./pago'),
    visitante: sequelize.import('./visitante')
};
 
//Asociaciones
models.admin.hasMany(models.condominio);
models.condominio.belongsTo(models.admin, { foreignKey: { allowNull: false }});

models.factura.belongsToMany( models.gasto, {
  through: "detallesDeFactura",
  as: "facturas",
  foreignKey: "gasto_id",
});

models.gasto.belongsToMany( models.factura, {
  through: "detallesDeFactura",
  as: "gastos",
  foreignKey: "factura_id",
});



models.sequelize = sequelize;
models.Sequelize = Sequelize;


 
module.exports = models;
