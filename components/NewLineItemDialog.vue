<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">New LineItem</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md9>
              <v-select
                :items="menuItems"
                v-model="id"
                label="MenuItem"
                autocomplete
                item-text="name"
                item-value="_id"
                @input="size = ''"
              />
            </v-flex>
            <v-flex xs12 md3>
              <v-text-field
                label="Quantity"
                counter="3"
                v-model="quantity"
              />
            </v-flex>
            <v-flex xs12>
              <v-select
                v-if="sizes"
                :items="sizes"
                v-model="size"
                label="Size"
                autocomplete
                item-text="name"
                item-value="name"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    computed: {
      menuItem () {
        return this.menuItems.find(menuItem => menuItem._id === this.id) || {}
      },
      sizes () {
        return this.menuItem.prices && this.menuItem.prices.length > 1 ? this.menuItem.prices : false
      }
    },
    data () {
      return {
        dialog: false,

        id: '',
        quantity: 1,
        size: '',
        optionsGroups: []
      }
    },
    methods: {
      save () {
        this.$emit('newitem', {
          id: this.id,
          quantity: this.quantity,
          size: this.size,
          optionsGroups: []
        })
        this.dialog = false
      }
    },
    props: ['menuItems']
  }
</script>
