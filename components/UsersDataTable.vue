<template>
  <div>
    <v-dialog v-model="dialogComputed" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New user</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="First name" v-model="editedItem.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Last name" v-model="editedItem.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="E-mail" v-model="editedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <h3>Ship address</h3>
                <v-text-field label="Street name" v-model="editedItem.shipAddress.street"></v-text-field>
                <v-text-field label="Street number" v-model="editedItem.shipAddress.streetNumber"></v-text-field>
                <v-text-field label="Entrance" v-model="editedItem.shipAddress.entrance"></v-text-field>
                <v-text-field label="Level" v-model="editedItem.shipAddress.level"></v-text-field>
                <v-text-field label="Apartment" v-model="editedItem.shipAddress.apartment"></v-text-field>
                <v-text-field label="Entrance Code" v-model="editedItem.shipAddress.entranceCode"></v-text-field>
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
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
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
          text: 'First name',
          align: 'left',
          sortable: false,
          value: 'firstName'
        },
        {
          text: 'Last name',
          align: 'left',
          sortable: false,
          value: 'lastName'
        },
        {
          text: 'E-mail',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right',
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {
        firstName: '',
        lastName: '',
        email: '',
        shipAddress: {}
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        email: '',
        shipAddress: {}
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
      users: {
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
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogComputed = true
      },

      deleteItem (item) {
        // const index = this.users.indexOf(item)
        // const id = this.users[index]._id
        // confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1) && this.$axios.$delete(`/user/${id}`)
      },

      close () {
        this.dialogComputed = false

        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        let promise = null
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)

          const id = this.users[this.editedIndex]._id
          promise = this.$axios.$put(`/user/${id}`, this.editedItem)
        } else {
          this.users.push(this.editedItem)
          promise = this.$axios.$post('/user', this.editedItem)
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
