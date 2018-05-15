<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="lineItems"
      hide-actions
      item-key="_id"
      expand
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.menuItem.name }} <strong>{{ props.item.size }}</strong> ({{ props.item.itemPrice }} {{ currency }})</td>
          <td class="text-xs-right">{{ props.item.quantity }} x {{ props.item.lineItemPrice }} <strong>{{ currency }}</strong></td>
          <td class="text-xs-right">{{ props.item.lineItemTotal }} <strong>{{ currency }}</strong></td>
          <td class="text-xs-right">
            <!-- <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn> -->
            <order-line-item-dialog v-model="props.item"></order-line-item-dialog>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>
            <!-- LineItem Options-->
            <template v-if="props.item.options.length > 0">
              <tr class="text--small">
                <td colspan="3">
                  <div v-for="optionGroup in props.item.options" :key="optionGroup._id">
                    <p v-for="option in optionGroup.value" :key="option._id">
                      <strong>{{ optionGroup.groupRef.name }}:</strong>
                      {{ option.optionRef.name }} ( {{ option.optionRef.price }} {{ currency }} ) x

                      {{ option.quantity }} =
                      {{ option.quantity * option.optionRef.price }} {{ currency }}

                    </p>
                  </div>
                </td>
              </tr>
            </template>
          </v-card-text>
        </v-card>
      </template>
      <template slot="footer">
        <tr>
          <td class="text-xs-right"></td>
          <td class="text-xs-right"><strong>Subtotal</strong></td>
          <td class="text-xs-right">{{ subtotal }} <strong>{{ currency }}</strong></td>
          <td class="text-xs-right"></td>
        </tr>
        <tr v-if="coupon">
          <td class="text-xs-right"></td>
          <td class="text-xs-right"><strong>Coupon</strong></td>
          <td class="text-xs-right">{{ discountStr }} <strong>{{ currency }}</strong></td>
          <td class="text-xs-right"></td>
        </tr>
        <tr>
          <td class="text-xs-right"></td>
          <td class="text-xs-right"><strong>Total</strong></td>
          <td class="text-xs-right">{{ total }} <strong>{{ currency }}</strong></td>
          <td class="text-xs-right"></td>
        </tr>
      </template>
    </v-data-table>

    <!-- Dialog -->
    
  </div>
</template>

<script>
  import OrderLineItemDialog from '~/components/OrderLineItemDialog'
  export default {
    computed: {
      dialogComputed: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        }
      },
      lineItems: {
        get () {
          return this.value
        },
        set () {
        }
      },
      currency () {
        return this.$store.state.options.currency
      },
      deliveryPrice () {
        return this.$store.state.options.deliveryPrice
      },
      discountStr () {
        const dicountType = this.coupon && this.coupon.discountType

        if (dicountType === 'number') {
          return `-${this.coupon.discount}`
        } else if (dicountType === 'percent') {
          return `-${this.coupon.discount}%`
        }

        return 0
      }
    },
    data () {
      return {
        headers: [
          {
            text: 'Menu Item',
            align: 'left',
            sortable: false,
            value: 'menuItem'
          },
          {
            text: 'Quantity',
            align: 'right',
            sortable: false,
            value: 'quantity'
          },
          {
            text: 'Price',
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
        ]
      }
    },
    components: {
      OrderLineItemDialog
    },
    props: ['dialog', 'value', 'subtotal', 'total', 'coupon']
  }
</script>

<style lang="css" scoped>
</style>
