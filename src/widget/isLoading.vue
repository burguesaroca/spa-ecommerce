<template>
  <v-dialog v-model="isLoading" max-width="320">
      <v-card>
        <v-container>
          <div class="text-center">
            <v-icon :size="80" class="mdi-spin" color="light-blue darken-4">mdi-autorenew mdi-spin</v-icon>
            <p>Espere por favor...</p>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Loading",
    props: {
        isLoading: {
            type: Boolean,
            required: true,
            default: false
        },
    },
}
</script>

<style>

</style>