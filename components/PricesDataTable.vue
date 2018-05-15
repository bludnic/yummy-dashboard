<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            large
            lazy
          >
            <div>{{ props.item.name || 'NO_NAME' }}</div>
            <div slot="input" class="mt-3 title">Update Name</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog
            :return-value.sync="props.item.price"
            large
            lazy
            persistent
          >
            <div>{{ props.item.price }}</div>
            <div slot="input" class="mt-3 title">Update Price</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.price"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialogComputed" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add size</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Size name" v-model="newSize.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Price" v-model="newSize.price"></v-text-field>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Size name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Price',
            align: 'left',
            sortable: false,
            value: 'price'
          },
          { text: 'Actions', align: 'right', sortable: false }
        ],

        newSize: {
          name: '',
          price: null
        },
        defaultNewSize: {
          name: '',
          price: null
        }
      }
    },
    watch: {
      dialogComputed (val) {
        val || this.close()
      }
    },
    methods: {
      close () {
        this.dialogComputed = false
        this.newSize = Object.assign({}, this.defaultNewSize)
      },
      save () {
        this.items.push(this.newSize)
        this.close()
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      }
    },
    computed: {
      items: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      },
      dialogComputed: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        }
      }
    },
    props: ['value', 'dialog']
  }
</script>

<style lang="css" scoped>
</style>
