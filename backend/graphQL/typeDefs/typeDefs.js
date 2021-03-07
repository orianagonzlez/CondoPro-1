const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Admin{
    id: Int!
    nombre: String!
    apellido: String!
    cedula: String!
    correo: String!
    telefono: String!
    activo: Boolean!
}

type Condominio{
    id: Int!
    nombre: String!
    estado: String!
    ciudad: String!
    direccion: String!
    AdminId: Int!
    Admin: Admin!
    activo: Boolean!
}

type Propietario{
    id: Int!
    nombre: String!
    apellido: String!
    cedula: String!
    correo: String!
    telefono: String!
    activo: Boolean!
}

type Casa{
    id: Int!
    nombre: String!
    numero: Int!
    dimensiones: Int!
    estado: String!
    alicuota: Float!
    PropietarioId: Int
    CondominioId: Int!
    activo: Boolean!
}

type Visitante{
    id: Int!
    nombre: String!
    apellido: String!
    cedula: String!
    fecha: String!
    CasaId: String!
    activo: Boolean!
}

type InstrumentoDePago{
    id: Int!,
    numero: Int!,
    fecha: String!,
    tipo: String!,
    monto: Int!,
    activo: Boolean!
}

type Pago{
    id: Int!,
    FacturaId: Int!,
    InstrumentoDePagoId: String!,
    activo: Boolean!
}

type Gasto{
    id: Int!,
    concepto: String!,
    tipo: String!,
    monto: Int!,
    CondominioId: Int!,
    CasaId: Int,
    activo: Boolean!
}

type Factura{
    id: Int!,
    numero: Int!,
    estado: String!,
    fechaEmision: String!,
    fechaVenc: String!,
    saldo: Float!,
    CasaId: Int!,
    activo: Boolean!
}

type GastoDeFactura{
    id: Int!,
    GastoId: Int!,
    FacturaId: Int!
}

type Query{
    getPropietarios: [Propietario],
    getPropietario(id: Int!): Propietario,
    getPropietarioByCI(cedula: String!): Propietario,
    getCasas: [Casa],
    getCasasByCondoId(condoId: Int!): [Casa],
    getCasa(id: Int!): Casa,
    getCondominio(id: Int!): Condominio,
    getCondominios: [Condominio],
    getCondominioByAdminId(adminId: Int!): Condominio!,
    getAdmins: [Admin],
    getAdmin(id: Int!): Admin,
    getAdminByCI(cedula: String!): Admin,
    getVisitantes: [Visitante],
    getVisitantesByCasaId(casaId: Int!): [Visitante],
    getVisitante(id: Int!): Visitante,
    getVisitanteByCI(cedula: String!): Visitante,
    getInstrumentosDePago: [InstrumentoDePago],
    getInstrumentoDePago(id: Int!): InstrumentoDePago,
    getInstrumentoDePagoByNumero(numero: Int!): InstrumentoDePago,
    getGastos: [Gasto],
    getGasto(id: Int!): Gasto,
    getGastosByCondoId(condoId: Int!): [Gasto],
    getGastosByCasaId(casaId: Int!): [Gasto],
    getFacturas: [Factura],
    getFactura(id: Int!): Factura,
    getFacturasByNumero(numero: Int!): [Factura],
    getFacturasByCasaId(CasaId: Int!): [Factura],
    getPagos: [Pago],
    getPago(id: Int!): Pago,
    getPagosByFactura(FacturaId: Int!): [Pago],
    getPagosByInstrumentoDePago(InstrumentoDePagoId: Int!): [Pago],
    getGastosDeFactura: [GastoDeFactura],
    getGastoDeFactura(id: Int!): GastoDeFactura,
    getGastosDeFacturaByGasto(GastoId: Int!): [GastoDeFactura],
    getGastosDeFacturaByFactura(FacturaId: Int!): [GastoDeFactura],

}

type Mutation{
    createPropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, activo: Boolean!): Propietario!
    updatePropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, id: Int!): Propietario!,
    deletePropietario(id: Int!): Propietario!
    createCasa(nombre: String!, numero: Int!, dimensiones: Int!, estado: String!,alicuota: Float!, PropietarioId: Int, CondominioId:Int!, activo: Boolean!): Casa!,
    updateCasa(nombre: String!, numero: Int!, dimensiones: Int!, estado: String!,alicuota: Float! PropietarioId: Int, id: Int!): Casa!
    deleteCasa(id: Int!): Casa!,
    createCondominio(nombre: String!, estado: String!, ciudad: String!, direccion: String!, AdminId: Int!, activo: Boolean! ): Condominio!,
    updateCondominio(nombre: String!, estado: String!, ciudad: String!, direccion: String!, id: Int! ): Condominio!
    deleteCondominio(id: Int!): Condominio!
    createAdmin(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, activo: Boolean!): Admin!
    updateAdmin(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, id: Int!): Admin!,
    deleteAdmin(id: Int!): Admin!
    createVisitante(nombre: String!, apellido: String!, cedula: String!, fecha: String!, CasaId: Int!, activo: Boolean!): Visitante!
    updateVisitante(nombre: String!, apellido: String!, cedula: String!, fecha: String!, id: Int!): Visitante!,
    deleteVisitante(id: Int!): Visitante!
    createInstrumentoDePago(numero: Int!, fecha: String!, tipo: String!, monto: Int!, activo: Boolean!): InstrumentoDePago!
    updateInstrumentoDePago(numero: Int!, fecha: String!, tipo: String!, monto: Int!, id: Int!): InstrumentoDePago!,
    deleteInstrumentoDePago(id: Int!): InstrumentoDePago!
    createGasto(concepto: String!, tipo: String!, monto: Int!, CondominioId: Int!, CasaId: Int, activo: Boolean!): Gasto!
    updateGasto(concepto: String!, tipo: String!, monto: Int!, CondominioId: Int!, CasaId: Int, id: Int!): Gasto!,
    deleteGasto(id: Int!): Gasto!
    createFactura(numero: Int!, estado: String!, fechaEmision: String!, fechaEmision: String!, saldo: Int, CasaId: Int!, activo: Boolean!): Factura!
    updateFactura(numero: Int!, estado: String!, fechaEmision: String!, fechaEmision: String!, saldo: Int, CasaId: Int!, id: Int!): Factura!,
    deleteFactura(id: Int!): Factura!
    createPago(FacturaId: Int!, InstrumentoDePagoId: Int!): Pago!
    updatePago(FacturaId: Int!, InstrumentoDePagoId: Int!, id: Int!): Pago!,
    deletePago(id: Int!): Pago!
    createGastoDeFactura(GastoId: Int!, FacturaId: Int!): GastoDeFactura!
    updateGastoDeFactura(GastoId: Int!, FacturaId: Int!, id: Int!): GastoDeFactura!,
    deleteGastoDeFactura(id: Int!): GastoDeFactura!
}
`
module.exports = typeDefs;