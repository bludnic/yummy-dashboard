<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template slot="activator">
      <v-btn icon class="mx-0">
        <v-icon color="teal">edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-select
                label="Menu item"
                autocomplete
                :loading="loadingMenuItems"
                cache-items
                required
                :items="asyncMenuItems"
                :search-input.sync="searchMenuItems"
                v-model="menuItem"
                item-text="name"
                item-value="_id"
              ></v-select>
              <v-text-field label="Quantity" v-model="quantity"></v-text-field>
              <template v-if="optionGroups.length > 0">
                <h3>Options</h3>
                <div>
                  <order-line-item-options v-model="options" :option-groups="optionGroups"></order-line-item-options>
                </div>
              </template>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="saveItem">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OrderLineItemOptions from '~/components/OrderLineItemOptions'
export default {
  mounted () {
    this.queryMenuItems()
  },
  data () {
    return {
      dialog: false,

      editedIndex: -1,
      editedItem: {
        options: [],
        quantity: null,
        menuItem: {
          _id: null
        }
      },
      defaultItem: {
        options: [],
        quantity: null,
        menuItem: {
          _id: null
        }
      },

      loadingMenuItems: false,
      asyncMenuItems: [],
      searchMenuItems: null
    }
  },
  watch: {
    searchMenuItems (val) {
      // val && this.queryMenuItems(val)
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New LineItem' : 'Edit LineItem'
    },
    lineItem: {
      get () {
        return this.value
      }
    },
    menuItem: {
      get () {
        return this.lineItem.menuItem
      },
      set (value) {
        this.asyncMenuItems.forEach(menuItem => {
          if (menuItem._id === value) {
            this.lineItem.menuItem = menuItem
          }
        })
      }
    },
    optionGroups: {
      get () {
        return this.menuItem.optionGroups
      }
    },
    quantity: {
      get () {
        return this.lineItem.quantity
      },
      set (value) {
        this.lineItem.quantity = value
      }
    },
    options: {
      get () {
        return this.lineItem.options
      },
      set (value) {
        this.lineItem.options = value
      }
    }
  },
  methods: {
    queryMenuItems (query) {
      this.loadingMenuItems = true

      this.$axios.$get('/menu')
      .then(items => {
        this.asyncMenuItems = items
        this.loadingMenuItems = false
      })
      .catch(err => {
        console.log(err)
      })
    },

    saveItem () {
      this.$store.dispatch('order/updateOrder')
      this.dialog = false
    },

    deleteItem (item) {

    },

    close () {
      this.dialog = false
    }
  },
  components: {
    OrderLineItemOptions
  },
  props: ['value']
}
</script>

<style lang="css" scoped>
</style>
