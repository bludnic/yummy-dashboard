<template>
  <tr>
    <td>[Item name]: {{ size || 'default' }}</td>
    <td>{{ quantity }} x [lineItemPrice] <strong>{{ currency }}</strong></td>
    <td>[lineItemTotal] <strong>{{ currency }}</strong></td>
    <td class="text-xs-right">
      <order-line-item-dialog
        :id.sync="id"
        :quantity.sync="quantity"
        :size.sync="size"
        :optionGroups.sync="optionGroups"
      />
      <v-btn icon class="mx-0" @click="deleteItem()">
        <v-icon color="pink">delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import OrderLineItemDialog from '~/components/NewOrderLineItemDialog'

export default {
  computed: {
    currency () {
      return this.$store.state.options.currency
    }
  },
  data () {
    return {

    }
  },
  methods: {
    editItem () {

    },
    deleteItem () {

    }
  },
  components: {
    OrderLineItemDialog
  },
  props: ['id', 'size', 'quantity', 'optionGroups']
}
</script>

<style lang="css" scoped>
</style>
