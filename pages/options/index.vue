<template>
  <div>
    <v-tabs
      color="white"
      slot="extension"
      v-model="tab"
      grow
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.key">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      
      <!-- General Tab -->
      <v-tab-item :key="'general'">
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Store address</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field label="Address line 1" v-model="options.storeAddress1"></v-text-field>
                  <v-text-field label="Address line 2" v-model="options.storeAddress2"></v-text-field>
                  <v-text-field label="City" v-model="options.storeCity"></v-text-field>
                  <v-text-field label="Country / State" v-model="options.storeCountry"></v-text-field>
                  <v-text-field label="Postcode / ZIP" v-model="options.storePostcode"></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Currency options</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-select label="Currency" v-model="options.currency" :items="currencies"></v-select>
                  <v-select label="Currency position" v-model="options.currencyPosition" :items="currencyPositions"></v-select>
                  <v-select label="Thousand separator" v-model="options.currencyThSeperator" :items="currencySeparators"></v-select>
                  <v-select label="Decimal separator" v-model="options.currencyDecSeperator" :items="currencySeparators"></v-select>
                  <v-text-field label="Number of decimals" v-model="options.currencyNumDec"></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>General options</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <!-- <v-select label="Shipping location(s)"></v-select> -->
                  <v-text-field label="Delivery price" v-model="options.deliveryPrice"></v-text-field>
                  <v-text-field label="Free shipping from" v-model="options.freeShippingFrom"></v-text-field>
                  <v-text-field label="Delivery average time (minutes)" v-model="options.deliveryTime"></v-text-field>
                  <v-btn color="primary" @click="save">Save</v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

      <!-- Checkout Tab -->
      <v-tab-item :key="'checkout'">
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Payment gateways</v-toolbar-title>
                </v-toolbar>
                <v-card-text>

                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Payment API</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field label="Stripe KEY"></v-text-field>
                  <v-text-field label="Paypal KEY"></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs-items>

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
import cc from 'currency-codes'

export default {
  async asyncData ({ app }) {
    const options = await app.$axios.$get('/options')
    return { options }
  },
  data () {
    return {
      currencies: cc.codes(),
      currencyPositions: ['left', 'right', 'leftSpace', 'rightSpace'],
      currencySeparators: [',', '.'],

      tab: null,
      items: [
        'general', 'checkout', 'emails'
      ],

      snackbar: false,
      snackbarColor: 'dark',
      snackbarText: 'Options updated succesfully'
    }
  },
  methods: {
    save () {
      this.$axios.$post('/options', this.options)
      .then(res => {
        this.snackbarColor = 'dark'
        this.snackbarText = 'Options updated succesfully'
        this.snackbar = true
      })
      .catch(err => {
        console.log(err)
        this.snackbarColor = 'red'
        this.snackbarText = 'Something went wrong. Check console.'
        this.snackbar = true
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
