const resolvers = {

    Query: {

        //----------------------------------Propietario------------------------------------------------
        async getPropietarios(root, args, { models }) {
            return await models.propietario.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getPropietario(root, args, { models }) {
            return await models.propietario.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getPropietarioByCI(root, args, { models }) {
            return await models.propietario.findOne({
                where: {
                    cedula: args.cedula,
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

        async getCasasByCondoId(root, args, { models }) {
            return await models.casa.findAll({
                where: {
                    CondominioId: args.condoId,
                    activo: true
                }
            })
        },
        
        async getCasa(root, args, { models }) {
            return await models.casa.findOne({
                where: {
                    id: args.id,
                    activo: true,
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
                    activo: true,
                }
            })
        },

        
        async getCondominioByAdminId(root, args, { models }) {
            return await models.condominio.findOne({
                where: {
                    AdminId: args.adminId,
                    activo: true,
                }
            })
        },

        //----------------------------------Admin------------------------------------------------
        async getAdmins(root, args, { models }) {
            return await models.admin.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getAdmin(root, args, { models }) {
            return await models.admin.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getAdminByCI(root, args, { models }) {
            return await models.admin.findOne({
                where: {
                    cedula: args.cedula,
                    activo: true,
                },
            })
        },

        //----------------------------------Visitante------------------------------------------------
        async getVisitantes(root, args, { models }) {
            return await models.visitante.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getVisitante(root, args, { models }) {
            return await models.visitante.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getVisitanteByCI(root, args, { models }) {
            return await models.visitante.findOne({
                where: {
                    cedula: args.cedula,
                    activo: true,
                },
            })
        },

        //----------------------------------Instrumento De Pago------------------------------------------------
        async getInstrumentosDePago(root, args, { models }) {
            return await models.instrumentoDePago.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getInstrumentoDePago(root, args, { models }) {
            return await models.instrumentoDePago.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getInstrumentoDePagoByNumero(root, args, { models }) {
            return await models.instrumentoDePago.findOne({
                where: {
                    numero: args.numero,
                    activo: true,
                },
            })
        },

        //----------------------------------Gasto------------------------------------------------
        async getGastos(root, args, { models }) {
            return await models.gasto.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getGasto(root, args, { models }) {
            return await models.gasto.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getGastosByCondoId(root, args, { models }) {
            return await models.gasto.findAll({
                where: {
                    CondominioId: args.condoId,
                    activo: true,
                },
            })
        },

        async getGastosByCasaId(root, args, { models }) {
            return await models.gasto.findAll({
                where: {
                    CasaId: args.casaId,
                    activo: true,
                },
            })
        },
    },

    Mutation: {

        //----------------------------------Propietario------------------------------------------------
        async createPropietario(root, { nombre, apellido, cedula, correo, telefono, activo }, { models }) {
            return await models.propietario.create({ nombre, apellido, cedula, correo, telefono, activo })
        },

        async updatePropietario(root, { nombre, apellido, cedula, correo, telefono, id }, { models }) {

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

        async deletePropietario(root, { id }, { models }) {

            let propietario = await models.propietario.findByPk(id);

            return propietario.update({ activo: false })

        },

        //----------------------------------Casa------------------------------------------------
        async createCasa(root, { nombre, numero, dimensiones, estado, alicuota, PropietarioId, CondominioId, activo }, { models }) {
            return await models.casa.create({ nombre, numero, dimensiones, estado, alicuota, PropietarioId, CondominioId, activo })
        },

        async updateCasa(root, { nombre, numero, dimensiones, estado, alicuota, PropietarioId, id }, { models }) {

            let casa = await models.casa.findByPk(id);

            let data = {
                nombre: nombre,
                numero: numero,
                dimensiones: dimensiones,
                estado: estado,
                alicuota: alicuota,
                PropietarioId: PropietarioId
            };

            return casa.update(data)

        },

        async deleteCasa(root, { id }, { models }) {

            let casa = await models.casa.findByPk(id);

            return casa.update({ activo: false })

        },

        //----------------------------------Condominio------------------------------------------------

        async createCondominio(root, { nombre, estado, ciudad, direccion, AdminId, activo }, { models }) {
            return await models.condominio.create({ nombre, estado, ciudad, direccion, AdminId, activo })
        },

        async updateCondominio(root, { nombre, estado, ciudad, direccion, id }, { models }) {

            let condominio = await models.condominio.findByPk(id);

            let data = {
                nombre: nombre,
                estado: estado,
                ciudad: ciudad,
                direccion: direccion,
            };

            return condominio.update(data)

        },

        async deleteCondominio(root, { id }, { models }) {

            let condominio = await models.condominio.findByPk(id);

            return condominio.update({ activo: false })

        },


        //----------------------------------Admins------------------------------------------------
        async createAdmin(root, { nombre, apellido, cedula, correo, telefono, activo }, { models }) {
            return await models.admin.create({ nombre, apellido, cedula, correo, telefono, activo })
        },

        async updateAdmin(root, { nombre, apellido, cedula, correo, telefono, id }, { models }) {

            let admin = await models.admin.findByPk(id);

            let data = {
                nombre: nombre,
                apellido: apellido,
                cedula: cedula,
                correo: correo,
                telefono: telefono,
            };

            return admin.update(data)

        },

        async deleteAdmin(root, { id }, { models }) {

            let admin = await models.admin.findByPk(id);

            return admin.update({ activo: false })

        },

        //----------------------------------Visitante------------------------------------------------
        async createVisitante(root, { nombre, apellido, cedula, fecha, CasaId, activo }, { models }) {
            return await models.admin.create({ nombre, apellido, cedula, fecha, CasaId, activo })
        },

        async updateVisitante(root, { nombre, apellido, cedula, fecha, CasaId, id }, { models }) {

            let admin = await models.admin.findByPk(id);

            let data = {
                nombre: nombre,
                apellido: apellido,
                cedula: cedula,
                fecha: fecha,
                CasaId: CasaId,
            };

            return admin.update(data)

        },

        async deleteVisitante(root, { id }, { models }) {

            let visitante = await models.visitante.findByPk(id);

            return visitante.update({ activo: false })

        },
        //----------------------------------Gasto------------------------------------------------
        async createGasto(root, { concepto, tipo, monto, CondominioId, CasaId, activo }, { models }) {
            return await models.gasto.create({ concepto, tipo, monto, CondominioId, CasaId, activo })
        },
    }


};

module.exports = resolvers;