<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <products-data-table></products-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductsDataTable from '~/components/ProductsDataTable'
export default {
  fetch ({ store }) {
    return store.dispatch('product/fetchProducts')
  },
  data () {
    return {

    }
  },
  components: {
    ProductsDataTable
  }
}
</script>

<style lang="css" scoped>
</style>
