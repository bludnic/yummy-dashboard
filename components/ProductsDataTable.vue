<template>
  <div>
    <v-btn color="primary" dark class="mb-2" nuxt :to="'/product'">New Item</v-btn>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      disable-initial-sort
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">
          <img width="50" height="50" :src="props.item.featuredImageSquare" v-if="props.item.featuredImageSquare">
        </td>
        <td class="text-xs-left"><nuxt-link :to="'/product/'+props.item._id">{{ props.item.name }}</nuxt-link></td>
        <td class="text-xs-left">{{ getMenuItemPriceRange(props.item.prices) }} <strong>{{ currency }}</strong></td>
        <td class="text-xs-left">{{ props.item.category && props.item.category.name }}</td>
        <td class="text-xs-left">{{ parseDate(props.item.createdAt) }}</td>
        <td class="text-xs-right">
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Image',
          value: 'image',
          align: 'center',
          sortable: false
        },
        { text: 'Name', value: 'name' },
        {
          text: 'Prices',
          value: 'prices'
        },
        {
          text: 'Category',
          value: 'category'
        },
        {
          text: 'Created at',
          value: 'createdAt'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right',
          sortable: false
        }
      ]
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      items: {
        get () {
          return this.$store.state.product.products
        }
      },
      currency () {
        return this.$store.state.options.currency
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {
      deleteItem (item) {
        const index = this.items.indexOf(item)
        const id = this.items[index]._id
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch('product/deleteProduct', id)
      },

      getPrices (arr) {
        if (arr.length === 1) {
          return arr[0].price
        } else {
          let str = ''
          arr.forEach(item => {
            str += item.name + ': ' + item.price + '; '
          })
          return str
        }
      },

      getMenuItemPriceRange (arr) {
        const prices = arr.map(item => item.price)
        let min = Math.min.apply(null, prices)
        let max = Math.max.apply(null, prices)

        if (min === max) {
          return min
        } else {
          return `${min} - ${max}`
        }
      },

      parseDate (dateString) {
        const moment = require('moment')
        return moment(dateString).format('D MMM YYYY hh:mm')
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
