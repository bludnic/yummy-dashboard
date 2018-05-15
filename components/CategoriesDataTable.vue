<template>
  <div>
    <v-dialog v-model="dialogComputed" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Slug" v-model="editedItem.slug"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="categories"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.slug }}</td>
        <td class="text-xs-right">
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
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Slug',
          align: 'left',
          sortable: false,
          value: 'slug'
        },
        { text: 'Actions', value: 'name', align: 'right', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        slug: ''
      },
      defaultItem: {
        name: '',
        slug: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      categories: {
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

    watch: {
      dialogComputed (val) {
        val || this.close()
      }
    },

    methods: {

      editItem (item) {
        this.editedIndex = this.categories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogComputed = true
      },

      deleteItem (item) {
        const index = this.categories.indexOf(item)
        const id = this.categories[index]._id
        confirm('Are you sure you want to delete this item?') && this.categories.splice(index, 1) && this.$axios.$delete(`/category/${id}`)
      },

      close () {
        this.dialogComputed = false

        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        let promise = null
        if (this.editedIndex > -1) {
          Object.assign(this.categories[this.editedIndex], this.editedItem)

          const id = this.categories[this.editedIndex]._id
          promise = this.$axios.$put(`/category/${id}`, this.editedItem)
        } else {
          this.categories.push(this.editedItem)
          promise = this.$axios.$post('/category', this.editedItem)
        }
        this.close()
        this.$emit('saved', promise)
      },

      add () {
        this.editedIndex = -1
        this.dialogComputed = true
      }
    },
    props: ['value', 'dialog']
  }
</script>

<style lang="css" scoped>
</style>
