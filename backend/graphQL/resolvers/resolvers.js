const resolvers = {

    Query: {

        async getPropietarios(root, args, { models }){
            return await models.propietario.findAll()
        },
        async getPropietario(root, args, { models }){
            return await models.propietario.findByPk(args.id)
        }

    },
    Mutation: {
        async createPropietario(root, { nombre, apellido, cedula, correo, telefono, activo }, { models }){
            return await models.propietario.create( {nombre, apellido, cedula, correo, telefono, activo} )
        }
    }

};

module.exports = resolvers;