<template>
  <div>
    <v-btn color="primary" dark class="mb-2" nuxt :to="'/order'">New Order</v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      disable-initial-sort
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">
          <v-btn flat icon color="green">
            <v-icon>mdi-dots-horizontal-circle</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-left">{{ props.item.user && props.item.user.email }}</td>
        <td class="text-xs-left"><nuxt-link :to="'/order/'+props.item._id">{{ props.item._id }}</nuxt-link></td>
        <td class="text-xs-left">{{ props.item.coupon && props.item.coupon._id }}</td>
        <td class="text-xs-left">{{ props.item.total }}</td>
        <td class="text-xs-left">15 March 2018 10:00</td>
        <td>
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
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
          text: 'Status',
          value: 'status',
          align: 'center',
          sortable: false
        },
        { text: 'User', value: 'user' },
        {
          text: 'ID',
          sortable: false,
          value: '_id'
        },
        { text: 'Coupon', value: 'coupon' },
        { text: 'Total', value: 'total' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: '_id', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Order' : 'Edit Item'
      },
      items: {
        get () {
          return this.$store.state.order.orders
        }
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        const id = this.items[index]._id
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch('order/deleteOrder', id)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
