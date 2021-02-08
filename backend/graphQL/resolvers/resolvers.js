const resolvers = {

    Query: {

        async getPropietarios(root, args, { models }){
            return await models.propietario.findAll({
                where: {
                    activo: true
                }
            })
        },
        async getPropietario(root, args, { models }){
            return await models.propietario.findByPk(args.id)
        }

    },
    Mutation: {
        async createPropietario(root, { nombre, apellido, cedula, correo, telefono, activo }, { models }){
            return await models.propietario.create( {nombre, apellido, cedula, correo, telefono, activo} )
        },

        async updatePropietario(root, { nombre, apellido, cedula, correo, telefono, id }, { models }){
           
          let propietario = await models.propietario.findByPk(id);
          
          let data = {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            correo: correo,
            telefono: telefono,
          };

          return propietario.update(data)
        }
    }

};

module.exports = resolvers;