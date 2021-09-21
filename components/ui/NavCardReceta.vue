<template>
  <v-card :to="{
            name:'categoria-receta',
            params:{categoria:receta.categoria.slug, receta:receta.id}}">
    <v-img :src="receta.imagen" height="170"></v-img>
    <v-card-text>
      <v-row>
        <v-col cols="7">
          <h3>{{ receta.nombre }}</h3>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <div>
            <v-icon>mdi-heart</v-icon>
            <span>{{ receta.likes }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    receta: {
      type: Object,
      required: true
    }
  }
}
</script>
