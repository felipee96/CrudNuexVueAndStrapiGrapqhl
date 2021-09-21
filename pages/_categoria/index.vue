<template>
  <v-container>
    <h1 class="secondary--text">
      {{ categoriafun.nombre }}
      <v-icon large class="secondary--text">{{ categoriafun.icono }}</v-icon>
    </h1>
    <p class="secondary--text">{{ categoriafun.descripcion }}</p>
    <v-row>
      <v-col cols="4" v-for="receta in recetas" :key="receta.id">
        <app-ui-nav-card-receta :receta="receta"></app-ui-nav-card-receta>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-alert type="info" v-if=" recetas.length === 0 ">
        <p>No existen recetas</p>
      </v-alert>
    </div>
    <div class="mt-3">
      <app-ui-back-btn></app-ui-back-btn>
    </div>
    <!--    <div v-for="receta in recetas" :key="receta.id">
          <nuxt-link
            :to="{
            name:'categoria-receta',
            params:{categoria:$route.params.categoria, receta:receta.id}}"
          >
            {{ receta.nombre }}

          </nuxt-link>
        </div>
    <v-divider></v-divider>
    <nuxt-link to="/">Volver</nuxt-link>-->
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    categoriafun() {
      const slug = this.$route.params.categoria
      return this.$store.getters.readCategorias.find(categoria => categoria.slug == slug)
    }
  },
  async asyncData({app, route}) {
    const slug = route.params.categoria
    const client = app.apolloProvider.defaultClient
    const query = {
      query: require("../../graphql/recetas.gql"),
      variables: {slug}
    }
    let recetas = []
    await client.query(query).then(data => {
      recetas = data.data.recetas
    }).catch(e => console.log(e))
    return {recetas}
  }

}
</script>
