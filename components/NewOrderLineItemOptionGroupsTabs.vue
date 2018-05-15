<template>
  <div v-if="menuItemOptions && menuItemOptions.length > 0">
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="(group, i) in menuItemOptions"
        :key="i"
        ripple
      >
        {{ group.name }}
      </v-tab>

      <v-tab-item
        v-for="(group, i) in menuItemOptions"
        :key="i"
      >
        <v-card flat>
          <v-card-text>
            <table class="Table">
              <tbody>
                <line-item-option
                  v-for="(option, i) in group.options"
                  :key="i"

                  :menuitem-id="menuitemId"
                  :group-id="group._id"
                  :option-id="option._id"
                  :name="option.name"
                  :price="option.prices[0]"

                  :quantity="getLineItemOptionQuantity(group._id, option._id)"
                  :selected="getLineItemOptionSelected(group._id, option._id)"

                  @update:quantity="updateLineItemOptionQuantity"
                  @update:selected="updateLineItemOptionSelected"
                >
                </line-item-option>
              </tbody>
            </table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import NewOrderLineItemOptionGroupsItem from '~/components/NewOrderLineItemOptionGroupsItem'
export default {
  computed: {
    lineItemOptions: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    menuItemOptions () {
      return this.options
    },

    selectedItemOptions: {
      // LineItemOption: {
      //   group: '',
      //   value: [
      //     {
      //       option: '',
      //       quantity: 1
      //     }
      //   ]
      // }
      get () {
        return this.menuItemOptions.map(optionGroup => {
          return {
            id: optionGroup._id, // group id
            name: optionGroup.name,
            options: optionGroup.options.map(option => {
              return {
                id: option._id, // option id
                name: option.name,
                price: option.prices[0],
                selected: this.lineItemOptions.some(lineItemOptionGroup => {
                  if (lineItemOptionGroup.group === optionGroup._id) {
                    return lineItemOptionGroup.value.some(lineItemOption => {
                      if (lineItemOption.option === option._id) {
                        return true
                      }
                    })
                  }
                })
              }
            })
          }
        })
      },
      set (value) {
        console.log('Select', value)
      }
    },

    currency () {
      return this.$store.state.options.currency
    }
  },
  methods: {
    getLineItemOption (groupId, optionId) {
      let optionObj = {}
      this.lineItemOptions.forEach(group => {
        if (group.group === groupId) {
          group.value.forEach(option => {
            if (option.option === optionId) {
              optionObj = option
            }
          })
        }
      })
      return optionObj
    },
    getLineItemOptionQuantity (groupId, optionId) {
      let quantity = this.getLineItemOption(groupId, optionId).quantity || 0
      return quantity
    },
    getLineItemOptionSelected (groupId, optionId) {
      let optionExists = this.lineItemOptions.find(group => {
        if (group.group === groupId) {
          return group.value.find(option => {
            if (option.option === optionId) {
              return true
            }
          })
        }
      })
      return optionExists
    },

    updateLineItemOptionQuantity (groupId, optionId, quantity) {
      let groupExists = false

      this.lineItemOptions = this.lineItemOptions.map(group => {
        if (group.group === groupId) {
          groupExists = true
          group.value.forEach(option => {
            if (option.option === optionId) {
              option.quantity = quantity
            }
          })
        }
        return group
      })

      if (!groupExists) {
        this.lineItemOptions.push({
          group: groupId,
          value: [
            {
              option: optionId,
              quantity: quantity
            }
          ]
        })
      }

      console.log('groupExists', groupExists)
    },

    updateLineItemOptionSelected (groupId, optionId, selected) {
      this.lineItemOptions.forEach(group => {
        if (group.group === groupId) {
          group.value.forEach((option, i) => {
            if (option.option === optionId) {
              delete group.value[i]
            }
          })
        }
      })
    }
    // updateLineItemOptionGroup (groupId, selectedOptions) {
    //   let groupExists = false
    //   this.lineItemOptions.forEach((lineItemOptionGroup) => {
    //     if (lineItemOptionGroup.group === groupId) {
    //       lineItemOptionGroup.value = selectedOptions
    //       groupExists = true
    //     }

    //     if (!groupExists) {
    //       this.lineItemOptions.push({
    //         group: groupId,
    //         value: selectedOptions
    //       })
    //     }
    //   })
    // }
  },
  data () {
    return {
      headers: [
        {
          text: 'Option',
          align: 'right',
          sortable: false,
          value: 'quantity'
        },
        {
          text: 'Quantity',
          align: 'right',
          sortable: false,
          value: 'price'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right',
          sortable: false
        }
      ],
      selected: [],

      tab: 0
    }
  },
  props: ['value', 'options', 'menuitemId'],
  components: {
    lineItemOption: NewOrderLineItemOptionGroupsItem
  }
}
</script>

<style lang="css" scoped>
.Table {
  width: 100%;
  border-collapse: collapse;
}

.Table tr {
  border-top: 1px solid #ddd;
}

.Table th {
  text-align: left;
}

.Table td, .Table th {
  padding: 5px;
}

.Table .text--small {
  font-size: 0.9rem;
  color: gray;
}

.Table p {
  margin-bottom: 0.1rem;
}
</style>
