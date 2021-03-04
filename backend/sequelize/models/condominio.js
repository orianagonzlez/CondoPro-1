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
      
    }, {});
    return Condominio
}