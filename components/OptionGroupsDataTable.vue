<template>
  <div>
    <v-dialog v-model="dialogComputed" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid class="pa-0">
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Group name</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-text-field single-line label="Group name" v-model="editedOptionGroup.name"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs4>
                <v-subheader>Multiselect</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-checkbox v-model="editedOptionGroup.multiselect"></v-checkbox>
              </v-flex>
            </v-layout>

            <!-- Option List -->
            <v-layout row wrap>
              <v-flex xs12>
                <v-subheader>Options</v-subheader>
              </v-flex>

              <v-flex xs12>
                <v-container grid-list-md v-for="(option, i) in editedOptionGroup.options" :key="i">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field label="Option name" v-model="option.name"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field label="Option price" v-model="option.prices"></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn icon @click="deleteOption(option)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>

              </v-flex>

              <v-flex xs10>
                
              </v-flex>
              <v-flex xs2>
                <v-btn icon @click="addOption">
                  <v-icon color="primary">add</v-icon>
                </v-btn>
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
      :items="optionGroups"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.multiselect }}</td>
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
          text: 'Group name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        // { text: 'Options', value: 'options', align: 'left', sortable: false },
        { text: 'Multiselect', value: 'multiselect', align: 'left', sortable: false },
        { text: 'Actions', value: 'name', align: 'right', sortable: false }
      ],
      editedIndex: -1,

      editedOptionGroup: {
        name: '',
        multiselect: true,
        options: []
      },

      defaultOptionGroup: {
        name: '',
        multiselect: true,
        options: []
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      optionGroups: {
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
        console.log('editItem', item)
        this.editedIndex = this.optionGroups.indexOf(item)
        this.editedOptionGroup = Object.assign({}, item)
        this.dialogComputed = true
      },

      deleteItem (item) {
        const index = this.optionGroups.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.optionGroups.splice(index, 1)
      },

      close () {
        this.dialogComputed = false

        this.editedOptionGroup = Object.assign({}, this.defaultOptionGroup)
        this.editedIndex = -1
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.optionGroups[this.editedIndex], this.editedOptionGroup)
        } else {
          this.optionGroups.push(this.editedOptionGroup)
        }

        this.editedOptionGroup = this.defaultOptionGroup
        this.editedIndex = -1

        this.close()
      },

      add () {
        this.editedIndex = -1
        this.dialogComputed = true
      },

      deleteOption (option) {
        const index = this.editedOptionGroup.options.indexOf(option)
        this.editedOptionGroup.options.splice(index, 1)
      },

      addOption () {
        this.editedOptionGroup.options.push({})
      }
    },
    props: ['value', 'dialog']
  }
</script>

<style lang="css" scoped>
</style>
