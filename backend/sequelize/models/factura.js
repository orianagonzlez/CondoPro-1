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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        fechaVenc:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        saldo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    Factura.belongsTo(sequelize.import('./casa'), { foreignKey: { allowNull: false }});
    return Factura
}