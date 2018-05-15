<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template slot="activator">
      <v-btn icon class="mx-0">
        <v-icon color="teal">edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit LineItem</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-select
                v-model="idComputed"
                :items="menuItems"
                label="MenuItem"
                item-text="name"
                item-value="_id"
              >
              </v-select>
              <v-text-field v-model="quantityComputed" label="Quantity"></v-text-field>
              <v-select
                v-model="sizeComputed"
                :items="menuItem.prices"
                label="Size"
                item-text="name"
                item-value="name"
                v-if="menuItem.prices.length > 1"
              >
              </v-select>
              <new-order-line-item-option-groups-tabs v-model="optionGroupsComputed" :options="menuItem.optionGroups" :menuitem-id="idComputed"></new-order-line-item-option-groups-tabs>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NewOrderLineItemOptionGroupsTabs from '~/components/NewOrderLineItemOptionGroupsTabs'

export default {
  mounted () {
    this.fetchMenuItems()
  },
  watch: {
    idComputed (val) {
      this.sizeComputed = null
      this.optionsComputed = []
    }
  },
  computed: {
    idComputed: { // lineItem.menuItem._id
      get () {
        return this.id
      },
      set (value) {
        this.$emit('update:id', value)
      }
    },
    quantityComputed: {
      get () {
        return this.quantity
      },
      set (value) {
        this.$emit('update:quantity', value)
      }
    },
    sizeComputed: {
      get () {
        return this.size
      },
      set (value) {
        this.$emit('update:size', value)
      }
    },
    optionGroupsComputed: {
      get () {
        return this.optionGroups
      },
      set (value) {
        this.$emit('update:options', value)
      }
    },

    menuItem: {
      get () {
        let item = {
          prices: []
        }
        this.menuItems.forEach(menuItem => {
          if (menuItem._id === this.idComputed) {
            item = menuItem
          }
        })
        return item
      }
    }
  },
  data () {
    return {
      dialog: false,
      menuItems: [],
      menuItemSizes: []
    }
  },
  methods: {
    async fetchMenuItems () {
      this.menuItems = await this.$axios.$get('/menu')
    },
    save () {
      this.$store.dispatch('order/updateOrder')
      this.dialog = false
    },
    close () {
      this.dialog = false
    }
  },
  props: ['id', 'quantity', 'size', 'optionGroups'],
  components: {
    NewOrderLineItemOptionGroupsTabs
  }
}
</script>

<style lang="css" scoped>
</style>
