import gql from "graphql-tag";

export const categorias = gql`
        query{
          categorias{
            id
            nombre
            icono
            slug
            imagen
          }
        }
        `
