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

        //----------------------------------Factura------------------------------------------------
        async getFacturas(root, args, { models }) {
            return await models.factura.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getFactura(root, args, { models }) {
            return await models.factura.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getFacturasByNumero(root, args, { models }) {
            return await models.factura.findAll({
                where: {
                    numero: args.numero,
                    activo: true,
                },
            })
        },

        async getFacturasByCasaId(root, args, { models }) {
            return await models.factura.findAll({
                where: {
                    CasaId: args.CasaId,
                    activo: true,
                },
            })
        },

        //----------------------------------Pago------------------------------------------------
        async getPagos(root, args, { models }) {
            return await models.pago.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getPago(root, args, { models }) {
            return await models.pago.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getPagosByFactura(root, args, { models }) {
            return await models.pago.findAll({
                where: {
                    FacturaId: args.FacturaId,
                    activo: true,
                },
            })
        },

        async getPagosByInstrumentoDePago(root, args, { models }) {
            return await models.pago.findAll({
                where: {
                    InstrumentoDePagoId: args.InstrumentoDePagoId,
                    activo: true,
                },
            })
        },

        //----------------------------------GastoDeFactura------------------------------------------------
        async getGastosDeFactura(root, args, { models }) {
            return await models.gastoDeFactura.findAll({
                where: {
                    activo: true
                }
            })
        },

        async getGastoDeFactura(root, args, { models }) {
            return await models.gastoDeFactura.findOne({
                where: {
                    id: args.id,
                    activo: true,
                },
            })
        },

        async getGastosDeFacturaByGasto(root, args, { models }) {
            return await models.gastoDeFactura.findAll({
                where: {
                    GastoId: args.GastoId,
                    activo: true,
                },
            })
        },

        async getGastosDeFacturaByFactura(root, args, { models }) {
            return await models.gastoDeFactura.findAll({
                where: {
                    FacturaId: args.FacturaId,
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
            return await models.visitante.create({ nombre, apellido, cedula, fecha, CasaId, activo })
        },

        async updateVisitante(root, { nombre, apellido, cedula, fecha, CasaId, id }, { models }) {

            let visitante = await models.visitante.findByPk(id);

            let data = {
                nombre: nombre,
                apellido: apellido,
                cedula: cedula,
                fecha: fecha,
                CasaId: CasaId,
            };

            return visitante.update(data)

        },

        async deleteVisitante(root, { id }, { models }) {

            let visitante = await models.visitante.findByPk(id);

            return visitante.update({ activo: false })

        },

        //----------------------------------Gasto------------------------------------------------
        async createGasto(root, { concepto, tipo, monto, CondominioId, CasaId, activo }, { models }) {
            return await models.gasto.create({ concepto, tipo, monto, CondominioId, CasaId, CasaId, activo })
        },

        async updateGasto(root, { concepto, tipo, monto, CondominioId, CasaId, id }, { models }) {

            let gasto = await models.gasto.findByPk(id);

            let data = {
                concepto: concepto,
                tipo: tipo,
                monto: monto,
                CondominioId: CondominioId,
                CasaId: CasaId,
            };

            return gasto.update(data)

        },

        async deleteGasto(root, { id }, { models }) {

            let gasto = await models.gasto.findByPk(id);

            return gasto.update({ activo: false })

        },

        //----------------------------------Factura------------------------------------------------
        async createFactura(root, { numero, estado, fechaEmision, fechaVenc, saldo, CasaId, activo }, { models }) {
            return await models.factura.create({ numero, estado, fechaEmision, fechaVenc, saldo, CasaId, activo })
        },

        async updateFactura(root, { numero, estado, fechaEmision, fechaVenc, saldo, CasaId, id }, { models }) {

            let factura = await models.factura.findByPk(id);

            let data = {
                numero: numero,
                estado: estado,
                fechaEmision: fechaEmision,
                fechaVenc: fechaVenc,
                saldo: saldo,
                CasaId: CasaId,
            };

            return factura.update(data)

        },

        async deleteFactura(root, { id }, { models }) {

            let factura = await models.factura.findByPk(id);

            return factura.update({ activo: false })

        },

        //----------------------------------Intrumento De Pago------------------------------------------------
        async createInstrumentoDePago(root, { numero, fecha, tipo, monto, activo }, { models }) {
            return await models.instrumentoDePago.create({ numero, fecha, tipo, monto, activo })
        },

        async updateInstrumentoDePago(root, { numero, fecha, tipo, monto, id }, { models }) {

            let instrumentoDePago = await models.instrumentoDePago.findByPk(id);

            let data = {
                numero: numero,
                fecha: fecha,
                tipo: tipo,
                monto: monto
            };

            return instrumentoDePago.update(data)

        },

        async deleteInstrumentoDePago(root, { id }, { models }) {

            let instrumentoDePago = await models.instrumentoDePago.findByPk(id);

            return instrumentoDePago.update({ activo: false })

        },

        //----------------------------------Pago------------------------------------------------
        async createPago(root, { FacturaId, InstrumentoDePagoId }, { models }) {
            return await models.pago.create({ FacturaId, InstrumentoDePagoId })
        },

        async updatePago(root, { FacturaId, InstrumentoDePagoId, id }, { models }) {

            let pago = await models.pago.findByPk(id);

            let data = {
                FacturaId: FacturaId,
                InstrumentoDePagoId: InstrumentoDePagoId,
            };

            return pago.update(data)

        },

        async deletePago(root, { id }, { models }) {

            let pago = await models.pago.findByPk(id);

            return pago.update({ activo: false })

        },

        //----------------------------------GastoDeFactura------------------------------------------------
        async createGastoDeFactura(root, { GastoId, FacturaId }, { models }) {
            return await models.gastoDeFactura.create({ GastoId, FacturaId })
        },

        async updateGastoDeFactura(root, { GastoId, FacturaId, id }, { models }) {

            let gastoDeFactura = await models.gastoDeFactura.findByPk(id);

            let data = {
                GastoId: GastoId,
                FacturaId: FacturaId,
            };

            return gastoDeFactura.update(data)

        },

        async deleteGastoDeFactura(root, { id }, { models }) {

            let gastoDeFactura = await models.gastoDeFactura.findByPk(id);

            return gastoDeFactura.update({ activo: false })

        },
    }


};

module.exports = resolvers;