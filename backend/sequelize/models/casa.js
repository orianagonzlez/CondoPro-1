module.exports = (sequelize, DataTypes) => {
    const Casa = sequelize.define('Casa', {
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
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dimensiones: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alicuota:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    Casa.belongsTo(sequelize.import('./propietario'));
    Casa.belongsTo(sequelize.import('./condominio'), { foreignKey: { allowNull: false }});
    // Casa.hasMany(sequelize.import('./factura'));
    // Casa.hasMany(sequelize.import('./gasto'));
    // Casa.hasMany(sequelize.import('./visitante'));
    
    return Casa
}