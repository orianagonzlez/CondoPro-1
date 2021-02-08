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

type Query{
    getPropietarios: [Propietario],
    getPropietario(id: Int!): Propietario
}

type Mutation{
    createPropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, activo: Boolean!): Propietario!
    updatePropietario(nombre: String!, apellido: String!, cedula: String!, correo: String!, telefono: String!, id: Int!): Propietario!
}
`
module.exports = typeDefs;