<template>
  <v-card :to="{name: 'categoria', params:{categoria:categoria.slug}}">
    <v-img :src="categoria.imagen" height="170"></v-img>
    <v-card-title class="body-1">
      {{ categoria.nombre }}
      <v-icon class="ml-2" color="primary">{{categoria.icono}}</v-icon>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    categoria: {
      type: Object,
      required: true
    }
  }
}
</script>
