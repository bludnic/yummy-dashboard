<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 md8>

          <v-layout row wrap>
            
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Order #{{ order._id }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn flat icon color="green">
                    <v-icon>mdi-dots-horizontal-circle</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 md6>
                      <h3 class="pb-2">Contact details</h3>
                      <strong>Email:</strong> {{ order.user.email }}<br>
                      <strong>First name:</strong> {{ order.user.firstName }}<br>
                      <strong>Last name:</strong> {{ order.user.lastName }}<br>
                      <strong>Phone:</strong> {{ order.user.phone }}<br>
                    </v-flex>
                    <v-flex xs12 md6>
                      <h3 class="pb-2">Shipping address</h3>
                      <strong>Street:</strong> {{ order.user.shipAddress.street }} {{ order.user.shipAddress.streetNumber }}<br>
                      <strong>Entrance:</strong> {{ order.user.shipAddress.entrance }}<br>
                      <strong>Level:</strong> {{ order.user.shipAddress.level }}<br>
                      <strong>Apartment:</strong> {{ order.user.shipAddress.apartment }}<br>
                      <strong>Entrance code:</strong> {{ order.user.shipAddress.entranceCode }}<br>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <v-toolbar flat dense>
                <v-toolbar-title>Line Items</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                  <v-icon>mdi-printer</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <order-line-items/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

          </v-layout>

        </v-flex>


        <v-flex xs12 md4>
          <v-layout row wrap>

            <v-flex xs12>
              <v-card>
                <v-list two-line subheader>

                  <!-- Created At -->
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon>mdi-calendar-range</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Created At</v-list-tile-title>
                      <v-list-tile-sub-title>{{ parseDate(order.createdAt) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <!-- Updated At -->
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon>mdi-calendar-range</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Updated At</v-list-tile-title>
                      <v-list-tile-sub-title>{{ parseDate(order.updatedAt) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                </v-list>
                <v-card-text>
                  <v-select v-model="order.status" :items="orderStatuses" prepend-icon="mdi-dots-horizontal-circle" label="Status"></v-select>
                  <v-btn color="primary" block @click="saveOrder">Save</v-btn>
                </v-card-text>
              </v-card>
            </v-flex>

          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar
      top="top"
      :color="snackbarColor"
      v-model="snackbar"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import OrderLineItems from '~/components/NewOrderLineItems'

export default {
  // async asyncData ({ app, params }) {
  //   const id = params.id
  //   const order = await app.$axios.$get(`/order/${id}`)
  //   return { order }
  // },
  async fetch ({ store, params }) {
    const id = params.id
    await store.dispatch('order/fetchOrder', id)
  },
  computed: {
    order: {
      get () {
        return this.$store.state.order.order
      },
      set (value) {
        // this.$store.commit('order/setOrder', value)
      }
    }
  },
  data () {
    return {
      dialogLineItem: false,

      orderStatuses: [
        {
          text: 'Pending',
          value: 'pending'
        },
        {
          text: 'Failed',
          value: 'failed'
        },
        {
          text: 'Processing',
          value: 'processing'
        },
        {
          text: 'Completed',
          value: 'completed'
        },
        {
          text: 'Cancelled',
          value: 'cancelled'
        }
      ],

      snackbar: false,
      snackbarColor: 'dark',
      snackbarText: 'Item updated succesfully'
    }
  },
  methods: {
    saveOrder () {
      this.$store.dispatch('order/updateOrder')
      // const id = this.order._id
      // this.$axios.$put(`/order/${id}`, this.order)
      // .then(res => {
      //   this.snackbarColor = 'dark'
      //   this.snackbarText = 'Item updated succesfully'
      //   this.snackbar = true
      // })
      // .catch(err => {
      //   console.log(err)
      //   this.snackbarColor = 'red'
      //   this.snackbarText = 'Something went wrong. Check console.'
      //   this.snackbar = true
      // })
    },
    parseDate (dateString) {
      const moment = require('moment')
      return moment(dateString).format('D MMM YYYY hh:mm')
    }
  },
  components: {
    OrderLineItems
  }
}
</script>

<style lang="css" scoped>
</style>
