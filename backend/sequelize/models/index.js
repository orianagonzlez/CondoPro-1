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

models.condominio.hasMany(models.casa);
models.casa.belongsTo(models.condominio, { foreignKey: { allowNull: false }});

models.condominio.hasMany(models.gasto);
models.gasto.belongsTo(models.condominio, { foreignKey: { allowNull: false }});

models.propietario.hasMany(models.casa);
models.casa.belongsTo(models.propietario);

models.casa.hasMany(models.factura);
models.factura.belongsTo(models.casa, { foreignKey: { allowNull: false }});

models.casa.hasMany(models.gasto);
models.gasto.belongsTo(models.casa);

models.casa.hasMany(models.visitante);
models.visitante.belongsTo(models.casa, { foreignKey: { allowNull: false }});

models.gasto.hasMany(models.gastoDeFactura);
models.gastoDeFactura.belongsTo(models.gasto, { foreignKey: { allowNull: false }});

models.factura.hasMany(models.gastoDeFactura);
models.gastoDeFactura.belongsTo(models.factura, { foreignKey: { allowNull: false }});

models.factura.hasMany(models.pago);
models.pago.belongsTo(models.factura, { foreignKey: { allowNull: false }});

models.instrumentoDePago.hasMany(models.pago);
models.pago.belongsTo(models.instrumentoDePago, { foreignKey: { allowNull: false }});



models.sequelize = sequelize;
models.Sequelize = Sequelize;


 
module.exports = models;
