<template>
  <div>
    {{ items }}
    <table class="Table">
      <thead>
        <tr>
          <th>Menu item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th class="text-xs-right">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          is="line-item"
          v-for="(lineItem, i) in lineItems"
          :key="i"

          :id="lineItem.id"
          :size="lineItem.size"
          :quantity="lineItem.quantity"
          :option-groups="lineItem.optionGroups"
        />

        <!-- LineItem Options-->
        <!-- <new-order-line-item-options v-model="lineItems[index].options"></new-order-line-item-options> -->
        

        <tr>
          <td></td>
          <td><strong>Subtotal:</strong></td>
          <td>order.subtotal <strong>{{ currency }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><strong>Delivery:</strong></td>
          <td>{{ deliveryPrice }} <strong>{{ currency }}</strong></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><strong>Total:</strong></td>
          <td>total <strong>{{ currency }}</strong></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LineItem from '~/components/MyOrderLineItem'
import OrderLineItemOptions from '~/components/NewOrderLineItemOptions'

export default {
  computed: {
    lineItems () {
      return this.items
    },
    currency () {
      return this.$store.state.options.currency
    },
    deliveryPrice () {
      return this.$store.state.options.deliveryPrice
    }
  },
  data () {
    return {

    }
  },
  components: {
    LineItem,
    OrderLineItemOptions
  },
  props: ['items']
}
</script>

<style lang="css">
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
