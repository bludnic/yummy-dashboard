<template>
  <table class="Table">
    <thead>
      <th>Menu item</th>
      <th>Quantity</th>
      <th>Price</th>
    </thead>
    <tbody>
      <template v-for="lineItem in lineItems">
        <!-- LineItem -->
        <tr :key="lineItem._id">
          <td>{{ lineItem.menuItem.name }}: {{ lineItem.size || 'default' }}</td>
          <td>{{ lineItem.quantity }} x {{ lineItem.lineItemPrice }} <strong>{{ currency }}</strong></td>
          <td>{{ lineItem.lineItemTotal }} <strong>{{ currency }}</strong></td>
        </tr>
        <!-- LineItem Options-->
        <template v-if="lineItem.options.length > 0">
          <tr class="text--small">
            <td colspan="3">
              <div v-for="optionGroup in lineItem.options" :key="optionGroup._id">
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
      </template>
      

      <tr>
        <td></td>
        <td><strong>Total:</strong></td>
        <td>{{ total }} <strong>{{ currency }}</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><strong>Delivery:</strong></td>
        <td>{{ deliveryPrice }} <strong>{{ currency }}</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><strong>Subtotal:</strong></td>
        <td>{{ total+deliveryPrice }} <strong>{{ currency }}</strong></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    lineItems: {
      get () {
        return this.value
      },
      set () {
        // @TODO
      }
    },
    currency () {
      return this.$store.state.options.currencyOptions.currency
    },
    deliveryPrice () {
      return this.$store.state.options.generalOptions.deliveryPrice
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getMenuItemPrice (menuItem, size) {
      let price = 0

      if (!menuItem) return 0
      if (!Array.isArray(menuItem.prices)) return 0
      if (menuItem.prices.length === 1) return menuItem.prices[0].price

      menuItem.prices.forEach(priceObj => {
        if (priceObj.name === size) {
          price = priceObj.price
        }
      })
      return price
    },
    getOptionGroupById (lineItem, groupId) {
      let group = {}
      lineItem.menuItem.optionGroups.forEach(optionGroup => {
        if (optionGroup._id === groupId) group = optionGroup
      })
      return group
    },
    getOptionData (menuItem, groupId, optionId, size) {
      let optionData = {}

      if (!menuItem) return 0
      if (!Array.isArray(menuItem.optionGroups)) return 0

      menuItem.optionGroups.forEach(optionGroup => {
        if (optionGroup._id.toString() !== groupId) return 0

        optionGroup.options.forEach(option => {
          if (option._id.toString() !== optionId) return 0

          // Get price for specific size
          if (size) {
            optionData = {
              price: this._getOptionPriceBySizeName(menuItem, option.prices, size),
              name: option.name
            }
          } else {
            optionData = {
              price: option.prices[0],
              name: option.name
            }
          }
        })
      })
      return optionData
    },
    _getOptionPriceBySizeName (menuItem, optionPrices, size) {
      let priceIndex = 0

      menuItem.prices.forEach((price, index) => {
        if (price.name === size) {
          priceIndex = index
        }
      })

      return optionPrices[priceIndex]
    }
  },
  props: ['value', 'total']
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
