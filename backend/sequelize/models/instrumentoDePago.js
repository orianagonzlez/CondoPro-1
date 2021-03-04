module.exports = (sequelize, DataTypes) => {
    const InstrumentoDePago = sequelize.define('InstrumentoDePago', {
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
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    return InstrumentoDePago
}