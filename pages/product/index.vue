<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 md8>

          <v-layout row wrap>
            <!-- Product title and description -->
            <v-flex xs12>
              <v-card>
                <v-container fluid class="px-0">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field label="Product title" v-model="product.name" single-line hide-details full-width></v-text-field>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Product description" v-model="product.description" single-line multi-line hide-details full-width></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <!-- Prices -->
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Prices</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark @click="dialogPrices = true">New Item</v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container fluid class="pa-0">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <prices-data-table v-model="product.prices" :dialog.sync="dialogPrices"></prices-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <!-- Option Groups -->
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Option groups</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark @click="dialogOptionGroups = true">New Item</v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container fluid class="pa-0">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <option-groups-data-table v-model="product.optionGroups" :dialog.sync="dialogOptionGroups"></option-groups-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <!-- Meta -->
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Meta</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-subheader>Weight in gramms</v-subheader>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="product.weight" prepend-icon="mdi-weight"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-subheader>Category</v-subheader>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        :items="categories"
                        v-model="product.category"
                        label="Select"
                        single-line
                        auto
                        prepend-icon="mdi-shape"
                        hide-details
                        item-text="name"
                        item-value="_id"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

          </v-layout>

        </v-flex>


        <v-flex xs12 md4>
          <v-layout row wrap>

            <!-- General and Save -->
            <v-flex xs12>
              <v-card>
                <!-- <v-toolbar flat dense>
                  <v-toolbar-title>My files</v-toolbar-title>
                </v-toolbar> -->
                <v-list two-line subheader>

                  <!-- Created At -->
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon>mdi-calendar-range</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Today</v-list-tile-title>
                      <v-list-tile-sub-title>{{ parseDate(product.createdAt) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                </v-list>
                <v-card-actions>
                  <v-btn block color="primary" @click="createMenuItem">Create</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

            <!-- Featured Image -->
            <v-flex xs12>
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title>Featured image</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <upload-image v-model="product.featuredImageURL" :img-key.sync="product.featuredImageKey"></upload-image>
                    </v-flex>
                  </v-layout>
                </v-container>
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
import PricesDataTable from '~/components/PricesDataTable'
import OptionGroupsDataTable from '~/components/OptionGroupsDataTable'
import UploadImage from '~/components/UploadImage'

export default {
  async asyncData ({ app }) {
    const categories = await app.$axios.$get('/category')
    return { categories }
  },
  data () {
    return {
      product: {
        name: '',
        description: '',
        images: [],
        optionGroups: [],
        prices: [],
        featuredImage: null,
        weight: null,
        category: null
      },

      dialogPrices: false,
      dialogOptionGroups: false,

      snackbar: false,
      snackbarColor: 'dark',
      snackbarText: 'Item created succesfully'
    }
  },
  methods: {
    createMenuItem () {
      this.$axios.$post('/menu', this.product)
      .then(product => {
        this.snackbarColor = 'dark'
        this.snackbarText = 'Item created succesfully'
        this.snackbar = true

        this.$router.replace(`/product/${product._id}`)
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
    }
  },
  components: {
    PricesDataTable,
    OptionGroupsDataTable,
    UploadImage
  }
}
</script>

<style lang="css" scoped>
</style>
