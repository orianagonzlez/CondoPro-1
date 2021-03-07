module.exports = (sequelize, DataTypes) => {
    const Gasto = sequelize.define('Gasto', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        },
        concepto: {
            type: DataTypes.STRING,
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

    // Gasto.belongsTo(sequelize.import('./condominio'), { foreignKey: { allowNull: false }});
    // Gasto.belongsTo(sequelize.import('./casa'));
    return Gasto
}