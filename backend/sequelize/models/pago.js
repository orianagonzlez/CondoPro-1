module.exports = (sequelize, DataTypes) => {
    const Pago = sequelize.define('Pago', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        }
    }, {});

    // Pago.belongsTo(sequelize.import('./factura'), { foreignKey: { allowNull: false }});
    // Pago.belongsTo(sequelize.import('./instrumentoDePago'), { foreignKey: { allowNull: false }});
    return Pago
}