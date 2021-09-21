<template>
  <v-container>
    <h1 class="secondary--text">{{ receta.nombre }}</h1>
    <h5 class="secondary--text">{{ receta.categoria.nombre }}</h5>
    <v-card class="mt-3">
      <v-card-title>
        <v-icon class="mr-3">mdi-information</v-icon>
        Información
      </v-card-title>
      <v-card-text class="black--text">
        <v-row>
          <v-col cols="6">
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-group</v-icon>
              Servicios: {{ receta.servicios }}
            </v-chip>

            <v-chip color="primary" outlined>
              <v-icon left>mdi-clock</v-icon>
              Tiempo: {{ formatedTime }}
            </v-chip>

            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-edit</v-icon>
              Autor: {{receta.autor.username}}
            </v-chip>
            <v-divider class="my-3"></v-divider>
            <h4 class="body-1">Descripción</h4>
            <div v-html="receta.descripcion"></div>
          </v-col>
          <v-col cols="6">
            <v-img :src="receta.imagen" max-height="500"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="mt-3">
      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-fridge</v-icon>
              Ingredientes
            </v-card-title>
            <v-list>
              <v-list-item v-for="(ingrediente,i) in receta.ingredientes" :key="i">
                {{ ingrediente }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="7">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-stove</v-icon>
              Pasos para preparación
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item v-for="(paso,a) in receta.pasos" :key="a+Math.random()" color="secondary" small>
                {{ paso }}
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mt-3">
      <app-ui-back-btn label="Volver a recetas"></app-ui-back-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  computed:{
    formatedTime(){
      let horas = Math.floor(this.receta.duracion / 60)
      let minutos = this.receta.duracion % 60
      return  ("0"+horas).slice(-2) + ":" + ("0"+minutos).slice(-2)
    }
  },
  async asyncData({app, route}) {
    const client = app.apolloProvider.defaultClient
    const id = route.params.receta

    const query = {
      query: require("../../../graphql/receta.gql"),
      variables: {id}
    }
    let receta = null
    await client.query(query).then(data => {
      receta = data.data.receta
    }).catch(e => console.log(e))
    return {receta}
  }
}
</script>
