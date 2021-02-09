const resolvers = {

    Query: {

        //Propietario
        async getPropietarios(root, args, { models }){
            return await models.propietario.findAll({
                where: {
                    activo: true
                }
            })
        },
        async getPropietario(root, args, { models }){
            return await models.propietario.findOne({
                where: {
                  id: args.id,
                  activo: true, 
                },
              })
        },

        //Apartamento
        async getApartamentos(root, args, { models }) {
            return await models.apartamento.findAll({
                where: {
                    activo: true
                }
            })
        },
        async getApartamento(root, args, { models }) {
            return await models.apartamento.findOne({
                where: {
                    id: args.id,
                    activo:true,
                }
            })
        }
    },

    Mutation: {

        //Propietario
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
        },
        

        //Apartamento
        async createApartamento(root, { numero, dimensiones, estado, activo }, { models }) {
            return await models.apartamento.create({ numero, dimensiones, estado, activo })
        },

        async updateApartamento(root, { numero, dimensiones, estado, id }, { models }){

            let apartamento = await models.apartamento.findByPk(id);

            let data = {
                numero: numero,
                dimensiones: dimensiones,
                estado:estado
            };

            return apartamento.update(data)
        }

    }

};

module.exports = resolvers;