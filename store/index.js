/*Estado central donde se guardan todos los valores*/
import error from "../layouts/error";

export const state = () => ({
  counter: 0,
  categorias: [],
  recetasCargadas:[]
})

/*Sirve para la leer la informacion del state*/
export const getters = {
  readCategorias(state) {
    return state.categorias
  },
  readRecetasCargadas(state){
    return state.recetasCargadas
  },
  readCounter(state) {
    return state.counter
  }
}

/*Sirve para modificar los state*/
export const mutations = {
  addCategorias(state, payload) {
    state.categorias = payload
  },
  addRecetasCargadas(state, payload){
    state.recetasCargadas = payload
  },
  increment(state) {
    state.counter++
  }
}
/*Son acciones asincronicas que van a llamar las mutaciones que van a modificar los state*/
export const actions = {
  async nuxtServerInit({commit}) {
    console.log("hola")
    //return new Promise((resolve, reject) => {
    const client = this.app.apolloProvider.defaultClient
    const query = {
      query: require("../graphql/categorias.gql")
    }

    await client.query(query).then(data => {
      commit('addCategorias',
        data.data.categorias
      )
      /*commit('addRecetasCargadas',
        data.data.recetas
      )*/
      //resolve()
    }).catch(error => {
      console.log(error)
      //reject()
    })
    //})

  },
  buscarReceta({commit}, payload){
    let cliente = this.app.apolloProvider.defaultClient
    const query = {
      query:require("../graphql/buscarReceta.gql"),
      variables:{termino:payload}
    }
    cliente.query(query).then(data=>{
      console.log(data)
      commit('addRecetasCargadas',
        data.data.recetas
      )
    }).catch(e => console.log(e))
  },
  increment(context) {
    setTimeout(() => {
      context.commit("increment")
    }, 1000)
  }
}
