<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 md8>

          <v-layout row wrap>
            
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>New order</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn flat icon color="green">
                    <v-icon>mdi-dots-horizontal-circle</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-select v-model="order.user"></v-select>
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
                      <line-items
                        :items="order.items"
                      />

                      <new-line-item-dialog
                        :menu-items="menuItems"
                        @newitem="newItem"
                      />
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
                      <v-list-tile-title>Today</v-list-tile-title>
                      <v-list-tile-sub-title>{{ parseDate(order.createdAt) }}</v-list-tile-sub-title>
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
                  <v-btn color="primary" block @click="saveOrder">Create</v-btn>
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
import LineItems from '~/components/MyOrderLineItems'
import NewLineItemDialog from '~/components/NewLineItemDialog'
export default {
  async asyncData ({ app }) {
    const menuItems = await app.$axios.$get('/menu')
    return { menuItems }
  },
  data () {
    return {
      order: {
        items: [],
        status: 'pending'
      },

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
      this.$axios.$post('/order', this.order)
      .then(res => {
        this.snackbarColor = 'dark'
        this.snackbarText = 'Item created succesfully'
        this.snackbar = true
      })
      .catch(err => {
        console.log(err)
        this.snackbarColor = 'red'
        this.snackbarText = 'Something went wrong. Check console.'
        this.snackbar = true
      })
    },
    parseDate (dateString) {
      const moment = require('moment')
      return moment(dateString).format('D MMM YYYY hh:mm')
    },
    newItem (lineItem) {
      console.log(lineItem)
      this.order.items.push(lineItem)
    }
  },
  components: {
    LineItems,
    NewLineItemDialog
  }
}
</script>

<style lang="css" scoped>
</style>
