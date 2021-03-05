module.exports = (sequelize, DataTypes) => {
    const Casa = sequelize.define('Casa', {
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
        PropID:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        CondoID:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});

    Casa.belongsTo(sequelize.import('./propietario'));
    Casa.belongsTo(sequelize.import('./condominio'), { foreignKey: { allowNull: false }});
    return Casa
}