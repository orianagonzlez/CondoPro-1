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
    numero: Int!
    dimensiones: Int!
    estado: String!
    alicuota: Float!
    propID: Int!
    condoID: Int!
    activo: Boolean!
}

type Query{
    getPropietarios: [Propietario],
    getPropietario(id: Int!): Propietario,
    getPropietarioByCI(cedula: String!): Propietario,
    getCasas: [Casa],
    getCasa(id: Int!): Casa,
    getCondominio(id: Int!): Condominio,
    getCondominios: [Condominio]
}

type Mutation{
    createPropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, activo: Boolean!): Propietario!
    updatePropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, id: Int!): Propietario!,
    deletePropietario(id: Int!): Propietario!
    createCasa(numero: String!, dimensiones: Int!, estado: String!,alicuota: Float!, propID: Int!, condoID:Int!, activo: Boolean!): Casa!,
    updateCasa(numero: String!, dimensiones: Int!, estado: String!,alicuota: Float! propID: Int!, id: Int!): Casa!
    deleteCasa(id: Int!): Casa!,
    createCondominio(nombre: String!, estado: String!, ciudad: String!, direccion: String!, AdminId: Int!, activo: Boolean! ): Condominio!,
    updateCondominio(nombre: String!, estado: String!, ciudad: String!, direccion: String!, id: Int! ): Condominio!
    deleteCondominio(id: Int!): Condominio!
}
`
module.exports = typeDefs;