const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Propietario{
    id: Int!
    nombre: String!
    apellido: String!
    cedula: String!
    correo: String!
    telefono: String!
    activo: Boolean!
}

type Apartamento{
    id: Int!
    numero: String!
    dimensiones: String!
    estado: String!
    activo: Boolean!
}

type Query{
    getPropietarios: [Propietario],
    getPropietario(id: Int!): Propietario,
    getApartamentos: [Apartamento],
    getApartamento(id: Int!): Apartamento
}

type Mutation{
    createPropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, activo: Boolean!): Propietario!
    updatePropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, id: Int!): Propietario!,
    createApartamento(numero: String!, dimensiones: String!, estado: String!, activo: Boolean!): Apartamento!,
    updateApartamento(numero: String!, dimensiones: String!, estado: String!, id: Int!): Apartamento!
}
`
module.exports = typeDefs;