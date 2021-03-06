module.exports = (sequelize, DataTypes) => {
    const Visitante = sequelize.define('Visitante', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    Visitante.belongsTo(sequelize.import('./casa'), { foreignKey: { allowNull: false }});
    return Visitante
}