module.exports = (sequelize, DataTypes) => {
    const Condominio = sequelize.define('Condominio', {
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
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
      
    }, {});

    // Condominio.belongsTo(sequelize.import('./admin'), { foreignKey: { allowNull: false }});
    // Condominio.hasMany(sequelize.import('./casa'));
    // Condominio.hasMany(sequelize.import('./gasto'));
    return Condominio
}