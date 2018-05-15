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
                <v-text-field label="Code" v-model="editedItem._id"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select label="Type" v-model="editedItem.discountType" :items="discountTypes"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Discount" v-model="editedItem.discount"></v-text-field>
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
      :items="coupons"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item._id }}</td>
        <td class="text-xs-left">{{ props.item.discountType }}</td>
        <td class="text-xs-left">{{ props.item.discount }}</td>
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
          text: 'Code',
          align: 'left',
          sortable: false,
          value: 'code'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: false,
          value: 'type'
        },
        {
          text: 'Discount',
          align: 'left',
          sortable: false,
          value: 'discount'
        },
        { text: 'Actions', value: 'name', align: 'right', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        _id: '',
        discountType: '',
        discount: 0
      },
      defaultItem: {
        _id: '',
        discountType: '',
        discount: 0
      },

      discountTypes: [
        'number',
        'percent'
      ]
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      coupons: {
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
        this.editedIndex = this.coupons.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogComputed = true
      },

      deleteItem (item) {
        const index = this.coupons.indexOf(item)
        const id = this.coupons[index]._id
        confirm('Are you sure you want to delete this item?') && this.coupons.splice(index, 1) && this.$axios.$delete(`/coupon/${id}`)
      },

      close () {
        this.dialogComputed = false

        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        let promise = null
        if (this.editedIndex > -1) {
          Object.assign(this.coupons[this.editedIndex], this.editedItem)

          const id = this.coupons[this.editedIndex]._id
          promise = this.$axios.$put(`/coupon/${id}`, this.editedItem)
        } else {
          this.coupons.push(this.editedItem)
          promise = this.$axios.$post('/coupon', this.editedItem)
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
