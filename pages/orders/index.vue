<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <orders-data-table></orders-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrdersDataTable from '~/components/OrdersDataTable'
export default {
  fetch ({ store }) {
    return store.dispatch('order/fetchOrders')
  },
  data () {
    return {

    }
  },
  components: {
    OrdersDataTable
  }
}
</script>

<style lang="css" scoped>
</style>
