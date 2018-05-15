<template>
  <div>
    <v-tabs
      v-model="tab"
      color="primary"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="group in optionGroups"
        :key="group._id"
        ripple
      >
        {{ group.name }}
      </v-tab>
      <v-tab-item
        v-for="group in optionGroups"
        :key="group._id"
      >
        <v-card flat>
          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="group.options"
              hide-actions
              item-key="_id"
              select-all
            >
              <template slot="headers" slot-scope="props">
                <tr>
                  <th>
                    <v-checkbox
                      primary
                      hide-details
                      @click.native="toggleAll"
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                    ></v-checkbox>
                  </th>
                  <th
                    v-for="header in props.headers"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      :input-value="props.selected"
                    ></v-checkbox>
                  </td>
                  <td class="text-xs-right">{{ props.item.name }} ({{ props.item.prices[0] }} {{ currency }})</td>
                  <td class="text-xs-right"></td>
                  <td class="text-xs-right">
                    <v-btn icon class="mx-0" @click="plusOneItem(props.item)">
                      <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="minusOneItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>

<!--             <template v-for="option in group.groupRef.options">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs2>
                    <v-checkbox></v-checkbox>
                  </v-flex>
                  <v-flex xs6>{{ option.name }} ({{ option.prices[0] }} {{ currency }})</v-flex>
                  <v-flex xs4>
                    
                  </v-flex>
                </v-layout>
              </v-container>
            </template> -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  computed: {
    currency () {
      return this.$store.state.options.currency
    }
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

      tab: null
    }
  },
  props: ['value', 'optionGroups']
}
</script>

<style lang="css" scoped>
</style>
