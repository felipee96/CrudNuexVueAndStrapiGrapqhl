/*Estado central donde se guardan todos los valores*/
import error from "../layouts/error";

export const state = () => ({
  counter: 0,
  categorias: []
})

/*Sirve para la leer la informacion del state*/
export const getters = {
  readCategorias(state) {
    return state.categorias
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
      //resolve()
    }).catch(error => {
      console.log(error)
      //reject()
    })
    //})

  },
  increment(context) {
    setTimeout(() => {
      context.commit("increment")
    }, 1000)
  }
}
