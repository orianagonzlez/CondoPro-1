const resolvers = {

    Query: {

        //----------------------------------Propietario------------------------------------------------
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

        //----------------------------------Casa------------------------------------------------
        async getCasas(root, args, { models }) {
            return await models.casa.findAll({
                where: {
                    activo: true
                }
            })
        },
        async getCasa(root, args, { models }) {
            return await models.casa.findOne({
                where: {
                    id: args.id,
                    activo:true,
                }
            })
        },

        //----------------------------------Condominio------------------------------------------------
        async getCondominios(root, args, { models }) {
            return await models.condominio.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getCondominio(root, args, { models }) {
            return await models.condominio.findOne({
                where: {
                    id: args.id,
                    activo:true,
                }
            })
        },
    },

    Mutation: {

         //----------------------------------Propietario------------------------------------------------
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
        
        async deletePropietario(root, { id }, { models }){
          
            let propietario = await models.propietario.findByPk(id);
            
            return propietario.update( {activo: false} )
          
          },

        //----------------------------------Casa------------------------------------------------
        async createCasa(root, { numero, dimensiones, estado, alicuota, PropietarioId, CondominioId, activo }, { models }) {
            return await models.casa.create({ numero, dimensiones, estado, alicuota, PropietarioId, CondominioId, activo })
        },

        async updateCasa(root, { numero, dimensiones, estado, alicuota, PropietarioId, id }, { models }){

            let casa = await models.casa.findByPk(id);

            let data = {
                numero: numero,
                dimensiones: dimensiones,
                estado:estado,
                alicuota: alicuota,
                propietarioId: PropietarioId
            };

            return casa.update(data)

        },

        async deleteCasa(root, { id }, { models }){
          
            let casa = await models.casa.findByPk(id);
            
            return casa.update( {activo: false} )
          
          },
        
        //----------------------------------Condominio------------------------------------------------

        async createCondominio(root, { nombre, estado, ciudad, direccion, AdminId, activo }, { models }) {
            return await models.condominio.create({ nombre, estado, ciudad, direccion, AdminId, activo })
        },

        async updateCondominio(root, { nombre, estado, ciudad, direccion, id }, { models }){

            let casa = await models.condominio.findByPk(id);

            let data = {
                nombre: nombre,
                estado: estado,
                ciudad: ciudad,
                direccion: direccion,
            };

            return condominio.update(data)

        },

        async deleteCondominio(root, { id }, { models }){
          
            let casa = await models.condominio.findByPk(id);
            
            return casa.update( {activo: false} )
          
          },

    }

     


};

module.exports = resolvers;