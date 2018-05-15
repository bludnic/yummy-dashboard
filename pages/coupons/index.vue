<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <coupons-data-table v-model="coupons" :dialog.sync="dialog" @saved="saved"></coupons-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CouponsDataTable from '~/components/CouponsDataTable'

export default {
  async asyncData ({ app }) {
    const coupons = await app.$axios.$get('/coupon')
    return { coupons }
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
        this.getCoupons()
      })
    },
    async getCoupons () {
      this.coupons = await this.$axios.$get('/coupon')
    }
  },
  components: {
    CouponsDataTable
  }
}
</script>

<style lang="css" scoped>
</style>
