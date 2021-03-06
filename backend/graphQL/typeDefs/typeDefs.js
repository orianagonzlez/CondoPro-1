const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Condominio{
    id: Int!
    nombre: String!
    estado: String!
    ciudad: String!
    direccion: String!
    AdminId: Int!
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

type Admin{
    id: Int!
    nombre: String!
    apellido: String!
    cedula: String!
    correo: String!
    telefono: String!
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

type Gasto{
    id: Int!,
    concepto: String!,
    tipo: String!,
    monto: Int!,
    CondominioId: Int!,
    CasaId: Int,
    activo: Boolean!
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
    getVisitante(id: Int!): Visitante,
    getVisitanteByCI(cedula: String!): Visitante,
    getInstrumentosDePago: [InstrumentoDePago],
    getInstrumentoDePago(id: Int!): InstrumentoDePago,
    getInstrumentoDePagoByNumero(numero: Int!): InstrumentoDePago,
    getGastos: [Gasto],
    getGasto(id: Int!): Gasto,
    getGastosByCondoId(condoId: Int!): [Gasto],
    getGastosByCasaId(id: Int!): [Gasto],

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
    updateVisitante(nombre: String!, apellido: String!, cedula: String!, fecha: String!, CasaId: Int!, id: Int!): Visitante!,
    deleteVisitante(id: Int!): Visitante!
    createInstrumentoDePago(numero: Int!, fecha: String!, tipo: String!, monto: Int!, activo: Boolean!): InstrumentoDePago!
    updateInstrumentoDePago(numero: Int!, fecha: String!, tipo: String!, monto: Int!, id: Int!): InstrumentoDePago!,
    deleteInstrumentoDePago(id: Int!): InstrumentoDePago!
    createGasto(concepto: String!, tipo: String!, monto: Int!, CondominioId: Int!, CasaId: Int, activo: Boolean!): Gasto!
    updateGasto(concepto: String!, tipo: String!, monto: Int!, CondominioId: Int!, CasaId: Int, id: Int!): Gasto!,
    deleteGasto(id: Int!): Gasto!
}
`
module.exports = typeDefs;