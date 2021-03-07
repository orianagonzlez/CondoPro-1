module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define('Factura', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaEmision:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaVenc:{
            type: DataTypes.STRING,
            allowNull: false
        },
        saldo: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    // Factura.belongsTo(sequelize.import('./casa'), { foreignKey: { allowNull: false }});
    return Factura
}