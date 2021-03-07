module.exports = (sequelize, DataTypes) => {
    const GastoDeFactura = sequelize.define('GastoDeFactura', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        }
    }, {});

    return GastoDeFactura
}