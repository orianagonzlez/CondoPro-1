module.exports = (sequelize, DataTypes) => {
    const GastoDeFactura = sequelize.define('GastoDeFactura', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        }
    }, {});

    // GastoDeFactura.belongsTo(sequelize.import('./gasto'), { foreignKey: { allowNull: false }});
    // GastoDeFactura.belongsTo(sequelize.import('./factura'), { foreignKey: { allowNull: false }});
    return GastoDeFactura
}