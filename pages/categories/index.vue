<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <categories-data-table v-model="categories" :dialog.sync="dialog" @saved="saved"></categories-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CategoriesDataTable from '~/components/CategoriesDataTable'

export default {
  async asyncData ({ app }) {
    const categories = await app.$axios.$get('/category')
    return { categories }
  },
  data () {
    return {
      dialog: false,

      snackbar: false,
      snackbarColor: 'dark',
      snackbarText: 'Item created succesfully'
    }
  },
  methods: {
    saved (promise) {
      promise.then(res => {
        console.log('Category saved')
        this.getCategories()
      })
    },
    async getCategories () {
      this.categories = await this.$axios.$get('/category')
    }
  },
  components: {
    CategoriesDataTable
  }
}
</script>

<style lang="css" scoped>
</style>
